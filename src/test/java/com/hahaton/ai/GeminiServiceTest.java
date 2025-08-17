package com.hahaton.ai;

import com.hahaton.config.GeminiConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("Тестирование сервиса Gemini AI")
class GeminiServiceTest {

    @Mock
    private GeminiConfig geminiConfig;
    
    private GeminiService geminiService;
    
    @BeforeEach
    @DisplayName("Инициализация тестового окружения")
    void setUp() {
        geminiService = new GeminiService(geminiConfig);
    }
    
    @Test
    @DisplayName("Должен возвращать случайную подсказку")
    void shouldReturnRandomTip() {
        // When
        String tip = geminiService.getRandomTip();
        
        // Then
        assertThat(tip).isNotNull();
        assertThat(tip).isNotEmpty();
        assertThat(tip).matches("^[💡🚀🔍📚🎯🤝📖⚡].*");
    }
    
    @Test
    @DisplayName("Должен возвращать подсказку из предопределенного списка")
    void shouldReturnTipFromPredefinedList() {
        // When
        String tip = geminiService.getRandomTip();
        
        // Then
        assertThat(tip).isIn(
            "💡 Начните с малого - простые программы помогут понять основы",
            "🚀 Практика важнее теории - пишите код каждый день",
            "🔍 Не бойтесь ошибок - они лучшие учителя",
            "📚 Изучайте чужой код - это расширяет кругозор",
            "🎯 Ставьте конкретные цели - например, создать простое приложение",
            "🤝 Присоединяйтесь к сообществам разработчиков",
            "📖 Документация - ваш лучший друг",
            "⚡ Оптимизируйте код только после того, как он работает"
        );
    }
}
