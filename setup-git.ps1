# Connect C:\Users\Abdulaziz\Desktop\website to GitHub
# Run in PowerShell:  powershell -ExecutionPolicy Bypass -File .\setup-git.ps1

$ErrorActionPreference = "Stop"

Set-Location "C:\Users\Abdulaziz\Desktop\website"

# --- identity (must match a verified email in GitHub Settings -> Emails) ---
git config --global user.name  "Azizbeccoder"
git config --global user.email "abdulazizabdurakhmonov.2903@gmail.com"

# --- safety: .gitignore must exist before anything is staged ---
if (-not (Test-Path ".gitignore")) {
    Write-Host "ERROR: .gitignore is missing. Add it first or .env and node_modules will be committed." -ForegroundColor Red
    exit 1
}

# --- init (safe to re-run) ---
if (-not (Test-Path ".git")) { git init }
git branch -M main

git remote remove origin 2>$null
git remote add origin "https://github.com/Azizbeccoder/E-commerce-web_site.git"

git add .

# --- safety: refuse to commit if secrets or deps got staged ---
$staged = git diff --cached --name-only
$bad = $staged | Where-Object { $_ -match '(^|/)\.env$' -or $_ -match 'node_modules/' }
if ($bad) {
    Write-Host "ERROR: these files must not be committed:" -ForegroundColor Red
    $bad | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
    git reset
    exit 1
}

Write-Host ""
Write-Host "Staged $($staged.Count) files. Committing..." -ForegroundColor Green

git commit -m "Initial commit: MERN e-commerce app (Express API + React/Redux frontend)"

# --- push, falling back to a merge if the remote already has commits ---
git push -u origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "Remote has existing history - merging, then pushing again." -ForegroundColor Yellow
    git pull origin main --allow-unrelated-histories --no-edit
    git push -u origin main
}

Write-Host ""
Write-Host "Done. Check https://github.com/Azizbeccoder/E-commerce-web_site" -ForegroundColor Green
Write-Host "Contributions can take up to 24 hours to appear on your profile." -ForegroundColor Green
