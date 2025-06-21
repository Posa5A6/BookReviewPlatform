
## 📚 Book Review Platform – Backend

A full-featured backend API for a book review platform where:

* ✅ Users can browse and review books.
* ✅ Admins can manage books and review activities.
* Built with **Node.js**, **Express**, and **MongoDB** using **RESTful APIs** and **session-based authentication**.

---

## 🔧 Table of Contents

* [📌 Features](#-features)
* [📁 Project Structure](#-project-structure)
* [🧪 Tech Stack](#-tech-stack)
* [🛠️ Setup Instructions](#-setup-instructions)
* [🚀 Running the Server](#-running-the-server)
* [🧪 Test Cases](#-test-cases)
* [🔐 API Endpoints](#-api-endpoints)
* [📂 Environment Variables](#-environment-variables)
* [📦 Dependencies](#-dependencies)
* [📄 License](#-license)

---

## 📌 Features

### 👤 User

* Register and Login (Session-based)
* View all books
* View book details with reviews
* Submit reviews
* View and update user profile

### 🛡️ Admin

* Login
* Add/Delete books
* View all users
* View all reviews

---

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── adminController.js    # Admin functionality
│   ├── authController.js     # User/Auth logic
│   ├── bookController.js     # Book routes logic
│   ├── reviewController.js   # Review logic
│   └── userController.js     # Profile fetch/update
├── middleware/
│   └── errorMiddleware.js    # 404 and error handler
├── models/
│   ├── bookModel.js
│   ├── reviewModel.js
│   └── userModel.js
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   ├── reviewRoutes.js
│   └── userRoutes.js
├── utils/
│   └── generateToken.js      # (Optional JWT token generator)
├── seedAdmin.js              # Script to add admin
├── .env                      # Environment config
├── server.js                 # Main Express app
└── package.json
```

---

## 🧪 Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose
* **Authentication**: Sessions (using `express-session`)
* **Testing**: Postman

---

## 🛠️ Setup Instructions

### 1. **Clone the repository**

```bash
git clone <your-repo-url>
cd book-review-platform/backend
```

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Setup environment variables**

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookplatform
SESSION_SECRET=yourSecretKey
```

### 4. **Seed Admin (Optional)**

```bash
node seedAdmin.js
```

---

## 🚀 Running the Server

```bash
npm run dev
```

Visit: `http://localhost:5000/`

---

## 🧪 Test Cases (via Postman)

### 🧍‍♂️ User Test Cases

| # | Description    | Method | Endpoint             |
| - | -------------- | ------ | -------------------- |
| 1 | Register       | POST   | `/api/auth/register` |
| 2 | Login          | POST   | `/api/auth/login`    |
| 3 | View Books     | GET    | `/api/books`         |
| 4 | View Book      | GET    | `/api/books/:id`     |
| 5 | Submit Review  | POST   | `/api/reviews`       |
| 6 | View Profile   | GET    | `/api/users/:id`     |
| 7 | Update Profile | PUT    | `/api/users/:id`     |
| 8 | Logout         | POST   | `/api/auth/logout`   |

### 👨‍💼 Admin Test Cases

| # | Description  | Method | Endpoint               |
| - | ------------ | ------ | ---------------------- |
| 1 | Login        | POST   | `/api/auth/admin`      |
| 2 | Add Book     | POST   | `/api/admin/books`     |
| 3 | Delete Book  | DELETE | `/api/admin/books/:id` |
| 4 | View Users   | GET    | `/api/admin/users`     |
| 5 | View Reviews | GET    | `/api/admin/reviews`   |

✅ Use Postman → Enable **cookies** to test user session
✅ Admin doesn’t require JWT tokens (simplified based on requirement)

---

## 🔐 API Authentication Summary

* **Users** use **Session Auth** (express-session + cookies)
* **Admins** login with credentials (protected routes without JWT)

---

## 📂 Environment Variables

Create `.env` with:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookplatform
SESSION_SECRET=yourSecretKey
=======
# 📚 Book Review Platform

A full-stack web application for browsing, reviewing, and managing books. Built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js), this platform supports user registration, role-based access, book browsing, review submissions, and admin management.

---

## 🔗 Live Demo

🌐 **Coming Soon** (Deploy on [Vercel](https://vercel.com) for frontend, [Render](https://render.com) or [Railway](https://railway.app) for backend)

---

## 🧱 Tech Stack

| Layer        | Technology                       |
|-------------|----------------------------------|
| Frontend    | React.js, CSS3, Framer Motion    |
| Backend     | Node.js, Express.js              |
| Database    | MongoDB (Mongoose)               |
| Auth        | Basic Auth (Username:Password)   |
| State Mgmt  | React Context API                |
| Deployment  | Vercel, Render, Railway          |

---

## 📁 Folder Structure

```

📦 book-review-platform/
├── client/                 # React frontend
│   ├── src/
│   └── package.json
├── server/                 # Node + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
└── README.md

````

---

## ✨ Features

### 🔓 Authentication
- User and Admin login (Basic Auth)
- Secure routes based on roles
- JWT-free design using `Authorization` header

### 👤 Users
- Register and log in securely
- View and search books by title or author
- Write reviews (rating + comment)
- See all their submitted reviews

### 🧑‍💼 Admins
- Login as admin
- Add/update/delete books
- View all users and reviews
- Role-based dashboard

### 📚 Books
- View list with pagination
- View individual book details
- Each book is marked as `Free`
- Link to book available in description (or "Link updating soon")

### ⭐ Reviews
- Shown in **two-column layout**
- Displays name, rating (⭐), date, and comment
- Only users can post reviews — admin is restricted

### 🎨 UI/UX
- Smooth animations with **Framer Motion**
- Spinner for loading states
- Responsive and modern design
- Clean navbar with dynamic links

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/book-review-platform.git
cd book-review-platform
````

### 2️⃣ Start Backend

```bash
cd server
npm install
npm run dev
```

Configure `.env` in `server/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookreview
```

### 3️⃣ Start Frontend

```bash
cd ../client
npm install
npm start
```

Configure `.env` in `client/`:

```env
REACT_APP_API_URL=http://localhost:5000/api
>>>>>>> 75499e7f4b0e49c17c38bf0f3660e6f5321e601d
```

---

<<<<<<< HEAD
## 📦 Dependencies

* `express`
* `mongoose`
* `dotenv`
* `express-session`
* `connect-mongo`
* `cors`
* `bcryptjs`
* `express-async-handler`
* `nodemon` (dev)

---

## ✅ Status

* 🔨 Backend API – **Completed**
* ✅ Admin & User Test Cases – **Passed**
* 🔜 Frontend (React) – **Coming up next**
=======
## 🔑 Default Roles

```bash
Admin:
  email: admin@example.com
  password: password123

User:
  Register from frontend / login with existing user
```

---

## 📌 Key Routes

### Frontend

| Route               | Access     | Description       |
| ------------------- | ---------- | ----------------- |
| `/books`            | Public     | Browse all books  |
| `/books/:id`        | Public     | View book details |
| `/books/:id/review` | User only  | Write a review    |
| `/login`            | Public     | User login        |
| `/admin-login`      | Public     | Admin login       |
| `/register`         | Public     | User registration |
| `/profile`          | User only  | View user profile |
| `/admin/dashboard`  | Admin only | Admin dashboard   |

---

## 📷 Screenshots

> Include screenshots here after deployment.

---

## 🚀 Deployment Tips

* **Frontend**: Use [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
* **Backend**: Use [Render](https://render.com), [Railway](https://railway.app), or \[MongoDB Atlas] for remote DB
* Be sure to update API URLs in `.env` and `axios.js`

---

## 🙋 Support

**Narendra Posa**
📧 [narisnarendras6@gmail.com](mailto:narisnarendras6@gmail.com)
📱 +91 9014293910
>>>>>>> 75499e7f4b0e49c17c38bf0f3660e6f5321e601d

---

## 📄 License

<<<<<<< HEAD
This project is for learning and development purposes. Use freely with attribution.

---
=======
This project is open-source and available under the [MIT License](LICENSE).

---

## ⭐️ Star the Repository

If you found this helpful, please consider giving it a ⭐ on GitHub!

```
>>>>>>> 75499e7f4b0e49c17c38bf0f3660e6f5321e601d
