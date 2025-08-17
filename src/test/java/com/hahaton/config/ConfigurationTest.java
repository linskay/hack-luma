package com.hahaton.config;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@DisplayName("Тестирование конфигурационных классов")
class ConfigurationTest {

    @Test
    @DisplayName("Должен загружать контекст приложения")
    void shouldLoadApplicationContext() {
        // Этот тест проверяет, что Spring контекст загружается корректно
        assertThat(true).isTrue();
    }
}
