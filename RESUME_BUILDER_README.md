# Конструктор резюме с ИИ

## Описание

Функциональность для автоматического составления профессиональных резюме с использованием искусственного интеллекта. Пользователи могут выбрать навыки из предустановленного списка с помощью drag-and-drop интерфейса, заполнить личную информацию, и ИИ сгенерирует структурированное резюме в формате PDF.

## Возможности

### 🎯 Основные функции
- **Drag-and-Drop выбор навыков** - интуитивный интерфейс для выбора технических навыков
- **ИИ генерация резюме** - автоматическое создание профессионального резюме на основе введенных данных
- **Экспорт в PDF** - скачивание готового резюме в формате PDF
- **Категоризация навыков** - навыки разделены по категориям (Frontend, Backend, Database, DevOps, Mobile, AI/ML, Tools, Other)

### 🛠 Технические навыки
Система включает более 50 предустановленных навыков:

**Frontend:**
- HTML, CSS, JavaScript, TypeScript
- React, Vue.js, Angular, Svelte

**Backend:**
- Java, Spring Boot, Python, Django, Flask
- Node.js, Express.js, C#, .NET, Go, Rust

**Database:**
- SQL, PostgreSQL, MySQL, MongoDB, Redis, Oracle

**DevOps:**
- Docker, Kubernetes, Jenkins, GitLab CI, GitHub Actions
- Terraform, Ansible, AWS, Azure, Google Cloud

**Mobile:**
- React Native, Flutter, Swift, Kotlin, Xamarin

**AI/ML:**
- TensorFlow, PyTorch, Scikit-learn, OpenCV, NLTK

**Tools:**
- Git, VS Code, IntelliJ IDEA, PyCharm, WebStorm
- Postman, Jira, Confluence

**Other:**
- REST API, GraphQL, Microservices, Agile, Scrum, Kanban, TDD, BDD

## Архитектура

### Backend (Java/Spring Boot)

#### Модели данных
- `ResumeRequest` - запрос на генерацию резюме
- `ResumeResponse` - ответ с PDF в base64 формате
- `PersonalInfo` - личная информация пользователя
- `Skill` - навык с уровнем владения

#### Сервисы
- `ResumeService` - основной сервис для генерации резюме
- `GeminiService` - интеграция с Google Gemini AI для генерации текста

#### Контроллеры
- `ResumeController` - REST API для обработки запросов

### Frontend (React/TypeScript)

#### Компоненты
- `ResumeBuilder` - основной компонент конструктора резюме
- `CareerPage` - страница карьеры с интеграцией конструктора

#### Типы данных
- `ResumeRequest`, `ResumeResponse`, `Skill`, `PersonalInfo`
- `AvailableSkill` - предустановленные навыки

## API Endpoints

### POST /api/resume/generate
Генерирует резюме на основе предоставленных данных.

**Request Body:**
```json
{
  "personalInfo": {
    "name": "Иван Иванов",
    "email": "ivan@example.com",
    "phone": "+7 (999) 123-45-67",
    "location": "Москва"
  },
  "skills": [
    {
      "name": "Java",
      "level": 85,
      "category": "Backend"
    }
  ],
  "jobTitle": "Java Developer",
  "experience": "3 года разработки на Java",
  "education": "Высшее техническое образование",
  "additionalInfo": "Активный участник open source проектов"
}
```

**Response:**
```json
{
  "pdfBase64": "JVBERi0xLjQKJcOkw7zDtsO...",
  "message": "Резюме успешно сгенерировано",
  "success": true
}
```

### GET /api/resume/health
Проверка состояния сервиса.

## Использование

### 1. Открытие конструктора
- Перейдите на страницу "Карьера" в приложении
- Нажмите кнопку "Начать автогенерацию резюме"

### 2. Заполнение информации
- **Личная информация**: имя, email, телефон, местоположение
- **Желаемая должность**: укажите позицию, на которую претендуете
- **Навыки**: выберите навыки из списка, установите уровень владения (1-100%)
- **Опыт работы**: опишите ваш профессиональный опыт
- **Образование**: укажите образование и квалификацию
- **Дополнительная информация**: достижения, сертификаты, проекты

### 3. Генерация резюме
- Нажмите "Сгенерировать резюме с ИИ"
- Дождитесь обработки (ИИ создаст структурированное резюме)
- Скачайте готовый PDF файл

## Технологии

### Backend
- **Spring Boot 3.5.4** - основной фреймворк
- **iText PDF 5.5.13.3** - генерация PDF документов
- **Google Gemini AI** - генерация текста резюме
- **Spring Security** - безопасность API

### Frontend
- **React 18** - пользовательский интерфейс
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **Framer Motion** - анимации
- **Lucide React** - иконки

### Тестирование
- **JUnit 5** - unit тесты
- **Mockito** - мокирование
- **Spring Boot Test** - интеграционные тесты

## Установка и запуск

### Предварительные требования
- Java 17+
- Node.js 20+
- Maven 3.6+

### Запуск
1. Клонируйте репозиторий
2. Установите переменные окружения:
   ```bash
   export GEMINI_API_KEY="your-gemini-api-key"
   ```
3. Запустите приложение:
   ```bash
   mvn spring-boot:run
   ```
4. Откройте http://localhost:8080

## Тестирование

### Запуск всех тестов
```bash
mvn test
```

### Запуск тестов резюме
```bash
mvn test -Dtest=ResumeControllerTest
mvn test -Dtest=ResumeServiceTest
```

## Безопасность

- API защищен Spring Security
- Валидация входных данных
- Обработка ошибок и исключений
- Fallback механизм при недоступности ИИ

## Производительность

- Асинхронная генерация PDF
- Кэширование предустановленных навыков
- Оптимизированные запросы к ИИ API
- Сжатие PDF для быстрой загрузки

## Будущие улучшения

- [ ] Шаблоны резюме (разные стили оформления)
- [ ] Анализ вакансий и адаптация резюме
- [ ] Сохранение черновиков резюме
- [ ] Экспорт в другие форматы (DOCX, HTML)
- [ ] Интеграция с LinkedIn и другими платформами
- [ ] Многоязычная поддержка
- [ ] Рекомендации по улучшению резюме

## Поддержка

При возникновении проблем:
1. Проверьте логи приложения
2. Убедитесь в корректности API ключа Gemini
3. Проверьте доступность интернет-соединения
4. Обратитесь к документации API

## Лицензия

Проект распространяется под лицензией MIT.
