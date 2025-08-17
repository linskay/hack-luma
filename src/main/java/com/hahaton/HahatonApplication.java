package com.hahaton;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class HahatonApplication {

    public static void main(String[] args) {
        SpringApplication.run(HahatonApplication.class, args);
    }

}
