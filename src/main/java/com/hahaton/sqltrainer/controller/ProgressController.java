package com.hahaton.sqltrainer.controller;

import com.hahaton.sqltrainer.model.Progress;
import com.hahaton.sqltrainer.service.ProgressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Tag(name = "Progress Controller", description = "API для управления прогрессом пользователей в SQL тренажере")
public class ProgressController {
    
    private final ProgressService progressService;
    
    @GetMapping("/{userId}")
    @Operation(summary = "Получить прогресс пользователя", description = "Получить полный прогресс пользователя")
    public ResponseEntity<Progress> getUserProgress(
            @Parameter(description = "ID пользователя") @PathVariable String userId) {
        Progress progress = progressService.getUserProgress(userId);
        return ResponseEntity.ok(progress);
    }
    
    @PostMapping("/{userId}/complete")
    @Operation(summary = "Завершить задачу", description = "Отметить задачу как завершенную")
    public ResponseEntity<Map<String, String>> completeTask(
            @Parameter(description = "ID пользователя") @PathVariable String userId, 
            @Parameter(description = "Запрос с параметрами") @RequestBody Map<String, Object> request) {
        int level = (Integer) request.get("level");
        int taskNumber = (Integer) request.get("taskNumber");
        
        progressService.completeTask(userId, level, taskNumber);
        return ResponseEntity.ok(Map.of("message", "Задача отмечена как выполненная"));
    }
    
    @GetMapping("/{userId}/level/{level}")
    @Operation(summary = "Получить прогресс уровня", description = "Получить прогресс по конкретному уровню")
    public ResponseEntity<Map<String, Object>> getLevelProgress(
            @Parameter(description = "ID пользователя") @PathVariable String userId, 
            @Parameter(description = "Уровень") @PathVariable int level) {
        int completedCount = progressService.getCompletedTasksCount(userId, level);
        double progress = progressService.getLevelProgress(userId, level);
        
        Map<String, Object> response = Map.of(
            "level", level,
            "completedCount", completedCount,
            "totalCount", 10,
            "progress", progress
        );
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{userId}/overall")
    @Operation(summary = "Получить общий прогресс", description = "Получить общий прогресс по всем уровням")
    public ResponseEntity<Map<String, Object>> getOverallProgress(
            @Parameter(description = "ID пользователя") @PathVariable String userId) {
        double overallProgress = progressService.getOverallProgress(userId);
        Progress progress = progressService.getUserProgress(userId);
        
        Map<String, Object> response = Map.of(
            "overallProgress", overallProgress,
            "totalCompleted", progress.getCompletedTasks().size(),
            "totalTasks", 60,
            "currentLevel", progress.getCurrentLevel(),
            "currentTask", progress.getCurrentTask()
        );
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{userId}/unlocked-levels")
    @Operation(summary = "Получить разблокированные уровни", description = "Получить список доступных уровней")
    public ResponseEntity<Map<String, Object>> getUnlockedLevels(
            @Parameter(description = "ID пользователя") @PathVariable String userId) {
        var unlockedLevels = progressService.getUnlockedLevels(userId);
        
        Map<String, Object> response = Map.of(
            "unlockedLevels", unlockedLevels
        );
        
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{userId}")
    @Operation(summary = "Сбросить прогресс", description = "Сбросить весь прогресс пользователя")
    public ResponseEntity<Map<String, String>> resetProgress(
            @Parameter(description = "ID пользователя") @PathVariable String userId) {
        progressService.resetProgress(userId);
        return ResponseEntity.ok(Map.of("message", "Прогресс сброшен"));
    }
}
