package com.hahaton.sqltrainer.service;

import com.hahaton.sqltrainer.model.Progress;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Tag(name = "Progress Service", description = "Сервис для управления прогрессом пользователей в SQL тренажере")
public class ProgressService {
    
    // В реальном приложении здесь была бы база данных
    private final Map<String, Progress> userProgress = new ConcurrentHashMap<>();
    
    @Operation(summary = "Получить прогресс пользователя", description = "Получить или создать прогресс для указанного пользователя")
    public Progress getUserProgress(
            @Parameter(description = "ID пользователя") String userId) {
        return userProgress.computeIfAbsent(userId, k -> Progress.builder()
                .userId(userId)
                .completedTasks(new HashSet<>())
                .currentLevel(1)
                .currentTask(1)
                .build());
    }
    
    @Operation(summary = "Завершить задачу", description = "Отметить задачу как завершенную и обновить прогресс")
    public void completeTask(
            @Parameter(description = "ID пользователя") String userId, 
            @Parameter(description = "Уровень задачи") int level, 
            @Parameter(description = "Номер задачи") int taskNumber) {
        Progress progress = getUserProgress(userId);
        String taskKey = level + "-" + taskNumber;
        progress.getCompletedTasks().add(taskKey);
        
        // Обновляем текущую позицию
        if (taskNumber < 10) {
            progress.setCurrentTask(taskNumber + 1);
        } else if (level < 6) {
            progress.setCurrentLevel(level + 1);
            progress.setCurrentTask(1);
        }
        
        userProgress.put(userId, progress);
    }
    
    public boolean isTaskCompleted(String userId, int level, int taskNumber) {
        Progress progress = getUserProgress(userId);
        String taskKey = level + "-" + taskNumber;
        return progress.getCompletedTasks().contains(taskKey);
    }
    
    public int getCompletedTasksCount(String userId, int level) {
        Progress progress = getUserProgress(userId);
        return (int) progress.getCompletedTasks().stream()
                .filter(task -> task.startsWith(level + "-"))
                .count();
    }
    
    public double getLevelProgress(String userId, int level) {
        int completed = getCompletedTasksCount(userId, level);
        return (double) completed / 10.0 * 100.0; // 10 задач на уровень
    }
    
    public double getOverallProgress(String userId) {
        Progress progress = getUserProgress(userId);
        int totalCompleted = progress.getCompletedTasks().size();
        return (double) totalCompleted / 60.0 * 100.0; // 6 уровней по 10 задач
    }
    
    public List<Integer> getUnlockedLevels(String userId) {
        Progress progress = getUserProgress(userId);
        List<Integer> unlocked = new ArrayList<>();
        
        for (int level = 1; level <= 6; level++) {
            if (level == 1 || getCompletedTasksCount(userId, level - 1) >= 5) {
                unlocked.add(level);
            }
        }
        
        return unlocked;
    }
    
    public void resetProgress(String userId) {
        userProgress.remove(userId);
    }
}
