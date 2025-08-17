package com.hahaton.controller;

import com.hahaton.ai.AIAgent;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
@Tag(name = "AI Assistant", description = "API для взаимодействия с локальным AI помощником по программированию")
public class AIController {
    
    private final AIAgent aiAgent;
    
    @Autowired
    public AIController(AIAgent aiAgent) {
        this.aiAgent = aiAgent;
    }
    
    @PostMapping("/chat")
    @Operation(
        summary = "Чат с AI помощником",
        description = "Отправляет вопрос AI помощнику и получает ответ на основе локальной базы знаний"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Успешный ответ от AI",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Map.class),
                examples = @ExampleObject(
                    value = "{\"response\": \"Java - это объектно-ориентированный язык программирования. Основные концепции: классы, объекты, наследование, полиморфизм, инкапсуляция.\"}"
                )
            )
        )
    })
    public ResponseEntity<Map<String, String>> chat(
        @Parameter(description = "Вопрос для AI помощника", required = true, example = "Что такое Java?")
        @RequestBody Map<String, String> request
    ) {
        String question = request.get("question");
        String response = aiAgent.getResponse(question);
        
        return ResponseEntity.ok(Map.of("response", response));
    }
    
    @GetMapping("/tip")
    @Operation(
        summary = "Получить случайный совет",
        description = "Возвращает мотивационный совет по программированию из локальной базы"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Случайный совет получен",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Map.class),
                examples = @ExampleObject(
                    value = "{\"tip\": \"💡 Начните с малого - простые программы помогут понять основы\"}"
                )
            )
        )
    })
    public ResponseEntity<Map<String, String>> getRandomTip() {
        String tip = aiAgent.getRandomTip();
        return ResponseEntity.ok(Map.of("tip", tip));
    }
    
    @GetMapping("/health")
    @Operation(
        summary = "Проверка состояния AI агента",
        description = "Проверяет, что AI агент работает и доступен"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "AI агент работает",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Map.class),
                examples = @ExampleObject(
                    value = "{\"status\": \"AI Agent is running!\"}"
                )
            )
        )
    })
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "AI Agent is running!"));
    }
    
    @GetMapping("/capabilities")
    @Operation(
        summary = "Получить возможности AI агента",
        description = "Возвращает список всех возможностей и технологий, поддерживаемых AI агентом"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Список возможностей получен",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Map.class),
                examples = @ExampleObject(
                    value = "{\"gemini\": \"Google Gemini API для текстовых ответов\", \"djl\": \"Deep Java Library для работы с нейронными сетями\", \"models\": \"Предобученные модели для классификации и обнаружения объектов\", \"languages\": \"Поддержка Java, Python, JavaScript и других языков программирования\"}"
                )
            )
        )
    })
    public ResponseEntity<Map<String, Object>> getCapabilities() {
        Map<String, Object> capabilities = aiAgent.getCapabilities();
        return ResponseEntity.ok(capabilities);
    }
    
    @GetMapping("/status")
    @Operation(
        summary = "Проверить статус всех AI сервисов",
        description = "Проверяет состояние всех AI сервисов, включая DJL и Gemini (если настроен)"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Статус сервисов получен",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Map.class),
                examples = @ExampleObject(
                    value = "{\"gemini\": \"not_configured\", \"djl\": \"available\"}"
                )
            )
        )
    })
    public ResponseEntity<Map<String, Object>> getServiceStatus() {
        Map<String, Object> status = aiAgent.getServiceStatus();
        return ResponseEntity.ok(status);
    }
}
