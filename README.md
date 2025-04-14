# ✅ Task Manager App

An all-in-one **full-stack Task Manager** application built with **React**, **Node.js**, and **a JSON file as the database** — designed with a modern, clean, and premium user interface to impress recruiters and boost productivity.

> 🌐 **Live Demos**  
> 🔸 Frontend: (https://task-manager-app-vert-five.vercel.app/)
> 🔸 Backend: (https://task-manager-app-cnc3.vercel.app/)

---

## 🎯 Features

- 🔐 User Registration and Login
- 📋 Add, View, Mark Complete, and Delete Tasks
- 🎨 Premium UI with animations and responsive design
- 🚪 Logout button and persistent login state
- 💾 Uses `db.json` as a lightweight backend data store (no external DB)
- 🌈 Framer Motion animations + Tailwind UI
- 🔐 LocalStorage-based authentication

---

## 🛠️ Tech Stack

### Frontend (React)

- React.js (with Hooks)
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- Vercel (Deployment)

### Backend (Node.js)

- Express.js
- `fs` module to read/write from `db.json`
- Body-parser & CORS
- Lightweight RESTful API
- Vercel (Deployment)

> 🗂 **Database**: NoSQL-style flat file storage using a local `db.json`

---

## 📦 Project Structure

```
task-manager-app/
│
├── frontend/               # React application
│   ├── public/
│   ├── src/
│   │   ├── components/     # TaskCard, Navbar, etc.
│   │   ├── pages/          # Login, Register, Dashboard
│   │   └── App.jsx
│   └── tailwind.config.js
│
├── backend/                # Node + Express API
│   ├── db.json             # JSON file acting as a database
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   └── server.js
```

---

## ⚙️ Installation & Setup

### 🔹 1. Clone the Repository
```
bash
git clone https://github.com/Rishmo/Task-Manager-App.git
cd task-manager-app
```
---

### 🔹 2. Frontend Setup
```
bash
cd frontend
npm install
npm start
```
> Runs on `http://localhost:3000`

---

### 🔹 3. Backend Setup
```
bash
cd backend
npm install
node server.js
```
> Runs on `http://localhost:5000`

> ✅ No external database needed. It uses a local `db.json` file with:
```
json
{
  "users": [],
  "tasks": []
}
```

---

## 🔌 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint        | Description          |
|--------|-----------------|----------------------|
| POST   | `/api/register` | Register a new user  |
| POST   | `/api/login`    | Login a user         |

### 📋 Task Routes

| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| GET    | `/api/tasks/:userId`  | Fetch user's tasks      |
| POST   | `/api/tasks`          | Add a new task          |
| PUT    | `/api/tasks/:taskId`  | Mark task as complete   |
| DELETE | `/api/tasks/:taskId`  | Delete a task           |

---

## 💻 Usage

1. Register or log in with your email/password.
2. You’ll be redirected to the Dashboard.
3. Add tasks via the input form.
4. View tasks as colorful cards.
5. Mark them complete ✅ or delete 🗑️.
6. Click Logout 🔓 to end session.

---

## 🌟 Future Features (Ideas)

- Task editing functionality
- Calendar integration (e.g., Google Calendar)
- Notifications and reminders
- User profile & theming
- Dark mode 🌙

---

## 👨‍💻 Author

**[Moon Sahu]**  
Built with ❤️ for learning, productivity, and job applications.

> If you found this useful, give it a ⭐ on GitHub!

---

## 📣 Acknowledgements

Thanks to:
- React & Tailwind CSS community
- Vercel for hosting
- You, for checking it out 🙌
