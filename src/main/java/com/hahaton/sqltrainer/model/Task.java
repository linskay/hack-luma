package com.hahaton.sqltrainer.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    private Long id;
    private Integer level;
    private Integer taskNumber;
    private String title;
    private String story;
    private String schema;
    private String question;
    private String solution;
    private String hint;
    private String difficulty;
}
