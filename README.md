# 🎓 AI Student Assistant

[![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://mongodb.com)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20Tailwind-61dafb.svg)](https://vitejs.dev)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green.svg)](https://nodejs.org)
[![Database](https://img.shields.io/badge/Database-MongoDB%20%7C%20Mongoose-47a248.svg)](https://www.mongodb.com)
[![AI Engine](https://img.shields.io/badge/AI%20Engine-Groq%20%7C%20Llama%203-orange.svg)](https://groq.com)

**AI Student Assistant** is an intelligent, full-stack educational companion designed to empower students. Seamlessly integrated with high-performance LLMs via Groq, it offers multimodal capabilities to chat, analyze study resources, and solve problems from uploaded images in real-time.

---

## ✨ Key Features

- 💬 **Multimodal AI Chat**: Interactive and context-aware dialogue helper powered by Groq's high-speed inference.
- 📸 **Visual Question Solving**: Upload diagrams, math problems, or handwritten notes to get detailed, step-by-step solutions using Groq Vision.
- 📂 **Session Study History**: Browse and retrieve previous chats and uploaded questions.
- 📊 **Interactive Student Dashboard**: A modern, responsive interface designed with React, Tailwind CSS, and enhanced with GSAP animations.
- 🎤 **Voice Interaction Ready**: Placeholder UI implementation prepared for direct speech-to-text integration.
- 🔒 **Secure Authentication**: Secure student registration and login with JWT and bcryptjs.

---

## 🛠️ Tech Stack & Architecture

### Frontend
- **Framework**: [React](https://react.dev) + [Vite](https://vitejs.dev)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [Lucide React Icons](https://lucide.dev)
- **Routing**: [React Router DOM](https://reactrouter.com)
- **Animations**: [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org) (ES Modules)
- **Framework**: [Express](https://expressjs.com)
- **Database**: [MongoDB](https://www.mongodb.com) with [Mongoose ODM](https://mongoosejs.com)
- **File Uploads**: [Multer](https://github.com/expressjs/multer) & [ImageKit.io](https://imagekit.io) integration
- **AI Inference**: [Groq Cloud API](https://console.groq.com)

---

## 📁 Repository Structure

```text
├── backend/
│   ├── src/
│   │   ├── config/      # Database and external service clients
│   │   ├── controllers/ # Request controllers (auth, chat, upload, history)
│   │   ├── models/      # Mongoose Schemas (User, Session, Chat)
│   │   ├── routes/      # Express API route handlers
│   │   └── utils/       # Utility helpers (auth tokens, AI callers)
│   ├── uploads/         # Temporary local storage for file processing
│   ├── server.js        # Main entry point
│   └── .env.example     # Template for backend configuration
└── frontend/
    ├── src/             # React source code (components, pages, styles)
    ├── index.html       # Vite entry HTML template
    ├── tailwind.config.js
    └── .env.example     # Template for frontend configuration
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) (v18+ recommended)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a running local MongoDB instance
- A [Groq Console](https://console.groq.com) API Key
- An [ImageKit.io](https://imagekit.io) account (for hosting uploaded image notes)

### 1. Clone & Install Dependencies

Clone this repository to your local machine, then install the root and workspace packages:

```bash
# Clone the repository
git clone https://github.com/your-username/ai-student-assistant.git
cd ai-student-assistant

# Install root dependencies
npm install

# Install Frontend dependencies
cd frontend
npm install

# Install Backend dependencies
cd ../backend
npm install
```

### 2. Environment Configuration

#### Backend Configuration
Create a `.env` file in the `backend/` directory based on the variables below:
```env
PORT=5001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/databaseName
GROQ_API_KEY=gsk_yourGroqApiKeyHere
GROQ_MODEL=llama-3.3-70b-versatile
GROQ_VISION_MODEL=meta-llama/llama-4-scout-17b-16e-instruct
CLIENT_URL=http://localhost:5173

# ImageKit Configuration for cloud uploads
IMAGEKIT_PUBLIC_KEY=public_yourPublicKey
IMAGEKIT_PRIVATE_KEY=private_yourPrivateKey
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/yourEndpoint
```

#### Frontend Configuration
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5001/api
```

### 3. Run the Application

#### Start Backend Service
From the `backend/` folder:
```bash
npm run dev
```
*The server will boot up on port `5001`.*

#### Start Frontend Client
From the `frontend/` folder in a new terminal window:
```bash
npm run dev
```
*The React client will launch on [http://localhost:5173](http://localhost:5173).*

---

## 🔌 API Reference

### Authentication Routes
- `POST /api/auth/register` - Create a new student account
- `POST /api/auth/login` - Authenticate and obtain JWT token

### Chat & History Routes
- `POST /api/chat` - Send a message context to the AI assistant
- `GET /api/history` - Retrieve student's session history list
- `GET /api/history/:sessionId` - Retrieve specific conversation details

### Upload & Multimodal Routes
- `POST /api/upload` - Upload image of question for analysis (resolves details via vision endpoint)

---

## 📝 Key Notes

- **Image Processing**: Images are uploaded to ImageKit for public URL retrieval before being sent to the Groq vision model for OCR and explanation.
- **Voice UI**: The microphone button visually reacts to user interaction and is structured to scale into real-time Web Speech integrations in subsequent releases.
