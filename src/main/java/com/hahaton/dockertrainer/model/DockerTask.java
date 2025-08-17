package com.hahaton.dockertrainer.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DockerTask {
    private Long id;
    private Integer level;
    private String title;
    private String story;
    private String description;
    private String correctCommand;
    private String[] hints;
    private String[] alternativeCommands;
    private String category;
    private Integer difficulty;
    private String[] tags;
}
