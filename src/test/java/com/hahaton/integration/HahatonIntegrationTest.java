package com.hahaton.integration;

import com.hahaton.dockertrainer.model.CommandSubmission;
import com.hahaton.sqltrainer.model.TaskSubmission;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureWebMvc
@ActiveProfiles("test")
@DisplayName("Интеграционные тесты приложения Hahaton")
class HahatonIntegrationTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @org.junit.jupiter.api.BeforeEach
    @DisplayName("Инициализация MockMvc")
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    @DisplayName("Должен загружать контекст приложения")
    void shouldLoadApplicationContext() {
        assertThat(webApplicationContext).isNotNull();
    }

    @Test
    @DisplayName("Должен возвращать задачу SQL тренажера")
    void shouldReturnSqlTrainerTask() throws Exception {
        mockMvc.perform(get("/api/sql-trainer/task/1/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.level").value(1))
                .andExpect(jsonPath("$.taskNumber").value(1))
                .andExpect(jsonPath("$.title").exists())
                .andExpect(jsonPath("$.story").exists())
                .andExpect(jsonPath("$.schema").exists())
                .andExpect(jsonPath("$.question").exists());
    }

    @Test
    @DisplayName("Должен возвращать 404 для несуществующей SQL задачи")
    void shouldReturn404ForNonExistentSqlTask() throws Exception {
        mockMvc.perform(get("/api/sql-trainer/task/999/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("Должен возвращать список SQL задач для уровня")
    void shouldReturnSqlTasksForLevel() throws Exception {
        mockMvc.perform(get("/api/sql-trainer/level/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].level").value(1));
    }

    @Test
    @DisplayName("Должен проверять SQL запрос")
    void shouldCheckSqlQuery() throws Exception {
        String requestBody = """
                {
                    "level": 1,
                    "taskNumber": 1,
                    "query": "SELECT name, last_seen FROM citizens WHERE last_seen >= NOW() - INTERVAL '24 HOUR' ORDER BY last_seen DESC;"
                }
                """;

        mockMvc.perform(post("/api/sql-trainer/check")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.message").exists());
    }

    @Test
    @DisplayName("Должен возвращать задачу Docker тренажера")
    void shouldReturnDockerTrainerTask() throws Exception {
        mockMvc.perform(get("/api/docker-trainer/task/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.level").value(1))
                .andExpect(jsonPath("$.title").exists())
                .andExpect(jsonPath("$.story").exists())
                .andExpect(jsonPath("$.description").exists())
                .andExpect(jsonPath("$.correctCommand").exists());
    }

    @Test
    @DisplayName("Должен возвращать 404 для несуществующего Docker уровня")
    void shouldReturn404ForNonExistentDockerLevel() throws Exception {
        mockMvc.perform(get("/api/docker-trainer/task/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("Должен проверять Docker команду")
    void shouldCheckDockerCommand() throws Exception {
        String requestBody = """
                {
                    "level": 1,
                    "command": "docker ps -a --filter \\"since=$(date -d '24 hours ago' +%Y-%m-%d)\\"",
                    "userId": "test-user"
                }
                """;

        mockMvc.perform(post("/api/docker-trainer/check-command")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.isCorrect").exists())
                .andExpect(jsonPath("$.hint").exists())
                .andExpect(jsonPath("$.feedback").exists())
                .andExpect(jsonPath("$.score").exists());
    }

    @Test
    @DisplayName("Должен возвращать прогресс Docker пользователя")
    void shouldReturnDockerUserProgress() throws Exception {
        mockMvc.perform(get("/api/docker-trainer/progress/test-user"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.userId").value("test-user"))
                .andExpect(jsonPath("$.currentLevel").exists())
                .andExpect(jsonPath("$.completedLevels").exists())
                .andExpect(jsonPath("$.totalScore").exists());
    }

    @Test
    @DisplayName("Должен возвращать список Docker задач для уровня")
    void shouldReturnDockerTasksForLevel() throws Exception {
        mockMvc.perform(get("/api/docker-trainer/tasks/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].level").value(1));
    }

    @Test
    @DisplayName("Должен возвращать общее количество Docker уровней")
    void shouldReturnTotalDockerLevels() throws Exception {
        mockMvc.perform(get("/api/docker-trainer/levels"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isNumber());
    }

    @Test
    @DisplayName("Должен возвращать статус здоровья Docker тренажера")
    void shouldReturnDockerTrainerHealth() throws Exception {
        mockMvc.perform(get("/api/docker-trainer/health"))
                .andExpect(status().isOk())
                .andExpect(content().string("Docker Trainer is running!"));
    }

    @Test
    @DisplayName("Должен обрабатывать некорректный JSON в SQL запросе")
    void shouldHandleInvalidJsonInSqlRequest() throws Exception {
        String invalidJson = "invalid json";

        mockMvc.perform(post("/api/sql-trainer/check")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Должен обрабатывать некорректный JSON в Docker запросе")
    void shouldHandleInvalidJsonInDockerRequest() throws Exception {
        String invalidJson = "invalid json";

        mockMvc.perform(post("/api/docker-trainer/check-command")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Должен возвращать CORS заголовки")
    void shouldReturnCorsHeaders() throws Exception {
        mockMvc.perform(get("/api/sql-trainer/task/1/1")
                .header("Origin", "http://localhost:3000"))
                .andExpect(status().isOk())
                .andExpect(header().exists("Access-Control-Allow-Origin"));
    }

    @Test
    @DisplayName("Должен обрабатывать OPTIONS запросы для CORS")
    void shouldHandleOptionsRequestsForCors() throws Exception {
        mockMvc.perform(options("/api/sql-trainer/task/1/1")
                .header("Origin", "http://localhost:3000")
                .header("Access-Control-Request-Method", "GET"))
                .andExpect(status().isOk());
    }
}
