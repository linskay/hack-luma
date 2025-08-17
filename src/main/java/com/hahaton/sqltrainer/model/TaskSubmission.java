package com.hahaton.sqltrainer.model;

import lombok.Data;

@Data
public class TaskSubmission {
    private String query;
    private Integer level;
    private Integer taskNumber;
}
