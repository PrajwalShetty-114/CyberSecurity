#!/bin/bash

# Digital Shield Academy Deployment Script
# This script helps prepare your application for deployment

echo "🚀 Digital Shield Academy Deployment Preparation"
echo "================================================"

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "frontend" ] && [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project structure detected"

# Check Node.js version
NODE_VERSION=$(node --version)
echo "📦 Node.js version: $NODE_VERSION"

# Install dependencies
echo "📥 Installing dependencies..."

if [ -d "frontend" ]; then
    echo "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

if [ -d "backend" ]; then
    echo "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

echo "✅ Dependencies installed"

# Create production environment files
echo "🔧 Creating production environment files..."

# Frontend environment
if [ -d "frontend" ]; then
    cat > frontend/.env.production << EOF
VITE_API_URL=https://your-backend-url.railway.app
EOF
    echo "✅ Created frontend/.env.production"
fi

# Backend environment example
if [ -d "backend" ]; then
    cat > backend/.env.example << EOF
# Database
MONGODB_URI=mongodb://localhost:27017/digital-shield-academy

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173
EOF
    echo "✅ Created backend/.env.example"
fi

# Build frontend
echo "🏗️  Building frontend..."
if [ -d "frontend" ]; then
    cd frontend
    npm run build
    cd ..
    echo "✅ Frontend built successfully"
fi

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Set up MongoDB Atlas database"
echo "2. Deploy backend to Railway/Heroku"
echo "3. Deploy frontend to Vercel/Netlify"
echo "4. Configure environment variables"
echo "5. Seed the database"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""
echo "🔗 Quick links:"
echo "   - MongoDB Atlas: https://www.mongodb.com/atlas"
echo "   - Railway: https://railway.app"
echo "   - Vercel: https://vercel.com"
echo "   - Heroku: https://heroku.com"
echo "   - Netlify: https://netlify.com"
