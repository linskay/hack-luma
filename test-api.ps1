Write-Host "Testing AI API..." -ForegroundColor Green

$baseUrl = "http://localhost:8080"

# Test health endpoint
Write-Host "1. Testing health endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/ai/health" -Method GET
    Write-Host "Health check: $($response.StatusCode)" -ForegroundColor Green
    $content = $response.Content | ConvertFrom-Json
    Write-Host "Response: $($content.status)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test tip endpoint
Write-Host "2. Testing tip endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/ai/tip" -Method GET
    Write-Host "Tip endpoint: $($response.StatusCode)" -ForegroundColor Green
    $content = $response.Content | ConvertFrom-Json
    Write-Host "Tip: $($content.tip)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test chat endpoint
Write-Host "3. Testing chat endpoint..." -ForegroundColor Yellow
try {
    $body = @{question = "What is Java?"} | ConvertTo-Json
    $response = Invoke-WebRequest -Uri "$baseUrl/api/ai/chat" -Method POST -ContentType "application/json" -Body $body
    Write-Host "Chat endpoint: $($response.StatusCode)" -ForegroundColor Green
    $content = $response.Content | ConvertFrom-Json
    Write-Host "AI Response: $($content.response)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Testing completed! Open http://localhost:8080 in browser" -ForegroundColor Cyan
