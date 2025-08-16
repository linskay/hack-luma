# Тестирование AI API endpoints
Write-Host "🧪 Тестирование AI API endpoints..." -ForegroundColor Green

$baseUrl = "http://localhost:8080"

# Тест 1: Проверка здоровья AI агента
Write-Host "`n1️⃣ Тестирую /api/ai/health..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/ai/health" -Method GET
    Write-Host "✅ AI Agent статус: $($response.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ Ошибка при проверке здоровья AI агента: $($_.Exception.Message)" -ForegroundColor Red
}

# Тест 2: Получение случайного совета
Write-Host "`n2️⃣ Тестирую /api/ai/tip..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/ai/tip" -Method GET
    Write-Host "✅ Совет: $($response.tip)" -ForegroundColor Green
} catch {
    Write-Host "❌ Ошибка при получении совета: $($_.Exception.Message)" -ForegroundColor Red
}

# Тест 3: Чат с AI
Write-Host "`n3️⃣ Тестирую /api/ai/chat..." -ForegroundColor Yellow
try {
    $body = @{
        question = "Что такое Java?"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri "$baseUrl/api/ai/chat" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✅ Ответ AI: $($response.response)" -ForegroundColor Green
} catch {
    Write-Host "❌ Ошибка при чате с AI: $($_.Exception.Message)" -ForegroundColor Red
}

# Тест 4: Проверка статуса сервисов
Write-Host "`n4️⃣ Тестирую /api/ai/status..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/ai/status" -Method GET
    Write-Host "✅ Статус сервисов:" -ForegroundColor Green
    foreach ($service in $response.GetEnumerator()) {
        $status = if ($service.Value -eq "available") { "✅" } else { "❌" }
        Write-Host "   $($service.Key): $status $($service.Value)" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Ошибка при проверке статуса сервисов: $($_.Exception.Message)" -ForegroundColor Red
}

# Тест 5: Проверка DJL
Write-Host "`n5️⃣ Тестирую /api/djl/health..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/djl/health" -Method GET
    Write-Host "✅ DJL статус: $($response.success)" -ForegroundColor Green
} catch {
    Write-Host "❌ Ошибка при проверке DJL: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🏁 Тестирование завершено!" -ForegroundColor Green
