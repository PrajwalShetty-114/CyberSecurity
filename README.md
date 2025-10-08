# Digital Shield Academy

An innovative, gamified web-based learning platform focused on practical cybersecurity skills for both individuals and businesses. The platform's core principle is 'learning by doing' through interactive simulations, moving beyond traditional passive training methods.

## 🛡️ Core Vision & Mission

- **Empower citizens** with practical, instinctive skills to identify and react to digital threats
- **Create 'digital muscle memory'** through immersive, real-world scenario simulations
- **Offer a scalable solution** for both individual users and corporate employee training, with measurable improvement in threat detection

## ✨ Key Features

### 🎮 Gamification Elements
- **Points System**: Awarded for correct actions, deducted for errors
- **Badges**: Unlockable achievements for module completion and skill mastery
- **Progress Tracking**: Visual indicators within modules and on user dashboards
- **Leaderboards**: For friendly competition (optional for individuals, key for businesses)
- **Level System**: XP-based progression with visual feedback

### 🎯 Interactive Simulations
- **The Phishing Drill**: Simulated email inbox with mix of legitimate and malicious emails
- **The MFA Gauntlet**: Step-by-step guided simulation for setting up Multi-Factor Authentication
- **The Scammer's Playbook**: Interactive scenarios for vishing, smishing, pharming, and brand impersonation
- **Account Takeover**: Interactive timeline showing the impact of password reuse

### 🏆 Threat of the Week
- Regularly updated mini-simulations based on current, real-world cyber threats
- Dynamic content with real-world examples and prevention tips
- Leaderboard for weekly challenges
- Special badges and bonus points

### 🏢 Business Features
- **Team Management**: Role-based access control and member tracking
- **Analytics Dashboard**: Comprehensive reporting and progress tracking
- **Custom Learning Paths**: Tailored content for different industries
- **Compliance Tracking**: Detailed reporting for regulatory requirements
- **Bulk User Management**: Easy onboarding and administration

## 🏗️ Architecture

### Backend (Node.js + Express + MongoDB)
- **Models**: User, Business, Simulation, ThreatOfTheWeek, BlogPost
- **Authentication**: JWT-based with role-based access control
- **API Routes**: 
  - `/api/auth` - Authentication and user management
  - `/api/modules` - Learning module content
  - `/api/progress` - User progress and gamification
  - `/api/simulations` - Interactive simulation engine
  - `/api/threat-of-week` - Weekly challenge system
  - `/api/business` - Business account management
  - `/api/blog` - Content management system

### Frontend (React + Material-UI)
- **Pages**: Home, Modules, For Individuals, For Business, Academy Difference, Blog, Contact
- **Components**: Enhanced Dashboard, Badge System, Progress Tracker, Threat of the Week
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark Theme**: Modern, professional appearance

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digital-shield-academy
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/digital-shield-academy
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   ```

5. **Start the development servers**
   
   Backend (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```

   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📊 Database Schema

### User Model
- Authentication and profile information
- Comprehensive progress tracking
- Gamification data (points, badges, achievements)
- Business account association
- Learning preferences and settings

### Business Model
- Organization information and settings
- Member management and roles
- Analytics and reporting data
- Subscription and billing information

### Simulation Model
- Interactive content for all modules
- Difficulty levels and scoring
- Real-world scenario data
- Feedback and explanations

### ThreatOfTheWeek Model
- Weekly challenge content
- Real-world examples and impact data
- Participant tracking and scoring
- Prevention tips and best practices

## 🎯 Learning Modules

### 1. Phishing Spotter
- **Objective**: Learn to identify and avoid phishing emails
- **Content**: Interactive email simulations with real-world examples
- **Skills**: Email analysis, link inspection, sender verification
- **Duration**: 15 minutes

### 2. MFA Setup Guide
- **Objective**: Master Multi-Factor Authentication setup
- **Content**: Step-by-step guided simulations for various platforms
- **Skills**: MFA configuration, QR code scanning, backup codes
- **Duration**: 20 minutes

### 3. Scam Recognizer
- **Objective**: Identify common phone and SMS scams
- **Content**: Interactive scenarios for vishing, smishing, and social engineering
- **Skills**: Caller verification, message analysis, response strategies
- **Duration**: 15 minutes

## 🏆 Gamification System

### Points & Levels
- **Base Points**: 10 points per correct action
- **Speed Bonus**: 50% bonus for quick responses
- **Accuracy Bonus**: Based on overall performance
- **Level System**: 1000 XP per level with visual progress bars

### Badges & Achievements
- **Module Badges**: Mastery badges for each learning module
- **Achievement Badges**: Milestone-based accomplishments
- **Special Badges**: Threat of the Week and perfect score badges
- **Rarity System**: Common, Rare, Epic, Legendary classifications

### Progress Tracking
- **Module Progress**: Detailed tracking for each learning module
- **Statistics**: Comprehensive learning analytics
- **Streaks**: Login and learning streak tracking
- **Leaderboards**: Global and business-specific rankings

## 🏢 Business Features

### Team Management
- **Admin Dashboard**: Comprehensive team oversight
- **Member Roles**: Admin and member permissions
- **Bulk Operations**: Easy user management
- **Invitation System**: Streamlined onboarding

### Analytics & Reporting
- **Team Performance**: Aggregate learning metrics
- **Individual Progress**: Detailed member tracking
- **Compliance Reports**: Regulatory requirement documentation
- **ROI Tracking**: Training effectiveness measurement

### Customization
- **Learning Paths**: Tailored content for different roles
- **Settings**: Configurable platform behavior
- **Branding**: Custom organization appearance
- **Integrations**: API access for enterprise systems

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Role-Based Access**: Granular permission system
- **Data Encryption**: Sensitive data protection
- **Rate Limiting**: API abuse prevention

## 📱 Responsive Design

- **Mobile-First**: Optimized for all device sizes
- **Progressive Web App**: Offline capability and app-like experience
- **Accessibility**: WCAG 2.1 AA compliance
- **Cross-Browser**: Support for all modern browsers

## 🚀 Deployment

### Production Setup
1. **Environment Variables**: Configure production database and secrets
2. **Build Frontend**: `npm run build` in frontend directory
3. **Database**: Set up MongoDB Atlas or self-hosted instance
4. **Server**: Deploy to Heroku, AWS, or preferred platform
5. **Domain**: Configure custom domain and SSL certificates

### Docker Support
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI for the component library
- React for the frontend framework
- Express.js for the backend framework
- MongoDB for the database
- All contributors and testers

## 📞 Support

For support, email support@digitalshieldacademy.com or join our community Discord server.

---

**Digital Shield Academy** - Building a safer digital world, one learner at a time. 🛡️