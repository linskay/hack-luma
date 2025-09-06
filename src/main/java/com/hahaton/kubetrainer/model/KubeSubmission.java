package com.hahaton.kubetrainer.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KubeSubmission {
    private Integer taskId;
    private String yaml;
}
