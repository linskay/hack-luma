package com.hahaton.sqltrainer.controller;

import com.hahaton.sqltrainer.service.AIHelperService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai-helper")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Tag(name = "AI Helper Controller", description = "API для получения AI подсказок в SQL тренажере")
public class AIHelperController {
    
    private final AIHelperService aiHelperService;
    
    @GetMapping("/hint/{level}/{taskNumber}")
    @Operation(summary = "Получить подсказку", description = "Получить базовую подсказку для задачи")
    public ResponseEntity<Map<String, String>> getHint(
            @Parameter(description = "Уровень задачи") @PathVariable int level, 
            @Parameter(description = "Номер задачи") @PathVariable int taskNumber) {
        String hint = aiHelperService.getHint(level, taskNumber);
        return ResponseEntity.ok(Map.of("hint", hint));
    }
    
    @PostMapping("/detailed-hint")
    @Operation(summary = "Получить детальную подсказку", description = "Получить персонализированную подсказку на основе запроса пользователя")
    public ResponseEntity<Map<String, String>> getDetailedHint(
            @Parameter(description = "Запрос с параметрами") @RequestBody Map<String, Object> request) {
        int level = (Integer) request.get("level");
        int taskNumber = (Integer) request.get("taskNumber");
        String userQuery = (String) request.get("userQuery");
        
        String hint = aiHelperService.getDetailedHint(level, taskNumber, userQuery);
        return ResponseEntity.ok(Map.of("hint", hint));
    }
    
    @PostMapping("/next-step")
    @Operation(summary = "Получить подсказку следующего шага", description = "Получить пошаговую подсказку для решения задачи")
    public ResponseEntity<Map<String, String>> getNextStepHint(
            @Parameter(description = "Запрос с параметрами") @RequestBody Map<String, Object> request) {
        int level = (Integer) request.get("level");
        int taskNumber = (Integer) request.get("taskNumber");
        String userQuery = (String) request.get("userQuery");
        
        String hint = aiHelperService.getNextStepHint(level, taskNumber, userQuery);
        return ResponseEntity.ok(Map.of("hint", hint));
    }
}
