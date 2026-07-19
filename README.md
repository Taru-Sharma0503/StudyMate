# 📚 StudyMate

StudyMate is a full-stack productivity web application built for students to organize their academic life in one place. It allows users to manage notes, track tasks and interact with an AI assistant for study-related queries.

## 🚀 Live Demo

https://studymate-umber-eta.vercel.app/


## ✨ Features

### 🔐 Authentication
- User Registration & Login
- JWT Authentication
- Secure HTTP-only Cookies
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
- Multer

### APIs & Services
- Google Gemini API

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

GEMINI_API_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

CLOUDINARY_API_KEY=your_cloudinary_api_key

CLOUDINARY_API_SECRET=your_cloudinary_api_secret
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
| GEMINI_API_KEY | Gemini API Key |
| CLOUDINARY_API_SECRET | Cloudinary API secret |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name |
| CLOUDINARY_API_KEY | Cloudinary API key |

### Frontend

| Variable | Description |
|----------|-------------|
| VITE_API_URL | Backend API URL |

---

## 📸 Screenshots

Add screenshots of:

<img width="1917" height="911" alt="image" src="https://github.com/user-attachments/assets/f6de9760-0421-4ace-861d-763396e83e42" />
<img width="1917" height="912" alt="image" src="https://github.com/user-attachments/assets/74f3008f-5290-43da-af29-59d07c42ffd4" />
<img width="1897" height="908" alt="image" src="https://github.com/user-attachments/assets/befe59c7-e74b-498b-8f6f-7b5f4a7d9413" />
<img width="1917" height="907" alt="image" src="https://github.com/user-attachments/assets/0492726c-adab-4e6b-9a87-0d6c67dc1907" />
<img width="1917" height="903" alt="image" src="https://github.com/user-attachments/assets/d73f098c-1f0f-412b-8382-8666c6ec1f4c" />
<img width="1917" height="912" alt="image" src="https://github.com/user-attachments/assets/adb71938-23c0-4d2c-a2e0-1a6bd12027b0" />


---

## 🔐 Security Features

- JWT Authentication
- HTTP-only Cookies
- Password Hashing using bcrypt
- Protected Routes
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
