package com.hahaton.dockertrainer.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommandSubmission {
    private Integer level;
    private String command;
    private String userId;
}
