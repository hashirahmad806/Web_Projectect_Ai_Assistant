# AI Student Assistant

A MERN starter for an AI-powered student assistant with:

- Chat with AI
- Image-based question solving
- Study history
- Personalized student dashboard
- Voice input placeholder for a later phase

## Tech Stack

- Frontend: React + Vite + Tailwind CSS + React Router
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- AI: OpenAI Responses API with image input support

## Project Structure

```text
frontend/
backend/
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

## Environment Variables

Create `backend/.env` from `backend/.env.example`.

Required variables:



## API Routes

- `POST /api/chat`
- `POST /api/upload`
- `GET /api/history`
- `GET /api/history/:sessionId`

## Notes

- Image uploads are stored temporarily in `backend/uploads/`.
- Voice input is represented in the UI as a placeholder action and can be connected later with the Web Speech API or OpenAI Realtime.
