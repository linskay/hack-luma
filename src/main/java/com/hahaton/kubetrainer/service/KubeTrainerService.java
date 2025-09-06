package com.hahaton.kubetrainer.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hahaton.ai.GeminiService;
import com.hahaton.kubetrainer.model.KubeResult;
import com.hahaton.kubetrainer.model.KubeSubmission;
import com.hahaton.kubetrainer.model.KubeTask;
import io.fabric8.kubernetes.api.model.HasMetadata;
import io.fabric8.kubernetes.api.model.Pod;
import io.fabric8.kubernetes.client.KubernetesClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class KubeTrainerService {

    private final KubernetesClient client;
    private final GeminiService geminiService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String getHintForYaml(String yaml) {
        String prompt = "You are a Kubernetes expert and a friendly teaching assistant. " +
                        "A student has provided the following YAML manifest. " +
                        "Please check it for common errors (syntax, logic, best practices) and provide a single, short, helpful hint in Russian to guide them toward the correct solution. " +
                        "Do not give the full answer. The hint should be encouraging and easy to understand.\n\n" +
                        "YAML from student:\n" +
                        "```yaml\n" +
                        yaml +
                        "\n```";
        return geminiService.generateText(prompt);
    }

    // In a real application, this would fetch from a database
    public Optional<KubeTask> getTaskById(long taskId) {
        if (taskId == 1L) {
            return Optional.of(KubeTask.builder()
                    .id(1L)
                    .level(1)
                    .title("Миссия 1: Запуск разведчика")
                    .story("Командор, наш флот прибыл в новую систему. Нам нужно быстро оценить обстановку. Запустите один разведывательный корабль (Pod), чтобы собрать данные. Он должен быть оснащен стандартным сенсорным пакетом 'nginx'.")
                    .description("Создайте Pod с именем 'recon-pod' и образом 'nginx:latest'.")
                    .validationCriteria("{\"kind\": \"Pod\", \"name\": \"recon-pod\", \"image\": \"nginx:latest\"}")
                    .build());
        }
        return Optional.empty();
    }

    // This now takes a KubeTask to know what to validate against.
    public KubeResult applyYaml(KubeSubmission submission, KubeTask task) {
        List<HasMetadata> resources;
        try {
            InputStream inputStream = new ByteArrayInputStream(submission.getYaml().getBytes(StandardCharsets.UTF_8));
            resources = client.load(inputStream).items();

            if (resources.isEmpty()) {
                return KubeResult.builder()
                        .success(false)
                        .message("YAML is empty or invalid.")
                        .build();
            }

            client.resourceList(resources).inNamespace("default").serverSideApply();

        } catch (Exception e) {
            return KubeResult.builder()
                    .success(false)
                    .message("Failed to apply YAML.")
                    .details(e.getMessage())
                    .hint("Check your YAML syntax and ensure the resources are valid.")
                    .build();
        }

        // --- Validation Logic ---
        try {
            boolean taskCompleted = checkTaskCompletion(resources, task);
            String message = taskCompleted ? "Задание выполнено! Ресурсы успешно созданы и прошли проверку." : "Ресурсы созданы, но не соответствуют требованиям задания.";

            return KubeResult.builder()
                    .success(true) // API call was successful
                    .taskCompleted(taskCompleted)
                    .message(message)
                    .details("Applied resources: " + resources.stream().map(r -> r.getKind() + "/" + r.getMetadata().getName()).toList())
                    .build();

        } catch (Exception e) {
            return KubeResult.builder()
                    .success(true) // API call was successful, but validation failed
                    .taskCompleted(false)
                    .message("Ресурсы созданы, но произошла ошибка при их проверке.")
                    .details(e.getMessage())
                    .build();
        }
    }

    private boolean checkTaskCompletion(List<HasMetadata> appliedResources, KubeTask task) throws Exception {
        Map<String, String> criteria = objectMapper.readValue(task.getValidationCriteria(), new TypeReference<>() {});

        String expectedKind = criteria.get("kind");
        String expectedName = criteria.get("name");
        String expectedImage = criteria.get("image");

        for (HasMetadata resource : appliedResources) {
            if (resource.getKind().equalsIgnoreCase(expectedKind) && resource.getMetadata().getName().equals(expectedName)) {
                // Found the right kind and name, now check specifics
                if ("Pod".equalsIgnoreCase(expectedKind)) {
                    // It's a Pod, let's fetch it again to be sure we have the full object
                    Pod pod = client.pods().inNamespace("default").withName(expectedName).get();
                    if (pod != null && !pod.getSpec().getContainers().isEmpty()) {
                        // Check if any container has the correct image
                        return pod.getSpec().getContainers().stream()
                                  .anyMatch(container -> container.getImage().equals(expectedImage));
                    }
                }
                // TODO: Add validation for other kinds like Deployment, Service, etc.
            }
        }
        return false; // No resource matched the primary criteria
    }
}
