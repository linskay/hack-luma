package com.hahaton.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AIAgent {
    
    private final GeminiService geminiService;
    private Map<String, String> trainingResponses;
    
    @Autowired
    public AIAgent(GeminiService geminiService) {
        this.geminiService = geminiService;
        initializeResponses();
    }
    
    private void initializeResponses() {
        trainingResponses = new HashMap<>();
        trainingResponses.put("java", "Java - это объектно-ориентированный язык программирования. Основные концепции: классы, объекты, наследование, полиморфизм, инкапсуляция.");
        trainingResponses.put("spring", "Spring Framework - это популярный фреймворк для Java. Он предоставляет IoC контейнер, AOP, транзакции и многое другое.");
        trainingResponses.put("react", "React - это JavaScript библиотека для создания пользовательских интерфейсов. Использует компонентный подход и виртуальный DOM.");
        trainingResponses.put("maven", "Maven - это инструмент для управления проектами. Он автоматизирует сборку, тестирование и развертывание Java приложений.");
        trainingResponses.put("git", "Git - это система контроля версий. Позволяет отслеживать изменения в коде и работать в команде.");
        trainingResponses.put("docker", "Docker - это платформа для контейнеризации приложений. Позволяет упаковать приложение со всеми зависимостями.");
        trainingResponses.put("sql", "SQL - это язык структурированных запросов для работы с базами данных. Используется для создания, изменения и запросов к данным.");
        trainingResponses.put("api", "API (Application Programming Interface) - это набор правил для взаимодействия между программами. REST API использует HTTP методы.");
        trainingResponses.put("html", "HTML - это язык разметки для создания веб-страниц. Определяет структуру и содержимое страницы.");
        trainingResponses.put("css", "CSS - это язык стилей для оформления HTML документов. Позволяет изменять внешний вид элементов.");
    }
    
    public String getResponse(String question) {
        if (question == null || question.trim().isEmpty()) {
            return "Привет! Я AI помощник по обучению программированию, теперь работаю на Google Gemini! 🚀 Задайте мне вопрос о программировании!";
        }
        
        String lowerQuestion = question.toLowerCase();
        
        // Проверяем, есть ли предустановленный ответ для простых вопросов
        String topic = determineTopic(lowerQuestion);
        if (topic != null && trainingResponses.containsKey(topic)) {
            return trainingResponses.get(topic);
        }
        
        // Для сложных вопросов используем Gemini API
        try {
            return geminiService.generateResponse(question);
        } catch (Exception e) {
            System.err.println("Ошибка при обращении к Gemini API: " + e.getMessage());
            // Fallback на локальную логику
            return generateGeneralResponse(question);
        }
    }
    
    private String determineTopic(String question) {
        if (question.contains("java") || question.contains("джава")) return "java";
        if (question.contains("spring") || question.contains("спринг")) return "spring";
        if (question.contains("react") || question.contains("реакт")) return "react";
        if (question.contains("maven") || question.contains("мавен")) return "maven";
        if (question.contains("git") || question.contains("гит")) return "git";
        if (question.contains("docker") || question.contains("докер")) return "docker";
        if (question.contains("sql") || question.contains("база данных")) return "sql";
        if (question.contains("api") || question.contains("веб")) return "api";
        if (question.contains("html") || question.contains("хтмл")) return "html";
        if (question.contains("css") || question.contains("стили")) return "css";
        
        return null;
    }
    
    private String generateGeneralResponse(String question) {
        if (question.contains("как") || question.contains("how")) {
            return "Для изучения программирования рекомендую: 1) Начать с основ языка, 2) Решать практические задачи, 3) Изучать фреймворки, 4) Работать над проектами!";
        }
        
        if (question.contains("что") || question.contains("what")) {
            return "Программирование - это создание инструкций для компьютера. Оно включает алгоритмы, структуры данных, архитектуру приложений и многое другое!";
        }
        
        if (question.contains("почему") || question.contains("why")) {
            return "Программирование развивает логическое мышление, решает реальные проблемы и открывает множество карьерных возможностей в IT!";
        }
        
        return "Отличный вопрос! Программирование - это увлекательный мир, где вы можете создавать что угодно. Начните с основ и постепенно углубляйтесь в интересующие вас области!";
    }
    
    public String getRandomTip() {
        return geminiService.getRandomTip();
    }
}
