# Интеграция DJL (Deep Java Library) в проект Hahaton

## Что такое DJL?

**Deep Java Library (DJL)** - это открытая высокоуровневая Java-библиотека для глубокого обучения, которая позволяет:

- Загружать предобученные модели нейронных сетей
- Выполнять инференс (предсказания) на изображениях, тексте и других данных
- Обучать собственные модели
- Работать с различными движками: PyTorch, TensorFlow, MXNet, ONNX Runtime

## Возможности интеграции

### 1. Классификация изображений
- Использование предобученных моделей (ResNet50, VGG16, DenseNet)
- Классификация по 1000+ категориям ImageNet
- Поддержка различных форматов изображений

### 2. Обнаружение объектов
- Модели YOLO, SSD, ResNet для детекции
- Обнаружение объектов на изображениях
- Подсчет количества объектов

### 3. Текстовые модели
- BERT, GPT, T5 для генерации и анализа текста
- Перевод текста между языками
- Анализ тональности

## API Endpoints

### DJL Endpoints

```
GET  /api/djl/test          - Тест DJL сервиса
GET  /api/djl/health        - Состояние DJL сервиса
GET  /api/djl/models        - Доступные модели
POST /api/djl/classify      - Классификация изображения
POST /api/djl/detect        - Обнаружение объектов
```

### AI Agent Endpoints

```
GET  /api/ai/capabilities   - Возможности AI агента
GET  /api/ai/status         - Состояние всех AI сервисов
GET  /api/ai/chat           - Чат с локальным AI агентом
GET  /api/ai/tip            - Случайные советы по программированию
```

## Примеры использования

### Классификация изображения

```bash
curl -X POST http://localhost:8080/api/djl/classify \
  -H "Content-Type: application/json" \
  -d '{"imageUrl": "https://example.com/image.jpg"}'
```

### Обнаружение объектов

```bash
curl -X POST http://localhost:8080/api/djl/detect \
  -H "Content-Type: application/json" \
  -d '{"imageUrl": "https://example.com/image.jpg"}'
```

### Проверка состояния

```bash
curl http://localhost:8080/api/djl/health
curl http://localhost:8080/api/ai/status
```

## Конфигурация

### Переменные окружения

```bash
# DJL Configuration
DJL_MODEL_CACHE_DIR=.djl/cache
DJL_MAX_MODELS_IN_MEMORY=5
DJL_USE_GPU=true
DJL_PREFERRED_ENGINE=pytorch
DJL_MODEL_LOAD_TIMEOUT=300
DJL_DEFAULT_BATCH_SIZE=1
```

### application.properties

```properties
# DJL Configuration
djl.model.cache.dir=${DJL_MODEL_CACHE_DIR:.djl/cache}
djl.max.models.in.memory=${DJL_MAX_MODELS_IN_MEMORY:5}
djl.use.gpu=${DJL_USE_GPU:true}
djl.preferred.engine=${DJL_PREFERRED_ENGINE:pytorch}
djl.model.load.timeout=${DJL_MODEL_LOAD_TIMEOUT:300}
djl.default.batch.size=${DJL_DEFAULT_BATCH_SIZE:1}
```

## Зависимости Maven

```xml
<!-- DJL Core -->
<dependency>
    <groupId>ai.djl</groupId>
    <artifactId>api</artifactId>
    <version>0.34.0</version>
</dependency>

<!-- PyTorch Engine -->
<dependency>
    <groupId>ai.djl.pytorch</groupId>
    <artifactId>pytorch-engine</artifactId>
    <version>0.34.0</version>
</dependency>

<!-- ONNX Runtime Engine -->
<dependency>
    <groupId>ai.djl.onnxruntime</groupId>
    <artifactId>onnxruntime-engine</artifactId>
    <version>0.34.0</version>
</dependency>

<!-- Model Zoo -->
<dependency>
    <groupId>ai.djl</groupId>
    <artifactId>model-zoo</artifactId>
    <version>0.34.0</version>
</dependency>
```

## Архитектура

### Сервисы

1. **DJLService** - основной сервис для работы с нейронными сетями
2. **AIAgent** - локальный AI агент с расширенной базой знаний
3. **DJLController** - контроллер для DJL функциональности

### Контроллеры

1. **DJLController** - REST API для DJL функциональности
2. **AIController** - REST API для AI агента

### Конфигурация

1. **DJLConfig** - настройки DJL
2. **SecurityConfig** - настройки безопасности

## Первый запуск

При первом запуске DJL автоматически:

1. Скачает необходимые модели в кэш
2. Инициализирует движки (PyTorch, ONNX Runtime)
3. Проверит доступность GPU/CPU
4. Создаст кэш директорию `.djl/cache`

## Мониторинг

### Логи

```properties
logging.level.com.hahaton.ai.DJLService=DEBUG
logging.level.ai.djl=INFO
```

### Метрики

- Время загрузки моделей
- Время выполнения предсказаний
- Использование памяти
- Доступность устройств

## Troubleshooting

### Проблемы с загрузкой моделей

1. Проверьте интернет соединение
2. Увеличьте `DJL_MODEL_LOAD_TIMEOUT`
3. Проверьте свободное место на диске

### Проблемы с GPU

1. Установите CUDA драйверы
2. Проверьте совместимость версий
3. Установите `DJL_USE_GPU=false` для CPU-only режима

### Проблемы с памятью

1. Уменьшите `DJL_MAX_MODELS_IN_MEMORY`
2. Увеличьте heap size JVM: `-Xmx4g`
3. Используйте более легкие модели

## Дальнейшее развитие

1. **Добавление новых моделей** - поддержка специализированных моделей
2. **Batch processing** - обработка множества изображений
3. **Model fine-tuning** - дообучение моделей на собственных данных
4. **Real-time inference** - потоковая обработка данных
5. **Model serving** - развертывание моделей как отдельного сервиса

## Полезные ссылки

- [DJL Documentation](https://djl.ai/)
- [DJL GitHub](https://github.com/deepjavalibrary/djl)
- [DJL Examples](https://github.com/deepjavalibrary/djl/tree/master/examples)
- [DJL Model Zoo](https://github.com/deepjavalibrary/djl/tree/master/model-zoo)
