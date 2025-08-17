package com.hahaton.controller;

import com.hahaton.ai.DJLService;
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
@RequestMapping("/api/djl")
@CrossOrigin(origins = "*")
@Tag(name = "DJL Neural Networks", description = "API для работы с нейронными сетями через Deep Java Library (DJL)")
public class DJLController {
    
    private final DJLService djlService;
    
    @Autowired
    public DJLController(DJLService djlService) {
        this.djlService = djlService;
    }
    
    @PostMapping("/classify")
    @Operation(
        summary = "Классификация изображения",
        description = "Классифицирует изображение по URL, используя предобученные модели DJL"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Изображение успешно классифицировано",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Map.class),
                examples = @ExampleObject(
                    value = "{\"success\": true, \"predictions\": [{\"class\": \"cat\", \"probability\": 0.95}], \"model\": \"resnet50\"}"
                )
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Ошибка в запросе",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Map.class),
                examples = @ExampleObject(
                    value = "{\"success\": false, \"error\": \"URL изображения не указан\"}"
                )
            )
        )
    })
    public ResponseEntity<Map<String, Object>> classifyImage(
        @Parameter(description = "URL изображения для классификации", required = true, example = "https://example.com/image.jpg")
        @RequestBody Map<String, String> request
    ) {
        String imageUrl = request.get("imageUrl");
        if (imageUrl == null || imageUrl.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "URL изображения не указан"
            ));
        }
        
        Map<String, Object> result = djlService.classifyImage(imageUrl);
        return ResponseEntity.ok(result);
    }
    
    @PostMapping("/detect")
    @Operation(
        summary = "Обнаружение объектов",
        description = "Обнаруживает объекты на изображении по URL, используя модели детекции DJL"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Объекты успешно обнаружены",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Map.class),
                examples = @ExampleObject(
                    value = "{\"success\": true, \"objects\": [{\"class\": \"person\", \"confidence\": 0.89, \"bbox\": [100, 100, 200, 300]}], \"model\": \"yolo\"}"
                )
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Ошибка в запросе",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Map.class),
                examples = @ExampleObject(
                    value = "{\"success\": false, \"error\": \"URL изображения не указан\"}"
                )
            )
        )
    })
    public ResponseEntity<Map<String, Object>> detectObjects(
        @Parameter(description = "URL изображения для обнаружения объектов", required = true, example = "https://example.com/image.jpg")
        @RequestBody Map<String, String> request
    ) {
        String imageUrl = request.get("imageUrl");
        if (imageUrl == null || imageUrl.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "URL изображения не указан"
            ));
        }
        
        Map<String, Object> result = djlService.detectObjects(imageUrl);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/models")
    @Operation(
        summary = "Получить доступные модели",
        description = "Возвращает список всех доступных предобученных моделей DJL"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Список моделей получен",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Map.class),
                examples = @ExampleObject(
                    value = "{\"success\": true, \"models\": [\"resnet50\", \"yolo\", \"bert\"], \"engines\": [\"pytorch\", \"onnx\"]}"
                )
            )
        )
    })
    public ResponseEntity<Map<String, Object>> getAvailableModels() {
        Map<String, Object> result = djlService.getAvailableModels();
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/health")
    @Operation(
        summary = "Проверка здоровья DJL",
        description = "Проверяет состояние DJL сервиса, доступность движков и устройств"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Статус DJL получен",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Map.class),
                examples = @ExampleObject(
                    value = "{\"success\": true, \"engines\": [\"pytorch\", \"onnx\"], \"devices\": {\"cpu\": \"available\", \"gpu\": \"available\"}}"
                )
            )
        )
    })
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> result = djlService.healthCheck();
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/test")
    @Operation(
        summary = "Тест DJL контроллера",
        description = "Проверяет работу DJL контроллера и показывает доступные endpoints"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Тест выполнен успешно",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Map.class),
                examples = @ExampleObject(
                    value = "{\"message\": \"DJL Controller работает корректно!\", \"endpoints\": {\"classify\": \"POST /api/djl/classify - классификация изображений\"}}"
                )
            )
        )
    })
    public ResponseEntity<Map<String, Object>> testDJL() {
        return ResponseEntity.ok(Map.of(
            "message", "DJL Controller работает корректно!",
            "endpoints", Map.of(
                "classify", "POST /api/djl/classify - классификация изображений",
                "detect", "POST /api/djl/detect - обнаружение объектов",
                "models", "GET /api/djl/models - доступные модели",
                "health", "GET /api/djl/health - состояние сервиса",
                "simple", "GET /api/djl/simple - простой тест DJL"
            ),
            "example_request", Map.of(
                "classify", Map.of("imageUrl", "https://example.com/image.jpg"),
                "detect", Map.of("imageUrl", "https://example.com/image.jpg")
            )
        ));
    }
    
    @GetMapping("/simple")
    @Operation(
        summary = "Простой тест DJL",
        description = "Выполняет простой тест DJL без загрузки тяжелых моделей"
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Простой тест выполнен",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = Map.class),
                examples = @ExampleObject(
                    value = "{\"success\": true, \"message\": \"DJL работает корректно\", \"version\": \"0.34.0\"}"
                )
            )
        )
    })
    public ResponseEntity<Map<String, Object>> simpleTest() {
        Map<String, Object> result = djlService.simpleTest();
        return ResponseEntity.ok(result);
    }
}
