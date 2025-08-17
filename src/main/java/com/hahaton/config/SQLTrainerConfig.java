package com.hahaton.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Data;

@Configuration
@ConfigurationProperties(prefix = "sql.trainer")
@Data
public class SQLTrainerConfig {
    
    private boolean enabled = true;
    private int maxQueryLength = 1000;
    private int timeoutSeconds = 30;
}
