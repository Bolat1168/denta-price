@echo off
echo Создание файлов проекта...

REM layout.tsx
echo import type { Metadata } from 'next' > app\layout.tsx
echo import './globals.css' >> app\layout.tsx
echo export const metadata: Metadata = { >> app\layout.tsx
echo   title: 'DentaPrice', >> app\layout.tsx
echo } >> app\layout.tsx
echo export default function Layout({ children }) { >> app\layout.tsx
echo   return ( >> app\layout.tsx
echo     ^<html lang="ru"^> >> app\layout.tsx
echo       ^<body^>{children}^</body^> >> app\layout.tsx
echo     ^</html^> >> app\layout.tsx
echo   ) >> app\layout.tsx
echo } >> app\layout.tsx

REM page.tsx
echo export default function Home() { > app\page.tsx
echo   return ^<h1^>DentaPrice работает!^</h1^> >> app\page.tsx
echo } >> app\page.tsx

REM globals.css
echo @tailwind base; > app\globals.css
echo @tailwind components; >> app\globals.css
echo @tailwind utilities; >> app\globals.css

echo Файлы созданы!
pause