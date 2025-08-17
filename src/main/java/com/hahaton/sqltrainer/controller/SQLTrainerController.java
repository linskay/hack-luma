package com.hahaton.sqltrainer.controller;

import com.hahaton.sqltrainer.model.Task;
import com.hahaton.sqltrainer.model.TaskResult;
import com.hahaton.sqltrainer.model.TaskSubmission;
import com.hahaton.sqltrainer.service.SQLTrainerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sql-trainer")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Tag(name = "SQL Trainer Controller", description = "API для управления SQL тренажером")
public class SQLTrainerController {
    
    private final SQLTrainerService sqlTrainerService;
    
    @GetMapping("/task/{level}/{taskNumber}")
    @Operation(summary = "Получить задачу", description = "Получить задачу по уровню и номеру")
    public ResponseEntity<Task> getTask(
            @Parameter(description = "Уровень задачи") @PathVariable int level, 
            @Parameter(description = "Номер задачи") @PathVariable int taskNumber) {
        Task task = sqlTrainerService.getTask(level, taskNumber);
        if (task != null) {
            return ResponseEntity.ok(task);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/level/{level}")
    @Operation(summary = "Получить задачи уровня", description = "Получить все задачи определенного уровня")
    public ResponseEntity<List<Task>> getLevelTasks(
            @Parameter(description = "Уровень задач") @PathVariable int level) {
        List<Task> tasks = sqlTrainerService.getLevelTasks(level);
        return ResponseEntity.ok(tasks);
    }
    
    @PostMapping("/check")
    @Operation(summary = "Проверить задачу", description = "Проверить правильность SQL запроса")
    public ResponseEntity<TaskResult> checkTask(
            @Parameter(description = "Отправленный запрос") @RequestBody TaskSubmission submission) {
        TaskResult result = sqlTrainerService.checkTask(submission);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/levels")
    @Operation(summary = "Получить уровни", description = "Получить список доступных уровней")
    public ResponseEntity<List<Integer>> getAvailableLevels() {
        // Возвращаем список доступных уровней (1-6)
        List<Integer> levels = List.of(1, 2, 3, 4, 5, 6);
        return ResponseEntity.ok(levels);
    }
}
