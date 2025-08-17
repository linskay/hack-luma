package com.hahaton.model;

import com.hahaton.dockertrainer.model.CommandResult;
import com.hahaton.dockertrainer.model.CommandSubmission;
import com.hahaton.dockertrainer.model.DockerProgress;
import com.hahaton.dockertrainer.model.DockerTask;
import com.hahaton.sqltrainer.model.Task;
import com.hahaton.sqltrainer.model.TaskResult;
import com.hahaton.sqltrainer.model.TaskSubmission;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Тестирование моделей данных")
class ModelTest {

    @Test
    @DisplayName("Должен создавать Task с помощью Builder")
    void shouldCreateTaskWithBuilder() {
        // Given & When
        Task task = Task.builder()
                .id(1L)
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

        // Then
        assertThat(task).isNotNull();
        assertThat(task.getId()).isEqualTo(1L);
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
    @DisplayName("Должен создавать TaskSubmission с помощью сеттеров")
    void shouldCreateTaskSubmissionWithSetters() {
        // Given
        TaskSubmission submission = new TaskSubmission();

        // When
        submission.setLevel(1);
        submission.setTaskNumber(1);
        submission.setQuery("SELECT * FROM test;");

        // Then
        assertThat(submission).isNotNull();
        assertThat(submission.getLevel()).isEqualTo(1);
        assertThat(submission.getTaskNumber()).isEqualTo(1);
        assertThat(submission.getQuery()).isEqualTo("SELECT * FROM test;");
    }

    @Test
    @DisplayName("Должен создавать TaskResult с помощью Builder")
    void shouldCreateTaskResultWithBuilder() {
        // Given & When
        TaskResult result = TaskResult.builder()
                .isCorrect(true)
                .message("Отлично! Запрос выполнен корректно")
                .hint("Тестовая подсказка")
                .expectedResult(List.of(Map.of("name", "Test")))
                .actualResult(List.of(Map.of("name", "Test")))
                .errorMessage(null)
                .build();

        // Then
        assertThat(result).isNotNull();
        assertThat(result.isCorrect()).isTrue();
        assertThat(result.getMessage()).isEqualTo("Отлично! Запрос выполнен корректно");
        assertThat(result.getHint()).isEqualTo("Тестовая подсказка");
        assertThat(result.getExpectedResult()).hasSize(1);
        assertThat(result.getActualResult()).hasSize(1);
        assertThat(result.getErrorMessage()).isNull();
    }

    @Test
    @DisplayName("Должен создавать DockerTask с помощью Builder")
    void shouldCreateDockerTaskWithBuilder() {
        // Given & When
        DockerTask task = DockerTask.builder()
                .id(1L)
                .level(1)
                .title("Тестовая Docker задача")
                .story("Тестовая Docker история")
                .description("Тестовое Docker описание")
                .correctCommand("docker ps")
                .hints(new String[]{"Подсказка 1", "Подсказка 2"})
                .alternativeCommands(new String[]{"docker container ls"})
                .category("containers")
                .difficulty(1)
                .tags(new String[]{"docker", "ps"})
                .build();

        // Then
        assertThat(task).isNotNull();
        assertThat(task.getId()).isEqualTo(1L);
        assertThat(task.getLevel()).isEqualTo(1);
        assertThat(task.getTitle()).isEqualTo("Тестовая Docker задача");
        assertThat(task.getStory()).isEqualTo("Тестовая Docker история");
        assertThat(task.getDescription()).isEqualTo("Тестовое Docker описание");
        assertThat(task.getCorrectCommand()).isEqualTo("docker ps");
        assertThat(task.getHints()).contains("Подсказка 1", "Подсказка 2");
        assertThat(task.getAlternativeCommands()).contains("docker container ls");
        assertThat(task.getCategory()).isEqualTo("containers");
        assertThat(task.getDifficulty()).isEqualTo(1);
        assertThat(task.getTags()).contains("docker", "ps");
    }

    @Test
    @DisplayName("Должен создавать CommandSubmission с помощью конструктора")
    void shouldCreateCommandSubmissionWithConstructor() {
        // Given & When
        CommandSubmission submission = new CommandSubmission(1, "docker ps", "test-user");

        // Then
        assertThat(submission).isNotNull();
        assertThat(submission.getLevel()).isEqualTo(1);
        assertThat(submission.getCommand()).isEqualTo("docker ps");
        assertThat(submission.getUserId()).isEqualTo("test-user");
    }

    @Test
    @DisplayName("Должен создавать CommandResult с помощью Builder")
    void shouldCreateCommandResultWithBuilder() {
        // Given & When
        CommandResult result = CommandResult.builder()
                .isCorrect(true)
                .hint("Отлично! Команда выполнена правильно")
                .feedback("Вы успешно решили задачу!")
                .score(100)
                .levelCompleted(true)
                .build();

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getIsCorrect()).isTrue();
        assertThat(result.getHint()).isEqualTo("Отлично! Команда выполнена правильно");
        assertThat(result.getFeedback()).isEqualTo("Вы успешно решили задачу!");
        assertThat(result.getScore()).isEqualTo(100);
        assertThat(result.getLevelCompleted()).isTrue();
    }

    @Test
    @DisplayName("Должен создавать DockerProgress с помощью Builder")
    void shouldCreateDockerProgressWithBuilder() {
        // Given & When
        DockerProgress progress = DockerProgress.builder()
                .userId("test-user")
                .currentLevel(2)
                .completedLevels(Set.of(1))
                .levelScores(Map.of(1, 100))
                .totalScore(100)
                .lastCompletedTask("Уровень 1")
                .lastActivityTime(System.currentTimeMillis())
                .build();

        // Then
        assertThat(progress).isNotNull();
        assertThat(progress.getUserId()).isEqualTo("test-user");
        assertThat(progress.getCurrentLevel()).isEqualTo(2);
        assertThat(progress.getCompletedLevels()).contains(1);
        assertThat(progress.getLevelScores()).containsEntry(1, 100);
        assertThat(progress.getTotalScore()).isEqualTo(100);
        assertThat(progress.getLastCompletedTask()).isEqualTo("Уровень 1");
        assertThat(progress.getLastActivityTime()).isGreaterThan(0);
    }

    @Test
    @DisplayName("Должен корректно работать equals и hashCode для Task")
    void shouldWorkEqualsAndHashCodeForTask() {
        // Given
        Task task1 = Task.builder()
                .id(1L)
                .level(1)
                .taskNumber(1)
                .title("Задача 1")
                .build();

        Task task2 = Task.builder()
                .id(1L)
                .level(1)
                .taskNumber(1)
                .title("Задача 1")
                .build();

        Task task3 = Task.builder()
                .id(2L)
                .level(1)
                .taskNumber(1)
                .title("Задача 1")
                .build();

        // Then
        assertThat(task1).isEqualTo(task2);
        assertThat(task1).isNotEqualTo(task3);
        assertThat(task1.hashCode()).isEqualTo(task2.hashCode());
        assertThat(task1.hashCode()).isNotEqualTo(task3.hashCode());
    }

    @Test
    @DisplayName("Должен корректно работать equals и hashCode для CommandSubmission")
    void shouldWorkEqualsAndHashCodeForCommandSubmission() {
        // Given
        CommandSubmission submission1 = new CommandSubmission(1, "docker ps", "user1");
        CommandSubmission submission2 = new CommandSubmission(1, "docker ps", "user1");
        CommandSubmission submission3 = new CommandSubmission(2, "docker ps", "user1");

        // Then
        assertThat(submission1).isEqualTo(submission2);
        assertThat(submission1).isNotEqualTo(submission3);
        assertThat(submission1.hashCode()).isEqualTo(submission2.hashCode());
        assertThat(submission1.hashCode()).isNotEqualTo(submission3.hashCode());
    }

    @Test
    @DisplayName("Должен корректно работать toString для всех моделей")
    void shouldWorkToStringForAllModels() {
        // Given & When
        Task task = Task.builder().id(1L).title("Test Task").build();
        TaskSubmission submission = new TaskSubmission();
        submission.setQuery("SELECT * FROM test;");
        TaskResult result = TaskResult.builder().isCorrect(true).build();
        DockerTask dockerTask = DockerTask.builder().id(1L).title("Test Docker Task").build();
        CommandSubmission commandSubmission = new CommandSubmission(1, "docker ps", "user");
        CommandResult commandResult = CommandResult.builder().isCorrect(true).build();
        DockerProgress progress = DockerProgress.builder().userId("user").build();

        // Then
        assertThat(task.toString()).isNotNull().isNotEmpty();
        assertThat(submission.toString()).isNotNull().isNotEmpty();
        assertThat(result.toString()).isNotNull().isNotEmpty();
        assertThat(dockerTask.toString()).isNotNull().isNotEmpty();
        assertThat(commandSubmission.toString()).isNotNull().isNotEmpty();
        assertThat(commandResult.toString()).isNotNull().isNotEmpty();
        assertThat(progress.toString()).isNotNull().isNotEmpty();
    }

    @Test
    @DisplayName("Должен корректно обрабатывать null значения в моделях")
    void shouldHandleNullValuesInModels() {
        // Given & When
        Task task = Task.builder()
                .id(1L)
                .title(null)
                .story(null)
                .build();

        TaskSubmission submission = new TaskSubmission();
        submission.setLevel(null);
        submission.setQuery(null);

        // Then
        assertThat(task).isNotNull();
        assertThat(task.getTitle()).isNull();
        assertThat(task.getStory()).isNull();
        assertThat(submission.getLevel()).isNull();
        assertThat(submission.getQuery()).isNull();
    }
}
