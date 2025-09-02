package com.hahaton.kubetrainer.service;

import com.hahaton.kubetrainer.model.KubeResult;
import com.hahaton.kubetrainer.model.KubeSubmission;
import io.fabric8.kubernetes.api.model.Pod;
import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.server.mock.EnableKubernetesMockClient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@EnableKubernetesMockClient
@DisplayName("Tests for Kubernetes Trainer Service")
class KubeTrainerServiceTest {

    // This client is automatically injected by the @EnableKubernetesMockClient extension
    private KubernetesClient client;

    private KubeTrainerService kubeTrainerService;

    @BeforeEach
    void setUp() {
        // Initialize the service with the mock client before each test
        kubeTrainerService = new KubeTrainerService(client);
    }

    @Test
    @DisplayName("Should successfully apply a valid Pod YAML")
    void shouldApplyValidYaml() {
        // Given
        String validYaml = "apiVersion: v1\n" +
                           "kind: Pod\n" +
                           "metadata:\n" +
                           "  name: test-pod\n" +
                           "  namespace: default"; // Explicit namespace for clarity
        KubeSubmission submission = new KubeSubmission(1, validYaml);

        // When
        KubeResult result = kubeTrainerService.applyYaml(submission);

        // Then
        assertThat(result.isSuccess()).isTrue();
        assertThat(result.getMessage()).contains("Successfully applied 1 resource(s)");

        // Verify the pod was "created" in the mock server
        Pod createdPod = client.pods().inNamespace("default").withName("test-pod").get();
        assertThat(createdPod).isNotNull();
        assertThat(createdPod.getMetadata().getName()).isEqualTo("test-pod");
    }

    @Test
    @DisplayName("Should return failure for malformed YAML")
    void shouldFailWithInvalidYaml() {
        // Given
        String invalidYaml = "apiVersion: v1\nkind: Pod\n  metadata:\n    name: broken-pod"; // Bad indentation
        KubeSubmission submission = new KubeSubmission(1, invalidYaml);

        // When
        KubeResult result = kubeTrainerService.applyYaml(submission);

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
        KubeResult result = kubeTrainerService.applyYaml(submission);

        // Then
        assertThat(result.isSuccess()).isFalse();
        assertThat(result.getMessage()).isEqualTo("YAML is empty or invalid.");
    }
}
