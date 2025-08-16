# 🔐 Настройка переменных окружения

## 📁 Файлы конфигурации

### `config.env` - Шаблон конфигурации
Содержит все необходимые переменные с placeholder значениями.

### `config.local` - Локальная конфигурация
Содержит реальные значения для локальной разработки.

## 🚀 Как использовать

### 1. Для локальной разработки
```bash
# Скопируйте config.local в .env (если используете .env файлы)
cp config.local .env

# Или установите переменные окружения в системе
source config.local
```

### 2. Для продакшена
```bash
# Установите переменные окружения в системе
export GEMINI_API_KEY=your_real_api_key
export GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
export GEMINI_MODEL_NAME=gemini-pro
export GEMINI_MAX_TOKENS=1000
export GEMINI_TEMPERATURE=0.7
```

### 3. В Docker
```dockerfile
ENV GEMINI_API_KEY=your_real_api_key
ENV GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

## 🔑 Переменные окружения

| Переменная | Описание | Значение по умолчанию |
|------------|----------|----------------------|
| `GEMINI_API_KEY` | API ключ Google Gemini | `AIzaSyAsQKIhVXR-2fF1EAM4DRDJ4N_6ye8RmQY` |
| `GEMINI_API_URL` | URL API Gemini | `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent` |
| `GEMINI_MODEL_NAME` | Название модели | `gemini-pro` |
| `GEMINI_MAX_TOKENS` | Максимальное количество токенов | `1000` |
| `GEMINI_TEMPERATURE` | Температура генерации | `0.7` |
| `SERVER_PORT` | Порт сервера | `8080` |
| `DB_URL` | URL базы данных | `jdbc:h2:mem:testdb` |
| `LOG_LEVEL` | Уровень логирования | `DEBUG` |

## ⚠️ Безопасность

- **НЕ коммитьте** `config.local` в git
- **НЕ показывайте** API ключи публично
- Используйте `.gitignore` для файлов с секретами
- В продакшене используйте секретные менеджеры

## 🔧 Проверка конфигурации

После установки переменных окружения перезапустите приложение:

```bash
mvn spring-boot:run
```

Приложение автоматически подхватит переменные окружения или использует значения по умолчанию.
