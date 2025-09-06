package com.hahaton.kubetrainer.service;

import com.hahaton.ai.GeminiService;
import com.hahaton.kubetrainer.model.KubeResult;
import com.hahaton.kubetrainer.model.KubeSubmission;
import com.hahaton.kubetrainer.model.KubeTask;
import io.fabric8.kubernetes.api.model.Pod;
import io.fabric8.kubernetes.api.model.PodBuilder;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.server.mock.EnableKubernetesMockClient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@EnableKubernetesMockClient
@ExtendWith(MockitoExtension.class)
@DisplayName("Tests for Kubernetes Trainer Service")
class KubeTrainerServiceTest {

    private KubernetesClient client;

    @Mock
    private GeminiService geminiService;

    private KubeTrainerService kubeTrainerService;
    private KubeTask mockTask;

    @BeforeEach
    void setUp() {
        kubeTrainerService = new KubeTrainerService(client, geminiService);
        mockTask = KubeTask.builder()
                .id(1L)
                .level(1)
                .validationCriteria("{\"kind\": \"Pod\", \"name\": \"test-pod\", \"image\": \"nginx:latest\"}")
                .build();
    }

    @Test
    @DisplayName("Should successfully apply a valid Pod YAML")
    void shouldApplyValidYaml() {
        // Given
        String validYaml = "apiVersion: v1\n" +
                           "kind: Pod\n" +
                           "metadata:\n" +
                           "  name: test-pod\n" +
                           "spec:\n" +
                           "  containers:\n" +
                           "  - name: main\n" +
                           "    image: nginx:latest";
        KubeSubmission submission = new KubeSubmission(1, validYaml);

        // When
        KubeResult result = kubeTrainerService.applyYaml(submission, mockTask);

        // Then
        assertThat(result.isSuccess()).isTrue();
        assertThat(result.isTaskCompleted()).isTrue();
        assertThat(result.getMessage()).contains("Задание выполнено!");

        Pod createdPod = client.pods().inNamespace("default").withName("test-pod").get();
        assertThat(createdPod).isNotNull();
        assertThat(createdPod.getSpec().getContainers().get(0).getImage()).isEqualTo("nginx:latest");
    }

    @Test
    @DisplayName("Should return failure for malformed YAML")
    void shouldFailWithInvalidYaml() {
        // Given
        String invalidYaml = "apiVersion: v1\nkind: Pod\n  metadata:\n    name: broken-pod"; // Bad indentation
        KubeSubmission submission = new KubeSubmission(1, invalidYaml);

        // When
        KubeResult result = kubeTrainerService.applyYaml(submission, mockTask);

        // Then
        assertThat(result.isSuccess()).isFalse();
        assertThat(result.getMessage()).isEqualTo("Failed to apply YAML.");
        assertThat(result.getDetails()).isNotNull();
        assertThat(result.getHint()).contains("Check your YAML syntax");
    }

    @Test
    @DisplayName("Should return failure for empty YAML")
    void shouldFailWithEmptyYaml() {
        // Given
        String emptyYaml = "";
        KubeSubmission submission = new KubeSubmission(1, emptyYaml);

        // When
        KubeResult result = kubeTrainerService.applyYaml(submission, mockTask);

        // Then
        assertThat(result.isSuccess()).isFalse();
        assertThat(result.getMessage()).isEqualTo("YAML is empty or invalid.");
    }
}
