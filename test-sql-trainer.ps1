# Тестирование SQL тренажера
Write-Host "🧪 Тестирование SQL тренажера..." -ForegroundColor Green

# Базовый URL
$baseUrl = "http://localhost:8080"

# Функция для тестирования API
function Test-API {
    param(
        [string]$Method,
        [string]$Endpoint,
        [string]$Body = $null
    )
    
    try {
        $headers = @{
            "Content-Type" = "application/json"
        }
        
        if ($Body) {
            $response = Invoke-RestMethod -Uri "$baseUrl$Endpoint" -Method $Method -Headers $headers -Body $Body
        } else {
            $response = Invoke-RestMethod -Uri "$baseUrl$Endpoint" -Method $Method -Headers $headers
        }
        
        Write-Host "✅ $Method $Endpoint - Успешно" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "❌ $Method $Endpoint - Ошибка: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# Тест 1: Получить доступные уровни
Write-Host "`n📊 Тест 1: Получение доступных уровней" -ForegroundColor Yellow
$levels = Test-API -Method "GET" -Endpoint "/api/sql-trainer/levels"
if ($levels) {
    Write-Host "Доступные уровни: $($levels -join ', ')" -ForegroundColor Cyan
}

# Тест 2: Получить задачу уровня 1, задача 1
Write-Host "`n🕵️ Тест 2: Получение задачи" -ForegroundColor Yellow
$task = Test-API -Method "GET" -Endpoint "/api/sql-trainer/task/1/1"
if ($task) {
    Write-Host "Задача: $($task.title)" -ForegroundColor Cyan
    Write-Host "Сложность: $($task.difficulty)" -ForegroundColor Cyan
}

# Тест 3: Получить все задачи уровня 1
Write-Host "`n📚 Тест 3: Получение всех задач уровня 1" -ForegroundColor Yellow
$levelTasks = Test-API -Method "GET" -Endpoint "/api/sql-trainer/level/1"
if ($levelTasks) {
    Write-Host "Количество задач в уровне 1: $($levelTasks.Count)" -ForegroundColor Cyan
}

# Тест 4: Проверить SQL запрос
Write-Host "`n🔍 Тест 4: Проверка SQL запроса" -ForegroundColor Yellow
$testQuery = @{
    query = "SELECT name, last_seen FROM citizens WHERE last_seen >= NOW() - INTERVAL '24 HOUR' ORDER BY last_seen DESC;"
    level = 1
    taskNumber = 1
} | ConvertTo-Json

$result = Test-API -Method "POST" -Endpoint "/api/sql-trainer/check" -Body $testQuery
if ($result) {
    Write-Host "Результат проверки: $($result.isCorrect)" -ForegroundColor Cyan
    Write-Host "Сообщение: $($result.message)" -ForegroundColor Cyan
}

# Тест 5: Получить подсказку
Write-Host "`n💡 Тест 5: Получение подсказки" -ForegroundColor Yellow
$hint = Test-API -Method "GET" -Endpoint "/api/ai-helper/hint/1/1"
if ($hint) {
    Write-Host "Подсказка: $($hint.hint)" -ForegroundColor Cyan
}

# Тест 6: Получить детальную подсказку
Write-Host "`n🔍 Тест 6: Получение детальной подсказки" -ForegroundColor Yellow
$detailedHint = @{
    level = 1
    taskNumber = 1
    userQuery = "SELECT * FROM citizens"
} | ConvertTo-Json

$detailedHintResult = Test-API -Method "POST" -Endpoint "/api/ai-helper/detailed-hint" -Body $detailedHint
if ($detailedHintResult) {
    Write-Host "Детальная подсказка: $($detailedHintResult.hint)" -ForegroundColor Cyan
}

# Тест 7: Прогресс пользователя
Write-Host "`n📈 Тест 7: Прогресс пользователя" -ForegroundColor Yellow
$progress = Test-API -Method "GET" -Endpoint "/api/progress/test-user/overall"
if ($progress) {
    Write-Host "Общий прогресс: $($progress.overallProgress)%" -ForegroundColor Cyan
    Write-Host "Выполнено задач: $($progress.totalCompleted)/$($progress.totalTasks)" -ForegroundColor Cyan
}

# Тест 8: Разблокированные уровни
Write-Host "`n🔓 Тест 8: Разблокированные уровни" -ForegroundColor Yellow
$unlockedLevels = Test-API -Method "GET" -Endpoint "/api/progress/test-user/unlocked-levels"
if ($unlockedLevels) {
    Write-Host "Разблокированные уровни: $($unlockedLevels.unlockedLevels -join ', ')" -ForegroundColor Cyan
}

Write-Host "`n🎉 Тестирование завершено!" -ForegroundColor Green
Write-Host "Для запуска приложения используйте: mvn spring-boot:run" -ForegroundColor Cyan
