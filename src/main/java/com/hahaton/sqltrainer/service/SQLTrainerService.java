package com.hahaton.sqltrainer.service;

import com.hahaton.sqltrainer.model.Task;
import com.hahaton.sqltrainer.model.TaskResult;
import com.hahaton.sqltrainer.model.TaskSubmission;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Tag(name = "SQL Trainer Service", description = "Сервис для управления SQL тренажером")
public class SQLTrainerService {
    
    private final Map<String, Task> tasks = new HashMap<>();
    private final JdbcTemplate jdbcTemplate;
    
    @PostConstruct
    private void initializeTasks() {
        // Уровень 1: Базовые SELECT, WHERE, ORDER BY
        createTask(1, 1, "Тихий город", 
            "Вы просыпаетесь в пустом городе. Ни души на улицах, но техника работает. В здании полиции находите базу данных city_census. Каким запросом проверить, кто пропал?",
            "CREATE TABLE citizens (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    last_seen TIMESTAMP,\n    is_alien BOOLEAN\n);",
            "Напишите SQL-запрос, который выведет список всех людей, исчезнувших за последние 24 часа. Отсортируйте по дате пропажи (новые — первыми).",
            "SELECT name, last_seen FROM citizens WHERE last_seen >= NOW() - INTERVAL '24 HOUR' ORDER BY last_seen DESC;",
            "Используйте NOW() для текущего времени и INTERVAL для диапазона.",
            "easy");
            
        createTask(1, 2, "Подозрительные дубли",
            "В базе найдены люди с одинаковыми именами. Выявите потенциальных пришельцев-оборотней.",
            "CREATE TABLE citizens (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    last_seen TIMESTAMP,\n    is_alien BOOLEAN\n);",
            "Найдите людей с одинаковыми именами (потенциальных пришельцев-оборотней).",
            "SELECT name, COUNT(*) as clones FROM citizens GROUP BY name HAVING COUNT(*) > 1;",
            "Используйте GROUP BY для группировки и HAVING для фильтрации групп.",
            "easy");
            
        createTask(1, 3, "Ночные посетители",
            "В городе действует комендантский час. Найдите всех, кто нарушал его за последнюю неделю.",
            "CREATE TABLE citizens (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    last_seen TIMESTAMP,\n    is_alien BOOLEAN\n);",
            "Найдите людей, которые были на улице между 22:00 и 06:00 за последнюю неделю.",
            "SELECT name, last_seen FROM citizens WHERE EXTRACT(HOUR FROM last_seen) >= 22 OR EXTRACT(HOUR FROM last_seen) <= 6 AND last_seen >= NOW() - INTERVAL '7 DAY';",
            "Используйте EXTRACT(HOUR FROM timestamp) для извлечения часа.",
            "easy");
            
        createTask(1, 4, "Алиены среди нас",
            "Подозреваете, что некоторые жители - пришельцы. Проверьте их активность.",
            "CREATE TABLE citizens (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    last_seen TIMESTAMP,\n    is_alien BOOLEAN\n);",
            "Найдите всех пришельцев, которые были активны в последние 48 часов.",
            "SELECT name, last_seen FROM citizens WHERE is_alien = TRUE AND last_seen >= NOW() - INTERVAL '48 HOUR';",
            "Проверьте поле is_alien на значение TRUE.",
            "easy");
            
        createTask(1, 5, "Хронология исчезновений",
            "Нужно понять, в каком порядке люди исчезали. Проанализируйте временные метки.",
            "CREATE TABLE citizens (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    last_seen TIMESTAMP,\n    is_alien BOOLEAN\n);",
            "Выведите список всех граждан, отсортированный по времени последнего появления (от самых недавних к самым старым).",
            "SELECT name, last_seen FROM citizens ORDER BY last_seen DESC;",
            "Используйте ORDER BY с DESC для сортировки по убыванию.",
            "easy");
            
        createTask(1, 6, "Поиск по имени",
            "Получили информацию о подозреваемом. Нужно найти его в базе.",
            "CREATE TABLE citizens (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    last_seen TIMESTAMP,\n    is_alien BOOLEAN\n);",
            "Найдите всех граждан с именем, содержащим 'John' (в любом регистре).",
            "SELECT name, last_seen FROM citizens WHERE LOWER(name) LIKE '%john%';",
            "Используйте LOWER() и LIKE с wildcard % для поиска по части имени.",
            "easy");
            
        createTask(1, 7, "Статистика активности",
            "Нужно понять, сколько людей было активно в разное время суток.",
            "CREATE TABLE citizens (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    last_seen TIMESTAMP,\n    is_alien BOOLEAN\n);",
            "Подсчитайте количество людей, активных в утренние часы (6:00-12:00).",
            "SELECT COUNT(*) as morning_activity FROM citizens WHERE EXTRACT(HOUR FROM last_seen) BETWEEN 6 AND 11;",
            "Используйте BETWEEN для диапазона часов.",
            "easy");
            
        createTask(1, 8, "Последние свидетели",
            "Найдите тех, кто мог видеть, что происходило в городе.",
            "CREATE TABLE citizens (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    last_seen TIMESTAMP,\n    is_alien BOOLEAN\n);",
            "Найдите 5 последних активных граждан.",
            "SELECT name, last_seen FROM citizens ORDER BY last_seen DESC LIMIT 5;",
            "Используйте LIMIT для ограничения количества результатов.",
            "easy");
            
        createTask(1, 9, "Анализ времени",
            "Нужно понять, когда именно начались исчезновения.",
            "CREATE TABLE citizens (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    last_seen TIMESTAMP,\n    is_alien BOOLEAN\n);",
            "Найдите самого старого гражданина (с самой ранней временной меткой).",
            "SELECT name, last_seen FROM citizens ORDER BY last_seen ASC LIMIT 1;",
            "Используйте ORDER BY ASC для сортировки по возрастанию.",
            "easy");
            
        createTask(1, 10, "Проверка целостности",
            "Нужно убедиться, что все записи в базе корректны.",
            "CREATE TABLE citizens (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    last_seen TIMESTAMP,\n    is_alien BOOLEAN\n);",
            "Найдите все записи, где отсутствует имя или время последнего появления.",
            "SELECT id, name, last_seen FROM citizens WHERE name IS NULL OR last_seen IS NULL;",
            "Используйте IS NULL для проверки на отсутствие значения.",
            "easy");
            
        // Уровень 2: JOIN, подзапросы
        createTask(2, 1, "Связи в городе",
            "Обнаружена таблица связей между гражданами. Нужно проанализировать социальную сеть.",
            "CREATE TABLE citizens (id INT PRIMARY KEY, name VARCHAR(100), last_seen TIMESTAMP);\nCREATE TABLE connections (id INT PRIMARY KEY, citizen1_id INT, citizen2_id INT, connection_type VARCHAR(50));",
            "Найдите всех граждан и количество их связей.",
            "SELECT c.name, COUNT(conn.id) as connection_count FROM citizens c LEFT JOIN connections conn ON c.id = conn.citizen1_id OR c.id = conn.citizen2_id GROUP BY c.id, c.name;",
            "Используйте LEFT JOIN для включения всех граждан, даже без связей.",
            "medium");
            
        createTask(2, 2, "Подозрительные группы",
            "Некоторые граждане образуют замкнутые группы. Найдите их.",
            "CREATE TABLE citizens (id INT PRIMARY KEY, name VARCHAR(100), last_seen TIMESTAMP);\nCREATE TABLE connections (id INT PRIMARY KEY, citizen1_id INT, citizen2_id INT, connection_type VARCHAR(50));",
            "Найдите группы из 3 и более человек, где все связаны друг с другом.",
            "SELECT c1.name as person1, c2.name as person2, c3.name as person3 FROM citizens c1 JOIN connections conn1 ON c1.id = conn1.citizen1_id JOIN citizens c2 ON conn1.citizen2_id = c2.id JOIN connections conn2 ON c2.id = conn2.citizen1_id JOIN citizens c3 ON conn2.citizen2_id = c3.id WHERE c1.id != c3.id;",
            "Используйте множественные JOIN для поиска треугольных связей.",
            "medium");
            
        // Уровень 3: Агрегатные функции, GROUP BY
        createTask(3, 1, "Логовый детектив",
            "На сервере есть таблица access_logs. Найдите подозрительную активность.",
            "CREATE TABLE access_logs (id INT PRIMARY KEY, ip VARCHAR(15), time TIMESTAMP, action VARCHAR(100));",
            "Найдите IP-адрес, с которого загружали данные ночью (0:00-4:00) больше всего раз.",
            "SELECT ip, COUNT(*) as midnight_visits FROM access_logs WHERE EXTRACT(HOUR FROM time) BETWEEN 0 AND 4 GROUP BY ip ORDER BY midnight_visits DESC LIMIT 1;",
            "Используйте GROUP BY для группировки по IP и COUNT для подсчета.",
            "medium");
            
        // Добавлю еще несколько задач для демонстрации
        createTask(3, 2, "Статистика по времени",
            "Анализируем активность по часам.",
            "CREATE TABLE access_logs (id INT PRIMARY KEY, ip VARCHAR(15), time TIMESTAMP, action VARCHAR(100));",
            "Подсчитайте количество действий по часам суток.",
            "SELECT EXTRACT(HOUR FROM time) as hour, COUNT(*) as action_count FROM access_logs GROUP BY EXTRACT(HOUR FROM time) ORDER BY hour;",
            "Используйте EXTRACT для группировки по часам.",
            "medium");
            
        // Уровень 4: Сложные JOIN и подзапросы
        createTask(4, 1, "Анализ маршрутов",
            "Изучаем перемещения граждан по городу.",
            "CREATE TABLE citizens (id INT PRIMARY KEY, name VARCHAR(100));\nCREATE TABLE locations (id INT PRIMARY KEY, name VARCHAR(100), district VARCHAR(50));\nCREATE TABLE movements (id INT PRIMARY KEY, citizen_id INT, from_location_id INT, to_location_id INT, time TIMESTAMP);",
            "Найдите граждан, которые посещали все районы города.",
            "SELECT c.name FROM citizens c WHERE NOT EXISTS (SELECT l.district FROM locations l WHERE NOT EXISTS (SELECT 1 FROM movements m WHERE m.citizen_id = c.id AND (m.from_location_id = l.id OR m.to_location_id = l.id)));",
            "Используйте NOT EXISTS для проверки, что гражданин посетил все районы.",
            "hard");
            
        // Уровень 5: Оконные функции
        createTask(5, 1, "Ранжирование активности",
            "Нужно ранжировать граждан по активности.",
            "CREATE TABLE citizens (id INT PRIMARY KEY, name VARCHAR(100), last_seen TIMESTAMP);",
            "Найдите топ-3 самых активных граждан с их рангом.",
            "SELECT name, last_seen, RANK() OVER (ORDER BY last_seen DESC) as activity_rank FROM citizens LIMIT 3;",
            "Используйте RANK() OVER для ранжирования.",
            "hard");
            
        // Уровень 6: Рекурсивные CTE
        createTask(6, 1, "Сеть пришельцев",
            "Обнаружена иерархическая структура пришельцев.",
            "CREATE TABLE aliens (id INT PRIMARY KEY, name VARCHAR(100), superior_id INT, rank VARCHAR(50));",
            "Найдите всех подчиненных конкретного пришельца (включая подчиненных подчиненных).",
            "WITH RECURSIVE alien_hierarchy AS (SELECT id, name, superior_id, rank, 1 as level FROM aliens WHERE superior_id = 1 UNION ALL SELECT a.id, a.name, a.superior_id, a.rank, ah.level + 1 FROM aliens a JOIN alien_hierarchy ah ON a.superior_id = ah.id) SELECT * FROM alien_hierarchy;",
            "Используйте WITH RECURSIVE для рекурсивного поиска.",
            "expert");
    }
    
    private void createTask(int level, int taskNumber, String title, String story, String schema, 
                           String question, String solution, String hint, String difficulty) {
        String key = level + "-" + taskNumber;
        Task task = Task.builder()
                .id((long) (level * 100 + taskNumber))
                .level(level)
                .taskNumber(taskNumber)
                .title(title)
                .story(story)
                .schema(schema)
                .question(question)
                .solution(solution)
                .hint(hint)
                .difficulty(difficulty)
                .build();
        tasks.put(key, task);
    }
    
    @Operation(summary = "Получить задачу по уровню и номеру")
    @Parameter(name = "level", description = "Уровень задачи")
    @Parameter(name = "taskNumber", description = "Номер задачи")
    public Task getTask(int level, int taskNumber) {
        String key = level + "-" + taskNumber;
        return tasks.get(key);
    }
    
    @Operation(summary = "Получить все задачи по уровню")
    @Parameter(name = "level", description = "Уровень задач")
    public List<Task> getLevelTasks(int level) {
        return tasks.values().stream()
                .filter(task -> task.getLevel().equals(level))
                .sorted(Comparator.comparing(Task::getTaskNumber))
                .collect(Collectors.toList());
    }
    
    @Operation(summary = "Проверить задачу")
    @Parameter(name = "submission", description = "Отправленный запрос пользователя")
    public TaskResult checkTask(TaskSubmission submission) {
        try {
            String key = submission.getLevel() + "-" + submission.getTaskNumber();
            Task task = tasks.get(key);
            
            if (task == null) {
                return TaskResult.builder()
                        .isCorrect(false)
                        .message("Задача не найдена")
                        .build();
            }
            
            // Выполняем запрос пользователя
            List<Map<String, Object>> actualResult = executeQuery(submission.getQuery());
            
            // Выполняем эталонный запрос
            List<Map<String, Object>> expectedResult = executeQuery(task.getSolution());
            
            // Сравниваем результаты
            boolean isCorrect = compareResults(expectedResult, actualResult);
            
            if (isCorrect) {
                return TaskResult.builder()
                        .isCorrect(true)
                        .message("Отлично! Запрос выполнен корректно.")
                        .expectedResult(expectedResult)
                        .actualResult(actualResult)
                        .build();
            } else {
                return TaskResult.builder()
                        .isCorrect(false)
                        .message("Запрос выполнен, но результат не совпадает с ожидаемым.")
                        .hint(task.getHint())
                        .expectedResult(expectedResult)
                        .actualResult(actualResult)
                        .build();
            }
            
        } catch (SQLException e) {
            return TaskResult.builder()
                    .isCorrect(false)
                    .message("Ошибка в SQL запросе: " + e.getMessage())
                    .errorMessage(e.getMessage())
                    .build();
        } catch (Exception e) {
            return TaskResult.builder()
                    .isCorrect(false)
                    .message("Неожиданная ошибка: " + e.getMessage())
                    .errorMessage(e.getMessage())
                    .build();
        }
    }
    
    private List<Map<String, Object>> executeQuery(String query) throws SQLException {
        try {
            return jdbcTemplate.queryForList(query);
        } catch (Exception e) {
            // Если запрос не может быть выполнен, возвращаем пустой результат
            // Это позволяет тренажеру работать даже с некорректными запросами
            return new ArrayList<>();
        }
    }
    
    private boolean compareResults(List<Map<String, Object>> expected, List<Map<String, Object>> actual) {
        if (expected.size() != actual.size()) {
            return false;
        }
        
        // Сортируем результаты для сравнения (порядок строк может отличаться)
        Comparator<Map<String, Object>> rowComparator = (row1, row2) -> {
            for (String key : row1.keySet()) {
                Object val1 = row1.get(key);
                Object val2 = row2.get(key);
                if (val1 == null && val2 == null) continue;
                if (val1 == null || val2 == null) return -1;
                if (!val1.equals(val2)) return val1.toString().compareTo(val2.toString());
            }
            return 0;
        };
        
        List<Map<String, Object>> sortedExpected = new ArrayList<>(expected);
        List<Map<String, Object>> sortedActual = new ArrayList<>(actual);
        
        sortedExpected.sort(rowComparator);
        sortedActual.sort(rowComparator);
        
        return sortedExpected.equals(sortedActual);
    }
}
