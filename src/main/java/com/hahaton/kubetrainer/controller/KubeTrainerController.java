package com.hahaton.kubetrainer.controller;

import com.hahaton.kubetrainer.model.KubeSubmission;
import com.hahaton.kubetrainer.model.KubeResult;
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
        KubeResult result = kubeTrainerService.applyYaml(submission);
        return ResponseEntity.ok(result);
    }
}
