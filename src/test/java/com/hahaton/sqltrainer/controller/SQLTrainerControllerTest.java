package com.hahaton.sqltrainer.controller;

import com.hahaton.sqltrainer.model.Task;
import com.hahaton.sqltrainer.model.TaskResult;
import com.hahaton.sqltrainer.model.TaskSubmission;
import com.hahaton.sqltrainer.service.SQLTrainerService;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("Тестирование контроллера SQL тренажера")
class SQLTrainerControllerTest {

    @Mock
    private SQLTrainerService sqlTrainerService;
    
    @InjectMocks
    private SQLTrainerController sqlTrainerController;
    
    private Task mockTask;
    private TaskSubmission mockSubmission;
    private TaskResult mockResult;
    
    @BeforeEach
    @DisplayName("Инициализация тестового окружения")
    void setUp() {
        mockTask = Task.builder()
                .id(101L)
                .level(1)
                .taskNumber(1)
                .title("Тестовая задача")
                .story("Тестовая история")
                .schema("CREATE TABLE test (id INT);")
                .question("Тестовый вопрос")
                .solution("SELECT * FROM test;")
                .hint("Тестовая подсказка")
                .difficulty("easy")
                .build();
        
        mockSubmission = new TaskSubmission();
        mockSubmission.setLevel(1);
        mockSubmission.setTaskNumber(1);
        mockSubmission.setQuery("SELECT * FROM test;");
        
        mockResult = TaskResult.builder()
                .isCorrect(true)
                .message("Отлично! Запрос выполнен корректно")
                .hint("Тестовая подсказка")
                .build();
    }
    
    @Test
    @DisplayName("Должен возвращать задачу по уровню и номеру")
    void shouldReturnTaskByLevelAndNumber() {
        // Given
        when(sqlTrainerService.getTask(1, 1)).thenReturn(mockTask);
        
        // When
        ResponseEntity<Task> response = sqlTrainerController.getTask(1, 1);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getId()).isEqualTo(101L);
        assertThat(response.getBody().getTitle()).isEqualTo("Тестовая задача");
    }
    
    @Test
    @DisplayName("Должен возвращать 404 для несуществующей задачи")
    void shouldReturn404ForNonExistentTask() {
        // Given
        when(sqlTrainerService.getTask(999, 999)).thenReturn(null);
        
        // When
        ResponseEntity<Task> response = sqlTrainerController.getTask(999, 999);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(response.getBody()).isNull();
    }
    
    @Test
    @DisplayName("Должен возвращать список задач для уровня")
    void shouldReturnTasksForLevel() {
        // Given
        List<Task> tasks = List.of(mockTask);
        when(sqlTrainerService.getLevelTasks(1)).thenReturn(tasks);
        
        // When
        ResponseEntity<List<Task>> response = sqlTrainerController.getLevelTasks(1);
        
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
        when(sqlTrainerService.getLevelTasks(999)).thenReturn(List.of());
        
        // When
        ResponseEntity<List<Task>> response = sqlTrainerController.getLevelTasks(999);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody()).isEmpty();
    }
    
    @Test
    @DisplayName("Должен корректно проверять SQL запрос")
    void shouldCheckSqlQuery() {
        // Given
        when(sqlTrainerService.checkTask(any(TaskSubmission.class))).thenReturn(mockResult);
        
        // When
        ResponseEntity<TaskResult> response = sqlTrainerController.checkTask(mockSubmission);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().isCorrect()).isTrue();
        assertThat(response.getBody().getMessage()).contains("Отлично! Запрос выполнен корректно");
    }
    
    @Test
    @DisplayName("Должен возвращать ошибку для некорректного запроса")
    void shouldReturnErrorForIncorrectQuery() {
        // Given
        TaskResult errorResult = TaskResult.builder()
                .isCorrect(false)
                .message("Ошибка в SQL запросе")
                .errorMessage("Table not found")
                .build();
        when(sqlTrainerService.checkTask(any(TaskSubmission.class))).thenReturn(errorResult);
        
        // When
        ResponseEntity<TaskResult> response = sqlTrainerController.checkTask(mockSubmission);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().isCorrect()).isFalse();
        assertThat(response.getBody().getMessage()).contains("Ошибка в SQL запросе");
        assertThat(response.getBody().getErrorMessage()).contains("Table not found");
    }
    
    @Test
    @DisplayName("Должен возвращать подсказку при неправильном результате")
    void shouldReturnHintForWrongResult() {
        // Given
        TaskResult hintResult = TaskResult.builder()
                .isCorrect(false)
                .message("Запрос выполнен, но результат не совпадает с ожидаемым")
                .hint("Используйте правильные поля в SELECT")
                .build();
        when(sqlTrainerService.checkTask(any(TaskSubmission.class))).thenReturn(hintResult);
        
        // When
        ResponseEntity<TaskResult> response = sqlTrainerController.checkTask(mockSubmission);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().isCorrect()).isFalse();
        assertThat(response.getBody().getHint()).contains("Используйте правильные поля в SELECT");
    }
    
    @Test
    @DisplayName("Должен корректно обрабатывать null submission")
    void shouldHandleNullSubmission() {
        // Given
        when(sqlTrainerService.checkTask(null)).thenReturn(mockResult);
        
        // When
        ResponseEntity<TaskResult> response = sqlTrainerController.checkTask(null);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
    }
    
    @Test
    @DisplayName("Должен возвращать задачу с полной информацией")
    void shouldReturnTaskWithFullInformation() {
        // Given
        when(sqlTrainerService.getTask(1, 1)).thenReturn(mockTask);
        
        // When
        ResponseEntity<Task> response = sqlTrainerController.getTask(1, 1);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        Task task = response.getBody();
        assertThat(task).isNotNull();
        assertThat(task.getId()).isEqualTo(101L);
        assertThat(task.getLevel()).isEqualTo(1);
        assertThat(task.getTaskNumber()).isEqualTo(1);
        assertThat(task.getTitle()).isEqualTo("Тестовая задача");
        assertThat(task.getStory()).isEqualTo("Тестовая история");
        assertThat(task.getSchema()).isEqualTo("CREATE TABLE test (id INT);");
        assertThat(task.getQuestion()).isEqualTo("Тестовый вопрос");
        assertThat(task.getSolution()).isEqualTo("SELECT * FROM test;");
        assertThat(task.getHint()).isEqualTo("Тестовая подсказка");
        assertThat(task.getDifficulty()).isEqualTo("easy");
    }
    
    @Test
    @DisplayName("Должен возвращать отсортированный список задач")
    void shouldReturnSortedTaskList() {
        // Given
        Task task1 = Task.builder().id(101L).level(1).taskNumber(1).title("Задача 1").build();
        Task task2 = Task.builder().id(102L).level(1).taskNumber(2).title("Задача 2").build();
        List<Task> tasks = List.of(task1, task2);
        when(sqlTrainerService.getLevelTasks(1)).thenReturn(tasks);
        
        // When
        ResponseEntity<List<Task>> response = sqlTrainerController.getLevelTasks(1);
        
        // Then
        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        List<Task> responseTasks = response.getBody();
        assertThat(responseTasks).isNotNull();
        assertThat(responseTasks).hasSize(2);
        assertThat(responseTasks.get(0).getTaskNumber()).isEqualTo(1);
        assertThat(responseTasks.get(1).getTaskNumber()).isEqualTo(2);
    }
}
