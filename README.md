# 📚 StudyMate

StudyMate is a full-stack productivity web application built for students to organize their academic life in one place. It allows users to manage notes, track tasks, verify their accounts via email, and interact with an AI assistant for study-related queries.

## 🚀 Live Demo

https://studymate-umber-eta.vercel.app/


## ✨ Features

### 🔐 Authentication
- User Registration & Login
- JWT Authentication
- Secure HTTP-only Cookies
- Email Verification using OTP
- Logout functionality
- Protected Routes

### 📝 Notes Management
- Create Notes
- View Notes
- Update Notes
- Delete Notes
- Upload note attachments
- Store uploaded files securely

### ✅ Task Management
- Create Tasks
- Edit Tasks
- Delete Tasks
- Mark tasks as completed
- Organize daily work efficiently

### 🤖 AI Assistant
- Chat with an AI assistant
- Get explanations of concepts
- Ask programming questions
- Study-related assistance powered by Google's Gemini API

### 👤 User Features
- Personalized Dashboard
- Responsive Design
- Secure Authentication Flow

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Context API
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Resend
- Multer

### APIs & Services
- Google Gemini API
- Resend API

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure

```
StudyMate
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── contexts
│   │   ├── hooks
│   │   └── api
│   └── public
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   ├── uploads
│   └── utils
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/your-username/StudyMate.git
cd StudyMate
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

RESEND_API_KEY=your_resend_api_key

GEMINI_API_KEY=your_gemini_api_key

CLIENT_URL=http://localhost:5173
```

Run the backend

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend

```bash
npm run dev
```

---

## 🔒 Environment Variables

### Backend

| Variable | Description |
|----------|-------------|
| PORT | Server Port |
| MONGO_URI | MongoDB Atlas Connection String |
| JWT_SECRET | JWT Secret Key |
| RESEND_API_KEY | Resend API key |
| GEMINI_API_KEY | Gemini API Key |
| CLIENT_URL | Frontend URL |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name |
| CLOUDINARY_API_KEY | Cloudinary API key |

### Frontend

| Variable | Description |
|----------|-------------|
| VITE_API_URL | Backend API URL |

---

## 📸 Screenshots

Add screenshots of:

- Landing Page
- Login
- Dashboard
- Notes
- Tasks
- AI Chat

---

## 🔐 Security Features

- JWT Authentication
- HTTP-only Cookies
- Password Hashing using bcrypt
- Protected Routes
- Email OTP Verification
- Secure File Uploads
- CORS Configuration

---

## 🎯 Future Improvements

- Dark Mode
- Task Reminders
- Calendar Integration
- Rich Text Notes
- Note Search & Filters
- AI-generated Note Summaries
- AI Task Planning
- Markdown Support

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new feature branch

```
git checkout -b feature-name
```

3. Commit your changes

```
git commit -m "Added feature"
```

4. Push to your branch

```
git push origin feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Taru Sharma**

If you like this project, consider giving it a ⭐ on GitHub!