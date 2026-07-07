# CampusSync

CampusSync is a modern, responsive, and robust educational platform designed to streamline operations between students, teachers, and administrators. 

This repository has been entirely redesigned using a **Monorepo Architecture** to ensure clean separation of concerns and high scalability.

## 🚀 Technologies

### Frontend (`/client`)
- **Framework**: React.js with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui & Radix UI
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Authentication**: Firebase Client SDK

### Backend (`/server`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database / Auth Orchestration**: Firebase Admin SDK (Firestore & Auth)

---

## 📁 Project Structure

```text
campussync/
├── client/           # The frontend React/Vite Single Page Application
│   ├── src/
│   │   ├── components/  # Reusable UI components (shadcn/ui, layout)
│   │   ├── pages/       # Route-level components (Student, Admin, Teacher)
│   │   ├── config/      # Firebase Client initialization
│   │   └── lib/         # Utility functions
├── server/           # The backend Node/Express REST API
│   ├── src/
│   │   ├── controllers/ # Request handlers and business logic
│   │   ├── middlewares/ # Firebase token verification & RBAC
│   │   ├── routes/      # Express router definitions
│   │   └── config/      # Firebase Admin initialization
└── old_nextjs/       # Archive of the previous Next.js iteration
```

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- Firebase Project configured (with Firestore and Authentication enabled)

### 1. Setup the Backend Server

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the `server` directory and add your Firebase Service Account Key:
   ```env
   FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"your-project-id",...}
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The server will run on http://localhost:3000 (or the port defined in your environment).*

### 2. Setup the Frontend Client

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the `client` directory and add your Firebase client config variables:
   ```env
   VITE_FIREBASE_API_KEY="your-api-key"
   VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
   VITE_FIREBASE_PROJECT_ID="your-project-id"
   VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   VITE_FIREBASE_APP_ID="your-app-id"
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The client will run on http://localhost:5173.*

---

## 🌟 Key Features

1. **Role-Based Access Control**: Secure routing and API endpoints governed by Firebase Auth tokens restricting access to Students, Teachers, and Admins.
2. **Smart Doubt Clarification System**: A peer-to-peer query broadcast system that escalates unanswered doubts to faculty after 4 hours.
3. **Subject Drive**: A centralized cloud repository for academic materials.
4. **Modern UI/UX**: Premium aesthetic featuring glassmorphism, fluid animations, and a responsive grid layout.

## 📝 License
This project is licensed under the MIT License.
