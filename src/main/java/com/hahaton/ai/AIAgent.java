package com.hahaton.ai;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AIAgent {
    
    private final GeminiService geminiService;
    private final DJLService djlService;
    private Map<String, String> trainingResponses;
    
    @Autowired
    public AIAgent(GeminiService geminiService, DJLService djlService) {
        this.geminiService = geminiService;
        this.djlService = djlService;
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
        trainingResponses.put("python", "Python - это высокоуровневый язык программирования с простым синтаксисом. Отлично подходит для начинающих и используется в AI, веб-разработке, анализе данных.");
        trainingResponses.put("javascript", "JavaScript - это язык программирования для веб-разработки. Работает в браузере и на сервере (Node.js). Основа современной веб-разработки.");
        trainingResponses.put("typescript", "TypeScript - это надмножество JavaScript с типизацией. Разработан Microsoft для создания более надежного кода.");
        trainingResponses.put("node", "Node.js - это среда выполнения JavaScript на сервере. Позволяет использовать JavaScript для backend разработки.");
        trainingResponses.put("database", "База данных - это организованная коллекция данных. Основные типы: реляционные (MySQL, PostgreSQL) и NoSQL (MongoDB, Redis).");
        trainingResponses.put("algorithm", "Алгоритм - это пошаговая инструкция для решения задачи. Основа программирования и компьютерной науки.");
        trainingResponses.put("framework", "Фреймворк - это готовый каркас для разработки приложений. Предоставляет структуру и готовые компоненты.");
        trainingResponses.put("library", "Библиотека - это набор готовых функций и классов для решения конкретных задач.");
        
        // Добавляем DevOps и системные темы
        trainingResponses.put("docker", "Docker - это платформа для контейнеризации приложений. Позволяет упаковать приложение со всеми зависимостями в изолированный контейнер.");
        trainingResponses.put("git", "Git - это распределенная система контроля версий. Позволяет отслеживать изменения в коде, работать в команде и управлять версиями проекта.");
        trainingResponses.put("bash", "Bash - это командная оболочка Unix/Linux. Используется для автоматизации задач, написания скриптов и управления системой через командную строку.");
        trainingResponses.put("linux", "Linux - это свободная операционная система на базе ядра Linux. Широко используется в серверах, облачных платформах и разработке.");
        trainingResponses.put("kubernetes", "Kubernetes - это платформа для оркестрации контейнеров. Автоматизирует развертывание, масштабирование и управление контейнеризированными приложениями.");
    }
    
    public String getResponse(String question) {
        if (question == null || question.trim().isEmpty()) {
            return "Привет! Я AI помощник по обучению программированию! 🚀 Задайте мне вопрос о программировании!";
        }
        
        String lowerQuestion = question.toLowerCase();
        
        // Проверяем, есть ли предустановленный ответ для простых вопросов
        String topic = determineTopic(lowerQuestion);
        if (topic != null && trainingResponses.containsKey(topic)) {
            return trainingResponses.get(topic);
        }
        
        // Для сложных вопросов используем локальную логику
        // В будущем здесь можно будет подключить DJL модели для генерации ответов
        String generalResponse = generateGeneralResponse(question);
        
        // Если это общий ответ, добавляем безопасное сообщение
        if (generalResponse.contains("Отличный вопрос!") || generalResponse.contains("Программирование - это увлекательный мир")) {
            return generalResponse + "\n\n🤖 Я еще не обучен на все темы, но я стараюсь! В будущем я стану еще умнее и смогу отвечать на более сложные вопросы.";
        }
        
        return generalResponse;
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
        if (question.contains("python") || question.contains("питон")) return "python";
        if (question.contains("javascript") || question.contains("джаваскрипт")) return "javascript";
        if (question.contains("typescript")) return "typescript";
        if (question.contains("node") || question.contains("нод")) return "node";
        if (question.contains("database") || question.contains("база")) return "database";
        if (question.contains("algorithm") || question.contains("алгоритм")) return "algorithm";
        if (question.contains("framework") || question.contains("фреймворк")) return "framework";
        if (question.contains("library") || question.contains("библиотека")) return "library";
        if (question.contains("bash") || question.contains("баш")) return "bash";
        if (question.contains("linux") || question.contains("линукс")) return "linux";
        if (question.contains("kubernetes") || question.contains("кубернетис") || question.contains("k8s")) return "kubernetes";
        
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
        // Используем локальные советы вместо Gemini
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
    
    /**
     * Получение информации о возможностях AI агента
     */
    public Map<String, Object> getCapabilities() {
        Map<String, Object> capabilities = new HashMap<>();
        capabilities.put("gemini", "Google Gemini API для текстовых ответов");
        capabilities.put("djl", "Deep Java Library для работы с нейронными сетями");
        capabilities.put("models", "Предобученные модели для классификации и обнаружения объектов");
        capabilities.put("languages", "Поддержка Java, Python, JavaScript и других языков программирования");
        return capabilities;
    }
    
    /**
     * Проверка состояния всех AI сервисов
     */
    public Map<String, Object> getServiceStatus() {
        Map<String, Object> status = new HashMap<>();
        
        // Проверяем Gemini (опционально)
        try {
            String testResponse = geminiService.generateResponse("test");
            if (testResponse != null && !testResponse.contains("ключ API Gemini не настроен")) {
                status.put("gemini", "available");
            } else {
                status.put("gemini", "not_configured");
            }
        } catch (Exception e) {
            status.put("gemini", "not_available");
        }
        
        // Проверяем DJL
        try {
            Map<String, Object> djlHealth = djlService.healthCheck();
            Object success = djlHealth.get("success");
            status.put("djl", Boolean.TRUE.equals(success) ? "available" : "error");
        } catch (Exception e) {
            status.put("djl", "error: " + e.getMessage());
        }
        
        return status;
    }
}
