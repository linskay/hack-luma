package com.hahaton.kubetrainer.controller;

import com.hahaton.kubetrainer.model.KubeResult;
import com.hahaton.kubetrainer.model.KubeSubmission;
import com.hahaton.kubetrainer.model.KubeTask;
import com.hahaton.kubetrainer.service.KubeTrainerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/kubetrainer")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Tag(name = "Kubernetes Trainer Controller", description = "API for the Kubernetes Trainer")
public class KubeTrainerController {

    private final KubeTrainerService kubeTrainerService;

    @PostMapping("/submit")
    @Operation(summary = "Submit a Kubernetes YAML manifest", description = "Applies a YAML manifest to the cluster and returns the result.")
    public ResponseEntity<KubeResult> submitYaml(
            @Parameter(description = "Submission containing the YAML manifest") @RequestBody KubeSubmission submission) {

        KubeTask task = kubeTrainerService.getTaskById(submission.getTaskId())
                .orElse(null); // In a real app, handle this more gracefully

        if (task == null) {
            return ResponseEntity.badRequest().body(KubeResult.builder().success(false).message("Task not found.").build());
        }

        KubeResult result = kubeTrainerService.applyYaml(submission, task);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/hint")
    @Operation(summary = "Get a hint for a YAML manifest", description = "Analyzes the provided YAML and returns a helpful hint.")
    public ResponseEntity<String> getHint(
            @Parameter(description = "Submission containing the YAML manifest to get a hint for") @RequestBody KubeSubmission submission) {
        String hint = kubeTrainerService.getHintForYaml(submission.getYaml());
        return ResponseEntity.ok(hint);
    }

    @GetMapping("/task/{level}")
    @Operation(summary = "Get a task for a given level", description = "Provides a Kubernetes task for the specified level.")
    public ResponseEntity<KubeTask> getTask(
            @Parameter(description = "The level of the task to retrieve") @PathVariable int level) {
        // For now, we only have one task, so we fetch it by its ID regardless of level.
        return kubeTrainerService.getTaskById(1L)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
