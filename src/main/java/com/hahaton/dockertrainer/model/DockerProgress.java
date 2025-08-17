package com.hahaton.dockertrainer.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Map;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DockerProgress {
    private String userId;
    private Integer currentLevel;
    private Set<Integer> completedLevels;
    private Map<Integer, Integer> levelScores;
    private Integer totalScore;
    private String lastCompletedTask;
    private Long lastActivityTime;
}
