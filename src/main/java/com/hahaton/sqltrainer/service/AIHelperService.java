package com.hahaton.sqltrainer.service;

import com.hahaton.sqltrainer.model.Task;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Tag(name = "AI Helper Service", description = "Сервис для предоставления AI подсказок в SQL тренажере")
public class AIHelperService {
    
    private final SQLTrainerService sqlTrainerService;
    
    @Operation(summary = "Получить подсказку", description = "Получить базовую подсказку для задачи")
    public String getHint(
            @Parameter(description = "Уровень задачи") int level, 
            @Parameter(description = "Номер задачи") int taskNumber) {
        Task task = sqlTrainerService.getTask(level, taskNumber);
        if (task != null) {
            return task.getHint();
        }
        return "Задача не найдена";
    }
    
    @Operation(summary = "Получить детальную подсказку", description = "Получить персонализированную подсказку на основе запроса пользователя")
    public String getDetailedHint(
            @Parameter(description = "Уровень задачи") int level, 
            @Parameter(description = "Номер задачи") int taskNumber, 
            @Parameter(description = "Запрос пользователя") String userQuery) {
        Task task = sqlTrainerService.getTask(level, taskNumber);
        if (task == null) {
            return "Задача не найдена";
        }
        
        // Анализируем запрос пользователя и даем персонализированную подсказку
        String hint = analyzeQueryAndGiveHint(task, userQuery);
        return hint;
    }
    
    private String analyzeQueryAndGiveHint(Task task, String userQuery) {
        String query = userQuery.toLowerCase();
        String solution = task.getSolution().toLowerCase();
        
        // Проверяем наличие ключевых элементов
        if (!query.contains("select")) {
            return "Начните запрос с SELECT для выбора данных";
        }
        
        if (task.getLevel() <= 2) {
            // Базовые подсказки для начальных уровней
            if (query.contains("where") && !solution.contains("where")) {
                return "В этой задаче не нужен WHERE - просто выберите все данные";
            }
            
            if (query.contains("order by") && !solution.contains("order by")) {
                return "Проверьте, нужна ли сортировка в этой задаче";
            }
        }
        
        if (task.getLevel() >= 3) {
            // Подсказки для средних уровней
            if (query.contains("group by") && !solution.contains("group by")) {
                return "Подумайте, нужна ли группировка данных в этой задаче";
            }
            
            if (query.contains("join") && !solution.contains("join")) {
                return "Возможно, вам нужно объединить данные из нескольких таблиц";
            }
        }
        
        if (task.getLevel() >= 5) {
            // Подсказки для сложных уровней
            if (query.contains("over") && !solution.contains("over")) {
                return "Для этой задачи могут понадобиться оконные функции";
            }
            
            if (query.contains("with recursive") && !solution.contains("with recursive")) {
                return "Эта задача требует рекурсивного CTE (WITH RECURSIVE)";
            }
        }
        
        // Общая подсказка
        return task.getHint() + "\n\nПопробуйте проанализировать структуру таблиц и понять, какие данные нужно получить.";
    }
    
    public String getNextStepHint(int level, int taskNumber, String userQuery) {
        Task task = sqlTrainerService.getTask(level, taskNumber);
        if (task == null) {
            return "Задача не найдена";
        }
        
        // Даем пошаговую подсказку
        return getStepByStepHint(task, userQuery);
    }
    
    private String getStepByStepHint(Task task, String userQuery) {
        String query = userQuery.toLowerCase();
        
        if (task.getLevel() == 1) {
            return getLevel1StepHint(task, query);
        } else if (task.getLevel() == 2) {
            return getLevel2StepHint(task, query);
        } else if (task.getLevel() == 3) {
            return getLevel3StepHint(task, query);
        }
        
        return "Попробуйте разбить задачу на части и решать пошагово";
    }
    
    private String getLevel1StepHint(Task task, String query) {
        if (!query.contains("select")) {
            return "Шаг 1: Начните с SELECT и укажите нужные поля";
        }
        
        if (!query.contains("from")) {
            return "Шаг 2: Добавьте FROM и укажите таблицу";
        }
        
        if (task.getSolution().toLowerCase().contains("where") && !query.contains("where")) {
            return "Шаг 3: Добавьте WHERE для фильтрации данных";
        }
        
        if (task.getSolution().toLowerCase().contains("order by") && !query.contains("order by")) {
            return "Шаг 4: Добавьте ORDER BY для сортировки";
        }
        
        return "Проверьте синтаксис и логику вашего запроса";
    }
    
    private String getLevel2StepHint(Task task, String query) {
        if (!query.contains("join")) {
            return "Шаг 1: Вам нужно объединить данные из нескольких таблиц с помощью JOIN";
        }
        
        if (!query.contains("on")) {
            return "Шаг 2: Укажите условие соединения таблиц с помощью ON";
        }
        
        return "Проверьте правильность соединения таблиц";
    }
    
    private String getLevel3StepHint(Task task, String query) {
        if (!query.contains("group by")) {
            return "Шаг 1: Для агрегации данных используйте GROUP BY";
        }
        
        if (!query.contains("count") && !query.contains("sum") && !query.contains("avg")) {
            return "Шаг 2: Используйте агрегатные функции (COUNT, SUM, AVG)";
        }
        
        return "Проверьте правильность группировки и агрегации";
    }
}
