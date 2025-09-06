package com.hahaton.kubetrainer.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KubeResult {
    private boolean success;
    private String message;
    private String details;
    private String hint;
    private boolean taskCompleted;
}
