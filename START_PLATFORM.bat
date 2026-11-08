@echo off
title Company A Dealership Platform - Local Server
color 0b
echo ===================================================================
echo     Company A - Brand X Dealership Platform (Lucknow)
echo ===================================================================
echo.

cd /d "C:\Users\baluv\OneDrive\Desktop\dealership_platform\server"

echo Checking if server is already running on port 5000...
netstat -ano | findstr :5000 >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Server is already running on port 5000!
    echo Opening application in your web browser...
    start http://localhost:5000
    echo.
    echo Press any key to close this launcher...
    pause >nul
    exit
)

echo Starting Node.js backend server...
echo Server URL: http://localhost:5000
echo.
echo NOTE: KEEP THIS WINDOW OPEN while using the platform.
echo Closing this window will stop the server.
echo.

timeout /t 2 /nobreak >nul
start http://localhost:5000
node index.js

pause
