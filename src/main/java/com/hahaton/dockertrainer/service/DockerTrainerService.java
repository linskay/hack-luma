package com.hahaton.dockertrainer.service;

import com.hahaton.dockertrainer.model.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

@Service
@Tag(name = "Docker Trainer Service", description = "Сервис для управления Docker тренажером")
public class DockerTrainerService {
    
    private final Map<Integer, List<DockerTask>> tasksByLevel = new HashMap<>();
    private final Map<String, DockerProgress> userProgress = new HashMap<>();
    
    public DockerTrainerService() {
        initializeTasks();
    }
    
    private void initializeTasks() {
        // Уровень 1: Базовые команды
        List<DockerTask> level1Tasks = Arrays.asList(
            DockerTask.builder()
                .id(1L)
                .level(1)
                .title("Загадка исчезающего процесса")
                .story("На сервере пропадают процессы. Вы подозреваете, что их скрывает контейнер-оборотень. Найдите все скрытые контейнеры за последние 24 часа.")
                .description("Какая команда покажет все контейнеры (включая остановленные), созданные за последние сутки?")
                .correctCommand("docker ps -a --filter \"since=$(date -d '24 hours ago' +%Y-%m-%d)\"")
                .hints(new String[]{
                    "Используйте docker ps с флагом -a для показа всех контейнеров",
                    "Фильтр since поможет найти контейнеры по времени создания",
                    "Формат даты: YYYY-MM-DD"
                })
                .alternativeCommands(new String[]{
                    "docker ps -a --filter \"since=2024-01-01\"",
                    "docker ps -a --filter \"since=24h\""
                })
                .category("containers")
                .difficulty(1)
                .tags(new String[]{"docker ps", "filter", "time"})
                .build(),
                
            DockerTask.builder()
                .id(2L)
                .level(1)
                .title("Призрачные логи")
                .story("В логах контейнера web_app видны подозрительные записи. Изучите последние 100 строк логов.")
                .description("Как посмотреть последние 100 строк логов контейнера web_app?")
                .correctCommand("docker logs --tail 100 web_app")
                .hints(new String[]{
                    "Используйте docker logs для просмотра логов",
                    "Флаг --tail ограничивает количество строк",
                    "Укажите имя или ID контейнера"
                })
                .alternativeCommands(new String[]{
                    "docker logs web_app | tail -100",
                    "docker logs -n 100 web_app"
                })
                .category("logs")
                .difficulty(1)
                .tags(new String[]{"docker logs", "tail", "monitoring"})
                .build()
        );
        
        // Уровень 2: Образы и слои
        List<DockerTask> level2Tasks = Arrays.asList(
            DockerTask.builder()
                .id(3L)
                .level(2)
                .title("Взломанный образ")
                .story("В образ nginx:latest кто-то подложил вредоносный файл /usr/bin/backdoor. Проверьте историю сборки.")
                .description("Как узнать, на каком слое добавился файл /usr/bin/backdoor?")
                .correctCommand("docker history nginx:latest")
                .hints(new String[]{
                    "Используйте docker history для просмотра слоев образа",
                    "Ищите слой с размером, не соответствующим стандартному nginx",
                    "Каждый слой показывает команду и размер"
                })
                .alternativeCommands(new String[]{
                    "docker image history nginx:latest",
                    "docker inspect nginx:latest"
                })
                .category("images")
                .difficulty(2)
                .tags(new String[]{"docker history", "layers", "security"})
                .build(),
                
            DockerTask.builder()
                .id(4L)
                .level(2)
                .title("Секретный файл")
                .story("В контейнере обнаружен подозрительный файл. Сравните файловую систему с оригинальным образом.")
                .description("Как сравнить файловую систему контейнера с образом?")
                .correctCommand("docker diff container_id")
                .hints(new String[]{
                    "Используйте docker diff для сравнения файлов",
                    "Команда покажет измененные, добавленные и удаленные файлы",
                    "A - добавленный, D - удаленный, C - измененный"
                })
                .alternativeCommands(new String[]{
                    "docker container diff container_id",
                    "docker exec container_id ls -la /"
                })
                .category("filesystem")
                .difficulty(2)
                .tags(new String[]{"docker diff", "filesystem", "comparison"})
                .build()
        );
        
        // Уровень 3: Управление ресурсами
        List<DockerTask> level3Tasks = Arrays.asList(
            DockerTask.builder()
                .id(5L)
                .level(3)
                .title("Тайна утечки памяти")
                .story("Контейнер с приложением жрет память. Найдите процесс-вор в его файловой системе.")
                .description("Как войти в работающий контейнер и проверить потребление памяти?")
                .correctCommand("docker exec -it suspicious_container top")
                .hints(new String[]{
                    "Используйте docker exec для выполнения команд в контейнере",
                    "Флаг -it обеспечивает интерактивный режим",
                    "top покажет процессы и использование ресурсов"
                })
                .alternativeCommands(new String[]{
                    "docker exec suspicious_container ps aux",
                    "docker exec suspicious_container free -h"
                })
                .category("execution")
                .difficulty(3)
                .tags(new String[]{"docker exec", "monitoring", "resources"})
                .build(),
                
            DockerTask.builder()
                .id(6L)
                .level(3)
                .title("Ограничение ресурсов")
                .story("Контейнер потребляет слишком много ресурсов. Ограничьте его память и CPU.")
                .description("Как ограничить память контейнера 512 МБ и CPU 50%?")
                .correctCommand("docker run -d --memory=\"512m\" --cpus=\"0.5\" suspicious_image")
                .hints(new String[]{
                    "Используйте --memory для ограничения памяти",
                    "Используйте --cpus для ограничения CPU",
                    "Формат памяти: 512m, 1g"
                })
                .alternativeCommands(new String[]{
                    "docker run -d -m 512m --cpus=0.5 suspicious_image",
                    "docker run -d --memory=512m --cpu-quota=50000 suspicious_image"
                })
                .category("resources")
                .difficulty(3)
                .tags(new String[]{"docker run", "memory", "cpu", "limits"})
                .build()
        );
        
        // Уровень 4: Сети
        List<DockerTask> level4Tasks = Arrays.asList(
            DockerTask.builder()
                .id(7L)
                .level(4)
                .title("Сеть теней")
                .story("Контейнеры общаются через тайную сеть. Найдите все неиспользуемые сети.")
                .description("Как найти все неиспользуемые Docker сети?")
                .correctCommand("docker network prune --dry-run")
                .hints(new String[]{
                    "Используйте docker network prune для очистки сетей",
                    "Флаг --dry-run покажет что будет удалено без выполнения",
                    "Команда покажет неиспользуемые сети"
                })
                .alternativeCommands(new String[]{
                    "docker network ls --filter \"type=custom\"",
                    "docker network ls | grep -v bridge"
                })
                .category("networks")
                .difficulty(4)
                .tags(new String[]{"docker network", "prune", "cleanup"})
                .build()
        );
        
        // Уровень 5: Volumes и данные
        List<DockerTask> level5Tasks = Arrays.asList(
            DockerTask.builder()
                .id(8L)
                .level(5)
                .title("Шифрованный Volume")
                .story("В контейнере обнаружен зашифрованный volume. Найдите все подключенные volumes.")
                .description("Как посмотреть все volumes, подключенные к контейнеру?")
                .correctCommand("docker inspect -f '{{ .Mounts }}' container_id")
                .hints(new String[]{
                    "Используйте docker inspect для детальной информации",
                    "Флаг -f позволяет использовать Go template",
                    "{{ .Mounts }} покажет все подключения"
                })
                .alternativeCommands(new String[]{
                    "docker volume ls",
                    "docker inspect container_id | grep -A 10 Mounts"
                })
                .category("volumes")
                .difficulty(5)
                .tags(new String[]{"docker inspect", "volumes", "mounts"})
                .build()
        );
        
        // Уровень 6: Docker Swarm
        List<DockerTask> level6Tasks = Arrays.asList(
            DockerTask.builder()
                .id(9L)
                .level(6)
                .title("Кластер под атакой")
                .story("Ноды Docker Swarm падают из-за подозрительных задач. Найдите службу-диверсанта.")
                .description("Как найти все службы в Docker Swarm с подозрительными именами?")
                .correctCommand("docker service ls --filter \"name=suspicious_*\"")
                .hints(new String[]{
                    "Используйте docker service ls для списка служб",
                    "Фильтр name позволяет искать по шаблону",
                    "Подозрительные службы часто имеют специфические имена"
                })
                .alternativeCommands(new String[]{
                    "docker stack ls",
                    "docker node ls"
                })
                .category("swarm")
                .difficulty(6)
                .tags(new String[]{"docker service", "swarm", "filtering"})
                .build()
        );
        
        tasksByLevel.put(1, level1Tasks);
        tasksByLevel.put(2, level2Tasks);
        tasksByLevel.put(3, level3Tasks);
        tasksByLevel.put(4, level4Tasks);
        tasksByLevel.put(5, level5Tasks);
        tasksByLevel.put(6, level6Tasks);
    }
    
    public DockerTask getRandomTask(int level) {
        List<DockerTask> tasks = tasksByLevel.get(level);
        if (tasks == null || tasks.isEmpty()) {
            return null;
        }
        return tasks.get(new Random().nextInt(tasks.size()));
    }
    
    public CommandResult checkCommand(CommandSubmission submission) {
        DockerTask task = findTaskByLevel(submission.getLevel());
        if (task == null) {
            return CommandResult.builder()
                .isCorrect(false)
                .hint("Уровень не найден")
                .feedback("Попробуйте другой уровень")
                .build();
        }
        
        String userCommand = submission.getCommand().trim().toLowerCase();
        String correctCommand = task.getCorrectCommand().toLowerCase();
        
        // Проверяем точное совпадение
        if (userCommand.equals(correctCommand)) {
            updateProgress(submission.getUserId(), submission.getLevel());
            return CommandResult.builder()
                .isCorrect(true)
                .hint("Отлично! Команда выполнена правильно")
                .feedback("Вы успешно решили задачу!")
                .score(100)
                .levelCompleted(true)
                .build();
        }
        
        // Проверяем альтернативные команды
        for (String altCommand : task.getAlternativeCommands()) {
            if (userCommand.equals(altCommand.toLowerCase())) {
                updateProgress(submission.getUserId(), submission.getLevel());
                return CommandResult.builder()
                    .isCorrect(true)
                    .hint("Хорошо! Альтернативная команда тоже подходит")
                    .feedback("Задача решена альтернативным способом")
                    .score(90)
                    .levelCompleted(true)
                    .build();
            }
        }
        
        // Проверяем частичное совпадение
        if (isPartiallyCorrect(userCommand, correctCommand)) {
            return CommandResult.builder()
                .isCorrect(false)
                .hint("Близко! Проверьте параметры команды")
                .feedback("Команда правильная, но параметры неверные")
                .score(50)
                .levelCompleted(false)
                .build();
        }
        
        // Даем подсказку
        String hint = getHint(userCommand, task);
        return CommandResult.builder()
            .isCorrect(false)
            .hint(hint)
            .feedback("Попробуйте еще раз")
            .score(0)
            .levelCompleted(false)
            .build();
    }
    
    private boolean isPartiallyCorrect(String userCommand, String correctCommand) {
        // Убираем параметры и сравниваем основную команду
        String userMain = userCommand.split(" ")[0];
        String correctMain = correctCommand.split(" ")[0];
        return userMain.equals(correctMain);
    }
    
    private String getHint(String userCommand, DockerTask task) {
        // Анализируем команду и даем соответствующую подсказку
        if (userCommand.contains("docker ps")) {
            return "Правильно! Теперь добавьте фильтр по времени";
        } else if (userCommand.contains("docker logs")) {
            return "Хорошо! Добавьте ограничение на количество строк";
        } else if (userCommand.contains("docker exec")) {
            return "Команда правильная! Проверьте флаги и имя контейнера";
        } else if (userCommand.contains("docker history")) {
            return "Используйте docker history для просмотра слоев образа";
        } else if (userCommand.contains("docker network")) {
            return "Попробуйте docker network prune для очистки";
        } else if (userCommand.contains("docker service")) {
            return "Используйте docker service ls для списка служб";
        }
        
        // Возвращаем случайную подсказку из задачи
        String[] hints = task.getHints();
        return hints[new Random().nextInt(hints.length)];
    }
    
    private DockerTask findTaskByLevel(int level) {
        List<DockerTask> tasks = tasksByLevel.get(level);
        if (tasks == null || tasks.isEmpty()) {
            return null;
        }
        return tasks.get(new Random().nextInt(tasks.size()));
    }
    
    private void updateProgress(String userId, int level) {
        DockerProgress progress = userProgress.getOrDefault(userId, 
            DockerProgress.builder()
                .userId(userId)
                .currentLevel(1)
                .completedLevels(new HashSet<>())
                .levelScores(new HashMap<>())
                .totalScore(0)
                .build()
        );
        
        progress.getCompletedLevels().add(level);
        progress.setCurrentLevel(Math.max(progress.getCurrentLevel(), level + 1));
        progress.getLevelScores().put(level, 100);
        progress.setTotalScore(progress.getTotalScore() + 100);
        progress.setLastCompletedTask("Уровень " + level);
        progress.setLastActivityTime(System.currentTimeMillis());
        
        userProgress.put(userId, progress);
    }
    
    public DockerProgress getUserProgress(String userId) {
        return userProgress.getOrDefault(userId, 
            DockerProgress.builder()
                .userId(userId)
                .currentLevel(1)
                .completedLevels(new HashSet<>())
                .levelScores(new HashMap<>())
                .totalScore(0)
                .build()
        );
    }
    
    public List<DockerTask> getTasksForLevel(int level) {
        return tasksByLevel.getOrDefault(level, new ArrayList<>());
    }
    
    public int getTotalLevels() {
        return tasksByLevel.size();
    }
}
