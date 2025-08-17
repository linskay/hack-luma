package com.hahaton.dockertrainer.controller;

import com.hahaton.dockertrainer.model.*;
import com.hahaton.dockertrainer.service.DockerTrainerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/docker-trainer")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Tag(name = "Docker Trainer Controller", description = "API для управления Docker тренажером")
public class DockerTrainerController {
    
    private final DockerTrainerService dockerTrainerService;
    
    @GetMapping("/task/{level}")
    @Operation(summary = "Получить задачу", description = "Получить случайную задачу для указанного уровня")
    public ResponseEntity<DockerTask> getTask(
            @Parameter(description = "Уровень задачи") @PathVariable int level) {
        DockerTask task = dockerTrainerService.getRandomTask(level);
        if (task != null) {
            return ResponseEntity.ok(task);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping("/check-command")
    @Operation(summary = "Проверить команду", description = "Проверить правильность Docker команды")
    public ResponseEntity<CommandResult> checkCommand(
            @Parameter(description = "Отправленная команда") @RequestBody CommandSubmission submission) {
        CommandResult result = dockerTrainerService.checkCommand(submission);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/progress/{userId}")
    @Operation(summary = "Получить прогресс", description = "Получить прогресс пользователя")
    public ResponseEntity<DockerProgress> getUserProgress(
            @Parameter(description = "ID пользователя") @PathVariable String userId) {
        DockerProgress progress = dockerTrainerService.getUserProgress(userId);
        return ResponseEntity.ok(progress);
    }
    
    @GetMapping("/tasks/{level}")
    @Operation(summary = "Получить задачи уровня", description = "Получить все задачи для указанного уровня")
    public ResponseEntity<List<DockerTask>> getTasksForLevel(
            @Parameter(description = "Уровень задач") @PathVariable int level) {
        List<DockerTask> tasks = dockerTrainerService.getTasksForLevel(level);
        return ResponseEntity.ok(tasks);
    }
    
    @GetMapping("/levels")
    @Operation(summary = "Получить количество уровней", description = "Получить общее количество доступных уровней")
    public ResponseEntity<Integer> getTotalLevels() {
        int totalLevels = dockerTrainerService.getTotalLevels();
        return ResponseEntity.ok(totalLevels);
    }
    
    @GetMapping("/health")
    @Operation(summary = "Проверка здоровья", description = "Проверить статус Docker тренажера")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Docker Trainer is running!");
    }
}
