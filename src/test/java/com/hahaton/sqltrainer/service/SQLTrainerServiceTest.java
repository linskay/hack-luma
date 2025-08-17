package com.hahaton.sqltrainer.service;

import com.hahaton.sqltrainer.model.Task;
import com.hahaton.sqltrainer.model.TaskResult;
import com.hahaton.sqltrainer.model.TaskSubmission;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("Тестирование сервиса SQL тренажера")
class SQLTrainerServiceTest {

    @Mock
    private JdbcTemplate jdbcTemplate;
    
    private SQLTrainerService sqlTrainerService;
    
    @BeforeEach
    @DisplayName("Инициализация тестового окружения")
    void setUp() {
        sqlTrainerService = new SQLTrainerService(jdbcTemplate);
    }
    
    @Test
    @DisplayName("Должен возвращать null для несуществующей задачи")
    void shouldReturnNullForNonExistentTask() {
        // When
        Task task = sqlTrainerService.getTask(999, 999);
        
        // Then
        assertThat(task).isNull();
    }
    
    @Test
    @DisplayName("Должен возвращать пустой список для несуществующего уровня")
    void shouldReturnEmptyListForNonExistentLevel() {
        // When
        List<Task> tasks = sqlTrainerService.getLevelTasks(999);
        
        // Then
        assertThat(tasks).isEmpty();
    }
    
    @Test
    @DisplayName("Должен возвращать ошибку для несуществующей задачи")
    void shouldReturnErrorForNonExistentTask() {
        // Given
        TaskSubmission submission = new TaskSubmission();
        submission.setLevel(999);
        submission.setTaskNumber(999);
        submission.setQuery("SELECT * FROM table;");
        
        // When
        TaskResult result = sqlTrainerService.checkTask(submission);
        
        // Then
        assertThat(result).isNotNull();
        assertThat(result.isCorrect()).isFalse();
        assertThat(result.getMessage()).isEqualTo("Задача не найдена");
    }
}
