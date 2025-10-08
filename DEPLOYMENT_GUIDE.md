# 🚀 Digital Shield Academy - Deployment Guide

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (free tier available)
- GitHub account
- Vercel account (free tier available)
- Railway account (free tier available)

---

## 🎯 Option 1: Vercel + Railway (Recommended for Beginners)

### Step 1: Prepare MongoDB Database

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account
   - Create a new cluster (free tier)
   - Create a database user
   - Get your connection string

2. **Configure Database**
   - Replace `<password>` in connection string with your user password
   - Replace `<dbname>` with `digital-shield-academy`

### Step 2: Deploy Backend to Railway

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to Railway**
   - Go to [Railway](https://railway.app)
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect Node.js

3. **Configure Environment Variables**
   In Railway dashboard, add these variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/digital-shield-academy
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   ```

4. **Get Backend URL**
   - Railway will provide a URL like: `https://your-app.railway.app`
   - Copy this URL

### Step 3: Deploy Frontend to Vercel

1. **Update Frontend Configuration**
   - Create `frontend/.env.production`:
   ```
   VITE_API_URL=https://your-app.railway.app
   ```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project" → Import your repository
   - Set Root Directory to `frontend`
   - Add Environment Variable:
     ```
     VITE_API_URL=https://your-app.railway.app
     ```
   - Deploy

3. **Update CORS in Backend**
   - Go back to Railway
   - Update `CORS_ORIGIN` to your Vercel URL

---

## 🎯 Option 2: Netlify + Heroku

### Step 1: Deploy Backend to Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

3. **Configure Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-uri"
   heroku config:set JWT_SECRET="your-jwt-secret"
   heroku config:set NODE_ENV="production"
   ```

4. **Deploy**
   ```bash
   git subtree push --prefix backend heroku main
   ```

### Step 2: Deploy Frontend to Netlify

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `dist` folder
   - Configure environment variables

---

## 🎯 Option 3: Full VPS Deployment (Advanced)

### Step 1: Set Up VPS

1. **Get a VPS** (DigitalOcean, AWS EC2, etc.)
2. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install nodejs npm nginx mongodb
   ```

### Step 2: Deploy Backend

1. **Clone Repository**
   ```bash
   git clone your-repo-url
   cd your-repo/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

4. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "digital-shield-backend"
   pm2 startup
   pm2 save
   ```

### Step 3: Deploy Frontend

1. **Build Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run build
   ```

2. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           root /path/to/frontend/dist;
           try_files $uri $uri/ /index.html;
       }
       
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 🔧 Post-Deployment Steps

### 1. Seed Database
```bash
# Connect to your deployed backend
cd backend
node scripts/seedBlogPosts.js
node scripts/seedAdditionalBlogPosts.js
node scripts/seedSimulations.js
```

### 2. Test Deployment
- Visit your frontend URL
- Try registering a new account
- Test the spam submission feature
- Verify all modules work

### 3. Set Up Monitoring
- Configure error tracking (Sentry)
- Set up uptime monitoring
- Configure backups

---

## 🚨 Common Issues & Solutions

### CORS Errors
- Make sure `CORS_ORIGIN` matches your frontend URL exactly
- Check for trailing slashes

### Database Connection Issues
- Verify MongoDB URI format
- Check network access in MongoDB Atlas
- Ensure database user has proper permissions

### Environment Variables
- Double-check all environment variables are set
- Restart services after changing environment variables

### Build Errors
- Check Node.js version compatibility
- Clear node_modules and reinstall
- Check for missing dependencies

---

## 📊 Recommended Option: Vercel + Railway

**Why this combination?**
- ✅ Free tiers available
- ✅ Easy GitHub integration
- ✅ Automatic deployments
- ✅ Built-in SSL certificates
- ✅ Great performance
- ✅ Easy to scale

**Estimated Cost:** $0/month (free tiers)

**Time to Deploy:** 30-45 minutes

---

## 🎉 Success Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database connected and seeded
- [ ] User registration works
- [ ] Login/logout works
- [ ] Spam submission feature works
- [ ] All modules accessible
- [ ] Blog posts visible
- [ ] SSL certificates active
- [ ] Environment variables configured

---

## 📞 Support

If you encounter issues:
1. Check the console logs in your deployment platform
2. Verify all environment variables are set correctly
3. Test the API endpoints directly
4. Check the database connection
5. Review the deployment logs

Happy deploying! 🚀
