# PaisaGrow - Investment Platform for Everyone

A comprehensive investment platform designed to make investing accessible to everyone, especially those in low-income or rural areas. Start investing with as little as ₹10 in safe, low-risk options.

## 🚀 Features

### Core Investment Features
- **Micro Investment**: Start with as little as ₹10
- **ETF & Index Funds**: Invest in diversified, low-risk options
- **Visual Dashboard**: Transparent growth tracking and portfolio visualization
- **Emergency Fund**: Build emergency savings with goal tracking
- **Urgent Withdrawal**: Access your funds anytime without penalties

### Smart Investment Features
- **Transaction Round-up**: Automatically invest spare change from transactions
- **Daily SIP**: Systematic Investment Plans starting from ₹1-100 daily
- **Investment Streaks**: Daily/weekly challenges with rewards for continued investment
- **Goal Setting**: Set financial goals with progress tracking

### Village Partner System
- **Mediator Dashboard**: Village partners can manage investments for villagers
- **Community Investment**: Pool small amounts from multiple villagers
- **Commission System**: Partners earn from successful investments
- **Reporting**: Detailed reports and analytics

### User Experience
- **Experience-based Onboarding**: Beginner, Intermediate, Expert levels
- **Regional Language Support**: Multi-language interface
- **SMS Portfolio Updates**: Daily portfolio summaries via SMS
- **Mobile-First Design**: Optimized for all devices

### Security & Trust
- **JWT Authentication**: Secure user authentication
- **Clerk Integration**: Professional user management
- **Historical Returns**: Transparent performance data
- **Secure Payments**: Multiple payment options with encryption

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **React Router** for navigation
- **React Query** for data fetching

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB Atlas** with Mongoose
- **JWT** for authentication
- **Cookie-based sessions**

### Authentication
- **Clerk** for user registration and management
- **JWT tokens** for API authentication
- **Secure cookies** for session management

### Database
- **MongoDB Atlas** for cloud database
- **Mongoose** for ODM
- **Optimized schemas** for performance

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- MongoDB Atlas account
- Clerk account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd vibe-sanctuary
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Using pnpm (recommended)
pnpm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/paisagrow?retryWrites=true&w=majority

# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# SMS Service (for portfolio updates)
SMS_API_KEY=your_sms_api_key_here
SMS_SENDER_ID=PAISAGROW

# Payment Gateway (Dummy)
PAYMENT_GATEWAY_KEY=your_payment_gateway_key_here

# Email Service
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# App Configuration
APP_NAME=PaisaGrow
APP_URL=http://localhost:8080
API_URL=http://localhost:3001
```

### 4. Database Setup
1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Update the `MONGODB_URI` in your `.env` file

### 5. Clerk Setup
1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable key to `VITE_CLERK_PUBLISHABLE_KEY`

### 6. Start Development Servers

```bash
# Start both frontend and backend
npm run dev

# Or start separately
npm run dev:client  # Frontend on http://localhost:8080
npm run dev:server  # Backend on http://localhost:3001
```

## 🏗️ Project Structure

```
vibe-sanctuary/
├── client/                 # Frontend React application
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── global.css        # Global styles
├── server/               # Backend Node.js application
│   ├── config/           # Configuration files
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   └── index.ts          # Server entry point
├── shared/               # Shared utilities
├── netlify/              # Netlify functions
└── public/               # Static assets
```

## 🚀 Key Features Implementation

### 1. Transaction Round-up System
- Automatically rounds up transactions to nearest ₹10
- Difference is invested automatically
- User can enable/disable feature
- Real-time transaction monitoring

### 2. Micro-SIP (Systematic Investment Plan)
- Daily investments starting from ₹1
- Automated investment scheduling
- Flexible amount adjustment
- Progress tracking and notifications

### 3. Village Partner Dashboard
- Manage multiple villager accounts
- Commission tracking system
- Community investment pooling
- Detailed reporting and analytics

### 4. Goal Setting & Challenges
- Financial goal creation and tracking
- Daily/weekly investment challenges
- Reward system for achievements
- Progress visualization

### 5. Emergency Fund Management
- Dedicated emergency fund allocation
- Goal-based saving
- Quick withdrawal access
- Progress tracking

## 📱 Pages & Routes

- `/` - Landing page
- `/dashboard` - Main investment dashboard
- `/onboarding` - User experience setup
- `/portfolio` - Portfolio management
- `/historical-returns` - Performance history
- `/village-partner` - Village partner dashboard
- `/goals` - Goal setting and challenges
- `/payment` - Payment processing
- `/emergency-withdrawal` - Emergency fund withdrawal

## 🔧 API Endpoints

### User Management
- `POST /api/users` - Create user profile
- `GET /api/users/:clerkId` - Get user profile
- `PUT /api/users/:clerkId` - Update user profile
- `GET /api/users/:clerkId/dashboard` - Get dashboard data

### Investments
- `POST /api/investments` - Create investment
- `GET /api/investments/:clerkId` - Get user investments
- `POST /api/investments/roundup` - Process round-up
- `POST /api/investments/sip` - Process daily SIP

### Portfolio
- `GET /api/portfolio/:clerkId` - Get portfolio
- `GET /api/portfolio/:clerkId/history` - Get history
- `POST /api/portfolio/:clerkId/refresh` - Refresh portfolio
- `GET /api/portfolio/:clerkId/recommendations` - Get recommendations

### Emergency Withdrawals
- `POST /api/withdrawals/:clerkId/emergency` - Create emergency withdrawal
- `GET /api/withdrawals/:clerkId/history` - Get withdrawal history
- `GET /api/withdrawals/:withdrawalId/status` - Get withdrawal status
- `POST /api/withdrawals/:withdrawalId/cancel` - Cancel pending withdrawal

## 🎯 Problem Statement Solution

This platform addresses the key challenges mentioned in PS-14:

### Accessibility
- **Low Minimum Investment**: Start with just ₹10
- **Simple Interface**: User-friendly design for beginners
- **Village Partner System**: Local mediators for rural areas
- **Regional Language Support**: Multiple language options

### Trust Building
- **Transparency**: Clear portfolio tracking and returns
- **Historical Data**: Proven performance records
- **Emergency Access**: Withdraw anytime without penalties
- **Educational Content**: Investment guidance for all levels

### Risk Management
- **Diversified Funds**: ETF and index fund investments
- **Low-Risk Options**: Conservative investment strategies
- **Emergency Fund**: Dedicated safety net
- **Gradual Investment**: SIP and round-up systems

## 🚀 Deployment

### Netlify Deployment
The project includes Netlify configuration for easy deployment:

```bash
# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod
```

### Environment Variables
Make sure to set all environment variables in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **AI-powered Recommendations**: Personalized investment suggestions
- **Social Features**: Community investment groups
- **Advanced Analytics**: Detailed performance insights
- **Mobile App**: Native mobile application
- **Voice Interface**: Voice-based investment commands
- **Blockchain Integration**: Decentralized investment options

---

**PaisaGrow** - Making investment accessible to everyone, one rupee at a time! 💰📈
