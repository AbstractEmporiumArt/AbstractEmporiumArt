@echo off
REM Abstract Emporium Website - Git & Cloudflare Deployment Script
REM This script helps manage your Git repository and deployment to Cloudflare

setlocal enabledelayedexpansion

:menu
cls
echo.
echo ========================================
echo Abstract Emporium - Deployment Manager
echo ========================================
echo.
echo 1. Check Git Status
echo 2. Commit and Push Changes
echo 3. View Git Log
echo 4. Configure GitHub Remote
echo 5. Exit
echo.
set /p choice="Select an option (1-5): "

if "%choice%"=="1" goto status
if "%choice%"=="2" goto commit
if "%choice%"=="3" goto log
if "%choice%"=="4" goto remote
if "%choice%"=="5" goto end
echo Invalid choice. Try again.
timeout /t 2 >nul
goto menu

:status
cls
echo Checking Git Status...
echo.
git status
echo.
pause
goto menu

:commit
cls
echo.
set /p message="Enter commit message: "
if "%message%"=="" (
    echo No message provided.
    timeout /t 2 >nul
    goto menu
)
echo.
echo Staging changes...
git add .
echo Committing changes...
git commit -m "%message%"
echo.
echo Pushing to GitHub...
git push origin main
echo.
echo Done! Your changes have been pushed to GitHub.
echo Cloudflare will automatically redeploy your site.
echo.
pause
goto menu

:log
cls
echo Git Commit History:
echo.
git log --oneline -10
echo.
pause
goto menu

:remote
cls
echo Current Git Remote:
echo.
git remote -v
echo.
echo To set up a new remote, use:
echo git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
echo git branch -M main
echo git push -u origin main
echo.
pause
goto menu

:end
echo Goodbye!
