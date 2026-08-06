# Configure EmailJS pour Vite (écrit .env à la racine du projet)
# Usage (depuis ir-bendelo) :
#   powershell -ExecutionPolicy Bypass -File .\scripts\setup-emailjs.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host ""
Write-Host "=== Configuration EmailJS (Vite) ===" -ForegroundColor Cyan
Write-Host "Ouvrez le dashboard : https://dashboard.emailjs.com/admin" -ForegroundColor DarkGray
Write-Host "  - Service ID  : Email Services"
Write-Host "  - Template ID : Email Templates"
Write-Host "  - Public Key  : Account > API keys (PAS le User ID user_...)"
Write-Host ""

$serviceId  = Read-Host "VITE_EMAILJS_SERVICE_ID  (ex: service_xxxxxxx)"
$templateId = Read-Host "VITE_EMAILJS_TEMPLATE_ID (ex: template_xxxxxx)"
$publicKey  = Read-Host "VITE_EMAILJS_PUBLIC_KEY  (ex: AbCdEfGhIjKlMnOp)"

function Fail([string]$msg) {
  Write-Host "ERREUR: $msg" -ForegroundColor Red
  exit 1
}

if ([string]::IsNullOrWhiteSpace($serviceId))  { Fail "Service ID vide" }
if ([string]::IsNullOrWhiteSpace($templateId)) { Fail "Template ID vide" }
if ([string]::IsNullOrWhiteSpace($publicKey))  { Fail "Public Key vide" }
if ($publicKey.Trim().StartsWith("user_")) {
  Fail "Public Key invalide: ne pas utiliser l'ancien User ID (user_...). Prenez Account > API keys."
}
if (-not $serviceId.Trim().StartsWith("service_")) {
  Write-Host "Attention: un Service ID commence souvent par 'service_'" -ForegroundColor Yellow
}
if (-not $templateId.Trim().StartsWith("template_")) {
  Write-Host "Attention: un Template ID commence souvent par 'template_'" -ForegroundColor Yellow
}

$content = @"
# Generé par scripts/setup-emailjs.ps1 — ne pas committer
# Dashboard: https://dashboard.emailjs.com/admin

VITE_EMAILJS_SERVICE_ID=$($serviceId.Trim())
VITE_EMAILJS_TEMPLATE_ID=$($templateId.Trim())
VITE_EMAILJS_PUBLIC_KEY=$($publicKey.Trim())
"@

$envPath = Join-Path $root ".env"
Set-Content -Path $envPath -Value $content -Encoding utf8

Write-Host ""
Write-Host "OK — .env écrit dans: $envPath" -ForegroundColor Green
Write-Host "Redémarrez Vite pour charger les variables:" -ForegroundColor Cyan
Write-Host "  npm run dev"
Write-Host ""
