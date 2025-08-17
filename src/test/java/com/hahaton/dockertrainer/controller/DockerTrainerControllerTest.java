package com.hahaton.dockertrainer.controller;

import com.hahaton.dockertrainer.model.*;
import com.hahaton.dockertrainer.service.DockerTrainerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("Тестирование контроллера Docker тренажера")
class DockerTrainerControllerTest {

    @Mock
    private DockerTrainerService dockerTrainerService;
    
    @InjectMocks
    private DockerTrainerController dockerTrainerController;
    
    private DockerTask mockTask;
    private CommandSubmission mockSubmission;
    private CommandResult mockResult;
    private DockerProgress mockProgress;
    
    @BeforeEach
    @DisplayName("Инициализация тестового окружения")
    void setUp() {
        mockTask = DockerTask.builder()
                .id(1L)
                .level(1)
                .title("Тестовая задача")
                .story("Тестовая история")
                .description("Тестовое описание")
                .correctCommand("docker ps")
                .hints(new String[]{"Подсказка 1", "Подсказка 2"})
                .alternativeCommands(new String[]{"docker container ls"})
                .category("containers")
                .difficulty(1)
                .tags(new String[]{"docker", "ps"})
                .build();
        
        mockSubmission = new CommandSubmission(1, "docker ps", "test-user");
        
        mockResult = CommandResult.builder()
                .isCorrect(true)
                .hint("Отлично! Команда выполнена правильно")
                .feedback("Вы успешно решили задачу!")
                .score(100)
                .levelCompleted(true)
                .build();
        
        mockProgress = DockerProgress.builder()
                .userId("test-user")
                .currentLevel(2)
                .completedLevels(Set.of(1))
                .levelScores(java.util.Map.of(1, 100))
                .totalScore(100)
                .lastCompletedTask("Уровень 1")
                .lastActivityTime(System.currentTimeMillis())
                .build();
    }
    
    @Test
    @DisplayName("Должен возвращать случайную задачу для уровня")
    void shouldReturnRandomTaskForLevel() {
        // Given
        when(dockerTrainerService.getRandomTask(1)).thenReturn(mockTask);
        
        // When
        ResponseEntity<DockerTask> response = dockerTrainerController.getTask(1);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getId()).isEqualTo(1L);
        assertThat(response.getBody().getTitle()).isEqualTo("Тестовая задача");
    }
    
    @Test
    @DisplayName("Должен возвращать 404 для несуществующего уровня")
    void shouldReturn404ForNonExistentLevel() {
        // Given
        when(dockerTrainerService.getRandomTask(999)).thenReturn(null);
        
        // When
        ResponseEntity<DockerTask> response = dockerTrainerController.getTask(999);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(response.getBody()).isNull();
    }
    
    @Test
    @DisplayName("Должен корректно проверять команду")
    void shouldCheckCommand() {
        // Given
        when(dockerTrainerService.checkCommand(any(CommandSubmission.class))).thenReturn(mockResult);
        
        // When
        ResponseEntity<CommandResult> response = dockerTrainerController.checkCommand(mockSubmission);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getIsCorrect()).isTrue();
        assertThat(response.getBody().getHint()).contains("Отлично! Команда выполнена правильно");
        assertThat(response.getBody().getScore()).isEqualTo(100);
        assertThat(response.getBody().getLevelCompleted()).isTrue();
    }
    
    @Test
    @DisplayName("Должен возвращать ошибку для неправильной команды")
    void shouldReturnErrorForWrongCommand() {
        // Given
        CommandResult errorResult = CommandResult.builder()
                .isCorrect(false)
                .hint("Попробуйте использовать docker ps")
                .feedback("Попробуйте еще раз")
                .score(0)
                .levelCompleted(false)
                .build();
        when(dockerTrainerService.checkCommand(any(CommandSubmission.class))).thenReturn(errorResult);
        
        // When
        ResponseEntity<CommandResult> response = dockerTrainerController.checkCommand(mockSubmission);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getIsCorrect()).isFalse();
        assertThat(response.getBody().getScore()).isEqualTo(0);
        assertThat(response.getBody().getLevelCompleted()).isFalse();
    }
    
    @Test
    @DisplayName("Должен возвращать прогресс пользователя")
    void shouldReturnUserProgress() {
        // Given
        when(dockerTrainerService.getUserProgress("test-user")).thenReturn(mockProgress);
        
        // When
        ResponseEntity<DockerProgress> response = dockerTrainerController.getUserProgress("test-user");
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getUserId()).isEqualTo("test-user");
        assertThat(response.getBody().getCurrentLevel()).isEqualTo(2);
        assertThat(response.getBody().getCompletedLevels()).contains(1);
        assertThat(response.getBody().getTotalScore()).isEqualTo(100);
    }
    
    @Test
    @DisplayName("Должен возвращать новый прогресс для нового пользователя")
    void shouldReturnNewProgressForNewUser() {
        // Given
        DockerProgress newProgress = DockerProgress.builder()
                .userId("new-user")
                .currentLevel(1)
                .completedLevels(Set.of())
                .levelScores(java.util.Map.of())
                .totalScore(0)
                .build();
        when(dockerTrainerService.getUserProgress("new-user")).thenReturn(newProgress);
        
        // When
        ResponseEntity<DockerProgress> response = dockerTrainerController.getUserProgress("new-user");
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getUserId()).isEqualTo("new-user");
        assertThat(response.getBody().getCurrentLevel()).isEqualTo(1);
        assertThat(response.getBody().getCompletedLevels()).isEmpty();
        assertThat(response.getBody().getTotalScore()).isEqualTo(0);
    }
    
    @Test
    @DisplayName("Должен возвращать список задач для уровня")
    void shouldReturnTasksForLevel() {
        // Given
        List<DockerTask> tasks = List.of(mockTask);
        when(dockerTrainerService.getTasksForLevel(1)).thenReturn(tasks);
        
        // When
        ResponseEntity<List<DockerTask>> response = dockerTrainerController.getTasksForLevel(1);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody()).hasSize(1);
        assertThat(response.getBody().get(0).getLevel()).isEqualTo(1);
    }
    
    @Test
    @DisplayName("Должен возвращать пустой список для несуществующего уровня")
    void shouldReturnEmptyListForNonExistentLevel() {
        // Given
        when(dockerTrainerService.getTasksForLevel(999)).thenReturn(List.of());
        
        // When
        ResponseEntity<List<DockerTask>> response = dockerTrainerController.getTasksForLevel(999);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody()).isEmpty();
    }
    
    @Test
    @DisplayName("Должен возвращать общее количество уровней")
    void shouldReturnTotalLevels() {
        // Given
        when(dockerTrainerService.getTotalLevels()).thenReturn(6);
        
        // When
        ResponseEntity<Integer> response = dockerTrainerController.getTotalLevels();
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(6);
    }
    
    @Test
    @DisplayName("Должен корректно обрабатывать null submission")
    void shouldHandleNullSubmission() {
        // Given
        when(dockerTrainerService.checkCommand(null)).thenReturn(mockResult);
        
        // When
        ResponseEntity<CommandResult> response = dockerTrainerController.checkCommand(null);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
    }
    
    @Test
    @DisplayName("Должен возвращать задачу с полной информацией")
    void shouldReturnTaskWithFullInformation() {
        // Given
        when(dockerTrainerService.getRandomTask(1)).thenReturn(mockTask);
        
        // When
        ResponseEntity<DockerTask> response = dockerTrainerController.getTask(1);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        DockerTask task = response.getBody();
        assertThat(task).isNotNull();
        assertThat(task.getId()).isEqualTo(1L);
        assertThat(task.getLevel()).isEqualTo(1);
        assertThat(task.getTitle()).isEqualTo("Тестовая задача");
        assertThat(task.getStory()).isEqualTo("Тестовая история");
        assertThat(task.getDescription()).isEqualTo("Тестовое описание");
        assertThat(task.getCorrectCommand()).isEqualTo("docker ps");
        assertThat(task.getHints()).contains("Подсказка 1", "Подсказка 2");
        assertThat(task.getAlternativeCommands()).contains("docker container ls");
        assertThat(task.getCategory()).isEqualTo("containers");
        assertThat(task.getDifficulty()).isEqualTo(1);
        assertThat(task.getTags()).contains("docker", "ps");
    }
    
    @Test
    @DisplayName("Должен возвращать частичный балл за правильную основную команду")
    void shouldReturnPartialScoreForCorrectMainCommand() {
        // Given
        CommandResult partialResult = CommandResult.builder()
                .isCorrect(false)
                .hint("Правильно! Теперь добавьте фильтр по времени")
                .feedback("Команда правильная, но параметры неверные")
                .score(50)
                .levelCompleted(false)
                .build();
        when(dockerTrainerService.checkCommand(any(CommandSubmission.class))).thenReturn(partialResult);
        
        // When
        ResponseEntity<CommandResult> response = dockerTrainerController.checkCommand(mockSubmission);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getIsCorrect()).isFalse();
        assertThat(response.getBody().getScore()).isEqualTo(50);
        assertThat(response.getBody().getLevelCompleted()).isFalse();
        assertThat(response.getBody().getHint()).contains("Правильно! Теперь добавьте фильтр по времени");
    }
    
    @Test
    @DisplayName("Должен возвращать альтернативную команду как правильную")
    void shouldReturnAlternativeCommandAsCorrect() {
        // Given
        CommandResult altResult = CommandResult.builder()
                .isCorrect(true)
                .hint("Хорошо! Альтернативная команда тоже подходит")
                .feedback("Задача решена альтернативным способом")
                .score(90)
                .levelCompleted(true)
                .build();
        when(dockerTrainerService.checkCommand(any(CommandSubmission.class))).thenReturn(altResult);
        
        // When
        ResponseEntity<CommandResult> response = dockerTrainerController.checkCommand(mockSubmission);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getIsCorrect()).isTrue();
        assertThat(response.getBody().getScore()).isEqualTo(90);
        assertThat(response.getBody().getLevelCompleted()).isTrue();
        assertThat(response.getBody().getHint()).contains("Хорошо! Альтернативная команда тоже подходит");
    }
}
