package com.hahaton.service;

import com.hahaton.ai.GeminiService;
import com.hahaton.model.ResumeRequest;
import com.hahaton.model.ResumeResponse;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    @Autowired
    private GeminiService geminiService;

    public ResumeResponse generateResume(ResumeRequest request) {
        try {
            // Генерируем текст резюме с помощью ИИ
            String resumeText = generateResumeText(request);
            
            // Создаем PDF
            byte[] pdfBytes = createPDF(resumeText, request);
            String pdfBase64 = Base64.getEncoder().encodeToString(pdfBytes);
            
            return new ResumeResponse(pdfBase64, "Резюме успешно сгенерировано", true);
        } catch (Exception e) {
            return new ResumeResponse(null, "Ошибка при генерации резюме: " + e.getMessage(), false);
        }
    }

        private String generateResumeText(ResumeRequest request) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Создай профессиональное резюме в формате текста на русском языке для позиции: ")
               .append(request.getJobTitle());
        
        if (request.getJobUrl() != null && !request.getJobUrl().isEmpty()) {
            prompt.append("\nСсылка на вакансию: ").append(request.getJobUrl());
            // Добавляем контекст в зависимости от типа вакансии
            String jobContext = getJobContextFromUrl(request.getJobUrl());
            if (jobContext != null) {
                prompt.append("\nКонтекст вакансии: ").append(jobContext);
            }
        }
        prompt.append("\n\n");

        // Личная информация
        if (request.getPersonalInfo() != null) {
            prompt.append("Личная информация:\n");
            prompt.append("Имя: ").append(request.getPersonalInfo().getName()).append("\n");
            prompt.append("Email: ").append(request.getPersonalInfo().getEmail()).append("\n");
            prompt.append("Телефон: ").append(request.getPersonalInfo().getPhone()).append("\n");
            prompt.append("Местоположение: ").append(request.getPersonalInfo().getLocation()).append("\n\n");
        }

        // Навыки
        if (request.getSkills() != null && !request.getSkills().isEmpty()) {
            prompt.append("Навыки:\n");
            for (ResumeRequest.Skill skill : request.getSkills()) {
                prompt.append("- ").append(skill.getName())
                      .append(" (").append(skill.getCategory()).append(") - ")
                      .append(skill.getLevel()).append("%\n");
            }
            prompt.append("\n");
        }

        // Опыт работы
        if (request.getExperience() != null && !request.getExperience().isEmpty()) {
            prompt.append("Опыт работы:\n").append(request.getExperience()).append("\n\n");
        }

        // Образование
        if (request.getEducation() != null && !request.getEducation().isEmpty()) {
            prompt.append("Образование:\n").append(request.getEducation()).append("\n\n");
        }

        // Дополнительная информация
        if (request.getAdditionalInfo() != null && !request.getAdditionalInfo().isEmpty()) {
            prompt.append("Дополнительная информация:\n").append(request.getAdditionalInfo()).append("\n\n");
        }

        prompt.append("Создай структурированное резюме с разделами: Профессиональный опыт, Навыки, Образование, Дополнительная информация. " +
                     "Используй профессиональный язык, подчеркни достижения и результаты.");

        try {
            return geminiService.generateText(prompt.toString());
        } catch (Exception e) {
            // Fallback к базовому шаблону если ИИ недоступен
            return createFallbackResume(request);
        }
    }

    private String createFallbackResume(ResumeRequest request) {
        StringBuilder resume = new StringBuilder();
        
        resume.append("РЕЗЮМЕ\n\n");
        
        if (request.getPersonalInfo() != null) {
            resume.append("ЛИЧНАЯ ИНФОРМАЦИЯ\n");
            resume.append("Имя: ").append(request.getPersonalInfo().getName()).append("\n");
            resume.append("Email: ").append(request.getPersonalInfo().getEmail()).append("\n");
            resume.append("Телефон: ").append(request.getPersonalInfo().getPhone()).append("\n");
            resume.append("Местоположение: ").append(request.getPersonalInfo().getLocation()).append("\n\n");
        }
        
        resume.append("ЦЕЛЬ\n");
        resume.append("Получение позиции ").append(request.getJobTitle());
        if (request.getJobUrl() != null && !request.getJobUrl().isEmpty()) {
            resume.append("\nВакансия: ").append(request.getJobUrl());
            String context = getJobContextFromUrl(request.getJobUrl());
            if (context != null) {
                resume.append("\nКонтекст: ").append(context);
            }
        }
        resume.append("\n\n");
        
        if (request.getSkills() != null && !request.getSkills().isEmpty()) {
            resume.append("НАВЫКИ\n");
            for (ResumeRequest.Skill skill : request.getSkills()) {
                resume.append("• ").append(skill.getName())
                      .append(" (").append(skill.getCategory()).append(")\n");
            }
            resume.append("\n");
        }
        
        if (request.getExperience() != null && !request.getExperience().isEmpty()) {
            resume.append("ОПЫТ РАБОТЫ\n");
            resume.append(request.getExperience()).append("\n\n");
        } else {
            // Добавляем умную заглушку для опыта работы
            resume.append("ОПЫТ РАБОТЫ\n");
            resume.append(generateExperiencePlaceholder(request.getJobTitle())).append("\n\n");
        }
        
        if (request.getEducation() != null && !request.getEducation().isEmpty()) {
            resume.append("ОБРАЗОВАНИЕ\n");
            resume.append(request.getEducation()).append("\n\n");
        } else {
            // Добавляем умную заглушку для образования
            resume.append("ОБРАЗОВАНИЕ\n");
            resume.append(generateEducationPlaceholder(request.getJobTitle())).append("\n\n");
        }
        
        return resume.toString();
    }

    private byte[] createPDF(String resumeText, ResumeRequest request) throws DocumentException, IOException {
        Document document = new Document();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, baos);
        
        document.open();
        
        // Заголовок
        Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
        Paragraph title = new Paragraph("РЕЗЮМЕ", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(20);
        document.add(title);
        
        // Личная информация
        if (request.getPersonalInfo() != null) {
            Font sectionFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD);
            Paragraph personalInfoTitle = new Paragraph("ЛИЧНАЯ ИНФОРМАЦИЯ", sectionFont);
            personalInfoTitle.setSpacingAfter(10);
            document.add(personalInfoTitle);
            
            Font normalFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL);
            document.add(new Paragraph("Имя: " + request.getPersonalInfo().getName(), normalFont));
            document.add(new Paragraph("Email: " + request.getPersonalInfo().getEmail(), normalFont));
            document.add(new Paragraph("Телефон: " + request.getPersonalInfo().getPhone(), normalFont));
            document.add(new Paragraph("Местоположение: " + request.getPersonalInfo().getLocation(), normalFont));
            document.add(new Paragraph(" ")); // Пустая строка
        }
        
        // Основной текст резюме
        Font contentFont = new Font(Font.FontFamily.HELVETICA, 11, Font.NORMAL);
        String[] lines = resumeText.split("\n");
        for (String line : lines) {
            if (!line.trim().isEmpty()) {
                Paragraph paragraph = new Paragraph(line, contentFont);
                paragraph.setSpacingAfter(5);
                document.add(paragraph);
            }
        }
        
        document.close();
        return baos.toByteArray();
    }
    
    /**
     * Определяет контекст вакансии на основе URL
     */
    private String getJobContextFromUrl(String url) {
        if (url == null || url.isEmpty()) {
            return null;
        }
        
        String lowerUrl = url.toLowerCase();
        
        // HeadHunter
        if (lowerUrl.contains("hh.ru") || lowerUrl.contains("headhunter")) {
            return "Вакансия с HeadHunter - крупнейшей российской платформы поиска работы. " +
                   "Адаптируй резюме под корпоративные стандарты и требования HR-специалистов.";
        }
        
        // SuperJob
        if (lowerUrl.contains("superjob.ru") || lowerUrl.contains("superjob")) {
            return "Вакансия с SuperJob - профессиональной платформы для поиска работы. " +
                   "Сделай акцент на профессиональных достижениях и результатах.";
        }
        
        // LinkedIn
        if (lowerUrl.contains("linkedin.com") || lowerUrl.contains("linkedin")) {
            return "Вакансия с LinkedIn - международной профессиональной сети. " +
                   "Используй более формальный стиль и международные стандарты резюме.";
        }
        
        // GitHub Jobs
        if (lowerUrl.contains("jobs.github.com") || lowerUrl.contains("github")) {
            return "Вакансия с GitHub Jobs - платформы для IT-специалистов. " +
                   "Подчеркни технические навыки, open source проекты и код-ревью.";
        }
        
        // Stack Overflow Jobs
        if (lowerUrl.contains("stackoverflow.com/jobs") || lowerUrl.contains("stackoverflow")) {
            return "Вакансия с Stack Overflow Jobs - платформы для разработчиков. " +
                   "Сделай акцент на решении технических задач и участии в сообществе.";
        }
        
        // Яндекс.Работа
        if (lowerUrl.contains("yandex.ru/jobs") || lowerUrl.contains("yandex")) {
            return "Вакансия с Яндекс.Работа - платформы Яндекса. " +
                   "Адаптируй под высокие технические стандарты и инновационные проекты.";
        }
        
        // Общие IT-платформы
        if (lowerUrl.contains("rabota.yandex.ru") || lowerUrl.contains("career.habr.com")) {
            return "Вакансия с IT-специализированной платформы. " +
                   "Подчеркни техническую экспертизу и современные технологии.";
        }
        
        // Корпоративные сайты
        if (lowerUrl.contains("careers.") || lowerUrl.contains("jobs.")) {
            return "Вакансия с корпоративного сайта. " +
                   "Используй более формальный стиль и корпоративную терминологию.";
        }
        
        return "Вакансия с внешней платформы. Адаптируй резюме под общие профессиональные стандарты.";
    }
    
    /**
     * Генерирует умную заглушку для опыта работы на основе должности
     */
    private String generateExperiencePlaceholder(String jobTitle) {
        if (jobTitle == null) {
            return "Опыт работы в сфере разработки программного обеспечения";
        }
        
        String lowerTitle = jobTitle.toLowerCase();
        
        if (lowerTitle.contains("frontend") || lowerTitle.contains("react") || lowerTitle.contains("vue")) {
            return "• Разработка пользовательских интерфейсов с использованием современных технологий\n" +
                   "• Создание адаптивных и отзывчивых веб-приложений\n" +
                   "• Оптимизация производительности фронтенд-приложений\n" +
                   "• Работа с REST API и интеграция с бэкендом";
        }
        
        if (lowerTitle.contains("backend") || lowerTitle.contains("java") || lowerTitle.contains("spring")) {
            return "• Разработка серверной части веб-приложений\n" +
                   "• Создание и поддержка REST API\n" +
                   "• Работа с базами данных и оптимизация запросов\n" +
                   "• Интеграция с внешними сервисами и API";
        }
        
        if (lowerTitle.contains("full stack") || lowerTitle.contains("fullstack")) {
            return "• Полный цикл разработки веб-приложений\n" +
                   "• Разработка как клиентской, так и серверной части\n" +
                   "• Архитектурное проектирование и оптимизация\n" +
                   "• Взаимодействие с командой разработки и заказчиками";
        }
        
        if (lowerTitle.contains("devops") || lowerTitle.contains("sre")) {
            return "• Настройка и поддержка CI/CD пайплайнов\n" +
                   "• Управление инфраструктурой в облаке\n" +
                   "• Мониторинг и обеспечение надежности систем\n" +
                   "• Автоматизация процессов развертывания";
        }
        
        if (lowerTitle.contains("data") || lowerTitle.contains("analyst")) {
            return "• Анализ и обработка больших объемов данных\n" +
                   "• Создание отчетов и дашбордов\n" +
                   "• Разработка алгоритмов машинного обучения\n" +
                   "• Визуализация данных и презентация результатов";
        }
        
        if (lowerTitle.contains("mobile") || lowerTitle.contains("ios") || lowerTitle.contains("android")) {
            return "• Разработка мобильных приложений\n" +
                   "• Создание нативных и кроссплатформенных решений\n" +
                   "• Оптимизация производительности мобильных приложений\n" +
                   "• Публикация в App Store и Google Play";
        }
        
        return "• Разработка программного обеспечения\n" +
               "• Участие в полном цикле разработки\n" +
               "• Работа в команде разработчиков\n" +
               "• Решение технических задач и оптимизация кода";
    }
    
    /**
     * Генерирует умную заглушку для образования на основе должности
     */
    private String generateEducationPlaceholder(String jobTitle) {
        if (jobTitle == null) {
            return "Высшее техническое образование в области информационных технологий";
        }
        
        String lowerTitle = jobTitle.toLowerCase();
        
        if (lowerTitle.contains("data") || lowerTitle.contains("analyst") || lowerTitle.contains("ml")) {
            return "Высшее образование в области математики, статистики или информационных технологий\n" +
                   "Курсы по машинному обучению и анализу данных";
        }
        
        if (lowerTitle.contains("devops") || lowerTitle.contains("sre")) {
            return "Высшее техническое образование\n" +
                   "Сертификаты по облачным технологиям (AWS, Azure, GCP)";
        }
        
        return "Высшее техническое образование в области информационных технологий\n" +
               "Дополнительные курсы и сертификации по современным технологиям";
    }
}
