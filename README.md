# Hahaton

Коротко: монолитное приложение для хакатона — бекенд на Spring Boot (Java 17) и фронтенд на React (Vite). Сборка фронтенда интегрирована в Maven через `frontend-maven-plugin`.

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

## Запуск (Development, раздельно)
- Бекенд:
  ```bash
  mvn spring-boot:run
  ```
- Фронтенд (в отдельном терминале):
  ```bash
  cd src/main/frontend
  npm run dev
  ```
  Откройте http://localhost:5173 — все запросы на `/api` проксируются на бекенд http://localhost:8080.

## Структура
- `src/main/java` — Spring Boot приложение
- `src/main/resources` — ресурсы бэкенда
- `src/main/frontend` — React (Vite) приложение

## Примечания
- Для роутинга SPA при необходимости добавьте контроллер-фолбэк, чтобы все неизвестные пути возвращали `index.html`.

## О проекте
Это приложение разрабатывается в рамках хакатона.
