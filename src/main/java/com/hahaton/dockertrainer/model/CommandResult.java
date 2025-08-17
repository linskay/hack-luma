package com.hahaton.dockertrainer.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommandResult {
    private Boolean isCorrect;
    private String hint;
    private String feedback;
    private String expectedOutput;
    private String userOutput;
    private Integer score;
    private Boolean levelCompleted;
}
