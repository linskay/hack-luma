package com.hahaton.kubetrainer.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KubeTask {
    private Long id;
    private Integer level;
    private String title;
    private String story;
    private String description;
    private String validationCriteria; // JSON string to define success
    private String[] hints;
}
