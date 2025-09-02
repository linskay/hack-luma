package com.hahaton.kubetrainer.service;

import com.hahaton.kubetrainer.model.KubeSubmission;
import com.hahaton.kubetrainer.model.KubeResult;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.api.model.HasMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KubeTrainerService {

    private final KubernetesClient client;

    public KubeResult applyYaml(KubeSubmission submission) {
        try {
            // Convert YAML string to an InputStream
            InputStream inputStream = new ByteArrayInputStream(submission.getYaml().getBytes(StandardCharsets.UTF_8));

            // Load resources from YAML
            List<HasMetadata> resources = client.load(inputStream).items();

            if (resources.isEmpty()) {
                return KubeResult.builder()
                        .success(false)
                        .message("YAML is empty or invalid.")
                        .build();
            }

            // Apply resources to the cluster
            // Note: In a real multi-user scenario, we'd use user-specific namespaces.
            client.resourceList(resources).inNamespace("default").serverSideApply();

            return KubeResult.builder()
                    .success(true)
                    .message("Successfully applied " + resources.size() + " resource(s).")
                    .details("Applied resources: " + resources.stream().map(r -> r.getKind() + "/" + r.getMetadata().getName()).toList())
                    .build();

        } catch (Exception e) {
            // Generic error handling
            return KubeResult.builder()
                    .success(false)
                    .message("Failed to apply YAML.")
                    .details(e.getMessage())
                    .hint("Check your YAML syntax and ensure the resources are valid.")
                    .build();
        }
    }
}
