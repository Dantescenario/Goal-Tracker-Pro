# Goal Tracker Pro - Start Script
$ErrorActionPreference = "SilentlyContinue"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Goal Tracker Pro - Starting..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Kill existing processes
Write-Host "Cleaning up old processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Start dev server
Write-Host "Starting development server..." -ForegroundColor Yellow
Push-Location $PSScriptRoot
Start-Process "npm" -ArgumentList "run dev" -WindowStyle Minimized

# Wait for server
Write-Host "Waiting for server to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

# Open browser
Write-Host "Opening Goal Tracker Pro in your browser..." -ForegroundColor Yellow
Start-Sleep -Seconds 1
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Goal Tracker Pro is running!" -ForegroundColor Green
Write-Host "  http://localhost:3000" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Dev server is running in the background." -ForegroundColor Cyan
Write-Host "Close the dev server window to stop." -ForegroundColor Cyan

Pop-Location
