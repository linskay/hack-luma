package com.hahaton.kubetrainer.controller;

import com.hahaton.kubetrainer.model.KubeResult;
import com.hahaton.kubetrainer.model.KubeSubmission;
import com.hahaton.kubetrainer.model.KubeTask;
import com.hahaton.kubetrainer.service.KubeTrainerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("Tests for Kubernetes Trainer Controller")
class KubeTrainerControllerTest {

    @Mock
    private KubeTrainerService kubeTrainerService;

    @InjectMocks
    private KubeTrainerController kubeTrainerController;

    private KubeSubmission mockSubmission;
    private KubeTask mockTask;
    private KubeResult mockSuccessResult;
    private KubeResult mockFailureResult;

    @BeforeEach
    @DisplayName("Initialize test data")
    void setUp() {
        mockSubmission = new KubeSubmission(1, "apiVersion: v1\nkind: Pod\nmetadata:\n  name: test-pod");

        mockTask = KubeTask.builder().id(1L).build();

        mockSuccessResult = KubeResult.builder()
                .success(true)
                .message("Pod created successfully.")
                .taskCompleted(true)
                .build();

        mockFailureResult = KubeResult.builder()
                .success(false)
                .message("Invalid YAML.")
                .hint("Check the 'kind' field.")
                .taskCompleted(false)
                .build();
    }

    @Test
    @DisplayName("Should return OK with success result when submission is valid")
    void shouldSubmitYamlSuccessfully() {
        // Given
        when(kubeTrainerService.getTaskById(anyLong())).thenReturn(Optional.of(mockTask));
        when(kubeTrainerService.applyYaml(any(KubeSubmission.class), any(KubeTask.class))).thenReturn(mockSuccessResult);

        // When
        ResponseEntity<KubeResult> response = kubeTrainerController.submitYaml(mockSubmission);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().isSuccess()).isTrue();
        assertThat(response.getBody().getMessage()).isEqualTo("Pod created successfully.");
    }

    @Test
    @DisplayName("Should return OK with failure result when submission is invalid")
    void shouldHandleFailedSubmission() {
        // Given
        when(kubeTrainerService.getTaskById(anyLong())).thenReturn(Optional.of(mockTask));
        when(kubeTrainerService.applyYaml(any(KubeSubmission.class), any(KubeTask.class))).thenReturn(mockFailureResult);

        // When
        ResponseEntity<KubeResult> response = kubeTrainerController.submitYaml(mockSubmission);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().isSuccess()).isFalse();
        assertThat(response.getBody().getMessage()).isEqualTo("Invalid YAML.");
        assertThat(response.getBody().getHint()).isEqualTo("Check the 'kind' field.");
    }

    @Test
    @DisplayName("Should return 400 Bad Request when task is not found")
    void shouldReturnBadRequestForMissingTask() {
        // Given
        when(kubeTrainerService.getTaskById(anyLong())).thenReturn(Optional.empty());

        // When
        ResponseEntity<KubeResult> response = kubeTrainerController.submitYaml(mockSubmission);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getMessage()).isEqualTo("Task not found.");
    }
}
