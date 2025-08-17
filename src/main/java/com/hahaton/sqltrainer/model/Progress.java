package com.hahaton.sqltrainer.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Progress {
    private String userId;
    private Set<String> completedTasks; // Format: "level-taskNumber"
    private Integer currentLevel;
    private Integer currentTask;
}
