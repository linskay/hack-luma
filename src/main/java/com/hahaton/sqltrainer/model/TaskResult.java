package com.hahaton.sqltrainer.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskResult {
    private boolean isCorrect;
    private String message;
    private String hint;
    private List<Map<String, Object>> expectedResult;
    private List<Map<String, Object>> actualResult;
    private String errorMessage;
}
