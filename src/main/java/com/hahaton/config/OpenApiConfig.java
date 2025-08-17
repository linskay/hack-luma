package com.hahaton.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.tags.Tag;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI applicationOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("🎃 AI Помощник 'БУ! ИИспугался?' API")
                        .description("""
                            ## 🚀 Полнофункциональное веб-приложение с локальным AI помощником
                            
                            ### Основные возможности:
                            - **Локальный AI помощник** по программированию с расширенной базой знаний
                            - **DJL интеграция** для работы с нейронными сетями
                            - **Классификация изображений** и обнаружение объектов
                            - **REST API** для всех функций
                            
                            ### Технологии:
                            - Spring Boot 3.x
                            - Deep Java Library (DJL)
                            - React + TypeScript
                            - Swagger/OpenAPI 3.0
                            
                            ### Автор: БУ! ИИспугался?
                            """)
                        .version("1.0.0")
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT"))
                        .contact(new Contact()
                                .name("БУ! ИИспугался?")
                                .email("team@hahaton.example")
                                .url("https://github.com/team/hahaton"))
                )
                .tags(List.of(
                        new Tag()
                                .name("AI Assistant")
                                .description("API для взаимодействия с локальным AI помощником по программированию"),
                        new Tag()
                                .name("DJL Neural Networks")
                                .description("API для работы с нейронными сетями через Deep Java Library (DJL)")
                ));
    }
}
