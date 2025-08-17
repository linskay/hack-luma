package com.hahaton.dockertrainer.service;

import com.hahaton.dockertrainer.model.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Тестирование сервиса Docker тренажера")
class DockerTrainerServiceTest {

    private DockerTrainerService dockerTrainerService;
    
    @BeforeEach
    @DisplayName("Инициализация тестового окружения")
    void setUp() {
        dockerTrainerService = new DockerTrainerService();
    }
    
    @Test
    @DisplayName("Должен возвращать null для несуществующего уровня")
    void shouldReturnNullForNonExistentLevel() {
        // When
        DockerTask task = dockerTrainerService.getRandomTask(999);
        
        // Then
        assertThat(task).isNull();
    }
    
    @Test
    @DisplayName("Должен возвращать ошибку для несуществующего уровня")
    void shouldReturnErrorForNonExistentLevel() {
        // Given
        CommandSubmission submission = new CommandSubmission(999, "docker ps", "test-user");
        
        // When
        CommandResult result = dockerTrainerService.checkCommand(submission);
        
        // Then
        assertThat(result).isNotNull();
        assertThat(result.getIsCorrect()).isFalse();
        assertThat(result.getHint()).isEqualTo("Уровень не найден");
        assertThat(result.getFeedback()).isEqualTo("Попробуйте другой уровень");
    }
    
    @Test
    @DisplayName("Должен возвращать прогресс пользователя")
    void shouldReturnUserProgress() {
        // Given
        String userId = "test-user";
        
        // When
        DockerProgress progress = dockerTrainerService.getUserProgress(userId);
        
        // Then
        assertThat(progress).isNotNull();
        assertThat(progress.getUserId()).isEqualTo(userId);
        assertThat(progress.getCurrentLevel()).isEqualTo(1);
        assertThat(progress.getCompletedLevels()).isEmpty();
        assertThat(progress.getLevelScores()).isEmpty();
        assertThat(progress.getTotalScore()).isEqualTo(0);
    }
    
    @Test
    @DisplayName("Должен возвращать пустой список для несуществующего уровня")
    void shouldReturnEmptyListForNonExistentLevel() {
        // When
        List<DockerTask> tasks = dockerTrainerService.getTasksForLevel(999);
        
        // Then
        assertThat(tasks).isEmpty();
    }
    
    @Test
    @DisplayName("Должен возвращать общее количество уровней")
    void shouldReturnTotalLevels() {
        // When
        int totalLevels = dockerTrainerService.getTotalLevels();
        
        // Then
        assertThat(totalLevels).isEqualTo(6);
    }
}
