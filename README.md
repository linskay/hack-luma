# Hahaton

Коротко: монолитное приложение для хакатона — бекенд на Spring Boot (Java 17) и фронтенд на React (Vite + TypeScript + Tailwind CSS). Сборка фронтенда интегрирована в Maven через `frontend-maven-plugin`.

## Требования
- Java 17 (JDK)
- Maven 3.9+
- Интернет-доступ для загрузки зависимостей

## Запуск (Production, один JAR)
1. Собрать проект (включая фронт):
   ```bash
   mvn -DskipTests clean package
   ```
2. Запустить приложение:
   ```bash
   java -jar target/hahaton-0.0.1-SNAPSHOT.jar
   ```
3. Открыть в браузере: http://localhost:8080

Фронтенд собирается Vite в `src/main/frontend/dist` и автоматически копируется в `classpath:/static`.

## Разработка (отдельный запуск)
- Бекенд:
  ```bash
  mvn spring-boot:run
  ```
- Фронтенд (в отдельном терминале):
  ```bash
  npm --prefix src/main/frontend install    # первая установка
  npm --prefix src/main/frontend run dev    # запуск dev-сервера
  ```
  Откройте http://localhost:5174 (порт может отличаться, смотрите вывод команды).

## Структура
- `src/main/java` — Spring Boot приложение
- `src/main/resources` — ресурсы бэкенда
- `src/main/frontend` — React (Vite) приложение

## Примечания
- Фронтенд использует:
  - TypeScript
  - Tailwind CSS для стилей
  - Vite для сборки

- Для SPA-роутинга может потребоваться настройка контроллера-фоллбэка (все пути → `index.html`).

## О проекте
Это приложение разрабатывается в рамках хакатона.
