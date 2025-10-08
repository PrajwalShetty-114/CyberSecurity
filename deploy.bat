@echo off
echo 🚀 Digital Shield Academy Deployment Preparation
echo ================================================

REM Check if we're in the right directory
if not exist "frontend" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

if not exist "backend" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

echo ✅ Project structure detected

REM Check Node.js version
node --version
echo 📦 Node.js version checked

REM Install dependencies
echo 📥 Installing dependencies...

echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo Installing backend dependencies...
cd backend
call npm install
cd ..

echo ✅ Dependencies installed

REM Create production environment files
echo 🔧 Creating production environment files...

REM Frontend environment
echo VITE_API_URL=https://your-backend-url.railway.app > frontend\.env.production
echo ✅ Created frontend/.env.production

REM Backend environment example
(
echo # Database
echo MONGODB_URI=mongodb://localhost:27017/digital-shield-academy
echo.
echo # JWT
echo JWT_SECRET=your-super-secret-jwt-key-here
echo.
echo # Server
echo PORT=5000
echo NODE_ENV=development
echo.
echo # CORS
echo CORS_ORIGIN=http://localhost:5173
) > backend\.env.example
echo ✅ Created backend/.env.example

REM Build frontend
echo 🏗️  Building frontend...
cd frontend
call npm run build
cd ..
echo ✅ Frontend built successfully

echo.
echo 🎉 Deployment preparation complete!
echo.
echo Next steps:
echo 1. Set up MongoDB Atlas database
echo 2. Deploy backend to Railway/Heroku
echo 3. Deploy frontend to Vercel/Netlify
echo 4. Configure environment variables
echo 5. Seed the database
echo.
echo 📖 See DEPLOYMENT_GUIDE.md for detailed instructions
echo.
echo 🔗 Quick links:
echo    - MongoDB Atlas: https://www.mongodb.com/atlas
echo    - Railway: https://railway.app
echo    - Vercel: https://vercel.com
echo    - Heroku: https://heroku.com
echo    - Netlify: https://netlify.com
echo.
pause
