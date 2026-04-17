@echo off
echo Установка DentaPrice...

REM Создаем package.json
echo {> package.json
echo   "name": "denta-price",>> package.json
echo   "private": true,>> package.json
echo   "scripts": {>> package.json
echo     "dev": "next dev -p 3001",>> package.json
echo     "build": "next build",>> package.json
echo     "start": "next start">> package.json
echo   },>> package.json
echo   "dependencies": {>> package.json
echo     "next": "14.x",>> package.json
echo     "react": "18.x",>> package.json
echo     "react-dom": "18.x",>> package.json
echo     "lucide-react": "latest">> package.json
echo   }>> package.json
echo }>> package.json

echo Устанавливаем зависимости...
call npm install

echo Создаем структуру папок...
mkdir app 2>nul
mkdir app\components 2>nul
mkdir app\data 2>nul
mkdir app\utils 2>nul

echo Готово!
echo Запуск: npm run dev
echo Сайт: http://localhost:3001
pause