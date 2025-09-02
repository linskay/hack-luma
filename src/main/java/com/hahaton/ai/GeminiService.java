package com.hahaton.ai;

import com.hahaton.config.GeminiConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class GeminiService {
    
    private final GeminiConfig geminiConfig;
    private final RestTemplate restTemplate;
    
    @Autowired
    public GeminiService(GeminiConfig geminiConfig) {
        this.geminiConfig = geminiConfig;
        this.restTemplate = new RestTemplate();
    }
    
    public String generateResponse(String question) {
        return generateText(buildPrompt(question));
    }
    
    public String generateText(String prompt) {
        try {
            // Формируем запрос к Gemini API
            Map<String, Object> requestBody = new HashMap<>();
            
            // Содержимое запроса
            Map<String, Object> content = new HashMap<>();
            content.put("parts", new Object[]{
                Map.of("text", prompt)
            });
            
            requestBody.put("contents", new Object[]{content});
            
            // Настройки генерации
            Map<String, Object> generationConfig = new HashMap<>();
            generationConfig.put("maxOutputTokens", geminiConfig.getMaxTokens());
            generationConfig.put("temperature", geminiConfig.getTemperature());
            generationConfig.put("topP", 0.8);
            generationConfig.put("topK", 40);
            
            requestBody.put("generationConfig", generationConfig);
            
            // Заголовки запроса
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            // Проверка и формирование корректного URL и ключа
            String apiKey = safeTrim(geminiConfig.getApiKey());
            String apiUrl = safeTrim(geminiConfig.getApiUrl());
            String model = safeTrim(geminiConfig.getModelName());
            if (apiUrl == null || apiUrl.isEmpty()) {
                // Формируем URL по умолчанию
                String m = (model == null || model.isEmpty()) ? "gemini-pro" : model;
                apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/" + m + ":generateContent";
            }
            if (apiKey == null || apiKey.isEmpty()) {
                System.err.println("Gemini API key is empty. Set GEMINI_API_KEY or gemini.api.key property.");
                return "Извините, ключ API Gemini не настроен. Обратитесь к администратору.";
            }
            if (!apiUrl.startsWith("http")) {
                System.err.println("Gemini API URL is invalid: " + apiUrl);
                return "Извините, конфигурация AI некорректна (URL). Попробуйте позже.";
            }
            
            // URL с API ключом
            String url = apiUrl + "?key=" + apiKey;
            
            // Отправляем запрос
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return extractResponse(response.getBody());
            } else {
                return "Извините, не удалось получить ответ от AI. Попробуйте еще раз.";
            }
            
        } catch (Exception e) {
            System.err.println("Ошибка при обращении к Gemini API: " + e.getMessage());
            return "Извините, произошла ошибка при обработке вашего вопроса. Попробуйте еще раз.";
        }
    }
    
    private String buildPrompt(String question) {
        return String.format(
            "Ты - AI помощник по обучению программированию. " +
            "Отвечай на вопросы кратко, но информативно, на русском языке. " +
            "Если вопрос не связан с программированием, вежливо перенаправь разговор на эту тему. " +
            "Вопрос пользователя: %s",
            question
        );
    }
    
    private String extractResponse(Map responseBody) {
        try {
            if (responseBody.containsKey("candidates")) {
                Object[] candidates = (Object[]) responseBody.get("candidates");
                if (candidates.length > 0) {
                    Map candidate = (Map) candidates[0];
                    if (candidate.containsKey("content")) {
                        Map content = (Map) candidate.get("content");
                        if (content.containsKey("parts")) {
                            Object[] parts = (Object[]) content.get("parts");
                            if (parts.length > 0) {
                                Map part = (Map) parts[0];
                                if (part.containsKey("text")) {
                                    return (String) part.get("text");
                                }
                            }
                        }
                    }
                }
            }
            return "Не удалось извлечь ответ из ответа API.";
        } catch (Exception e) {
            System.err.println("Ошибка при извлечении ответа: " + e.getMessage());
            return "Ошибка при обработке ответа AI.";
        }
    }
    
    public String getRandomTip() {
        String[] tips = {
            "💡 Начните с малого - простые программы помогут понять основы",
            "🚀 Практика важнее теории - пишите код каждый день",
            "🔍 Не бойтесь ошибок - они лучшие учителя",
            "📚 Изучайте чужой код - это расширяет кругозор",
            "🎯 Ставьте конкретные цели - например, создать простое приложение",
            "🤝 Присоединяйтесь к сообществам разработчиков",
            "📖 Документация - ваш лучший друг",
            "⚡ Оптимизируйте код только после того, как он работает"
        };
        
        return tips[(int) (Math.random() * tips.length)];
    }

    private String safeTrim(String s) {
        return s == null ? null : s.trim();
    }
}
