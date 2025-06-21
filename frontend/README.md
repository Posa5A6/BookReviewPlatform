# 📚 BookReview Platform – Frontend

A modern and responsive web interface for browsing, reviewing, and managing books. Built with **React**, **Framer Motion**, and a clean UI experience for both users and admins.

---

## 🌐 Live Demo

🚀 [Coming Soon – Deploy via Vercel/Netlify]

---

## 📁 Project Structure

```

📦 frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── axios.js         # Axios config
│   │   └── bookApi.js       # Book API handlers
│   ├── components/
│   │   └── Navbar.jsx       # Responsive nav
│   ├── context/
│   │   └── AuthContext.jsx  # Auth state & provider
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── BookDetails.jsx
│   │   ├── BookList.jsx
│   │   ├── Books.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   └── ReviewForm.jsx
│   ├── App.js
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md

```

---

## ✨ Features

✅ **Responsive Design** with modern layout  
✅ **Framer Motion** page transitions  
✅ **Loading Spinners** on all data fetches  
✅ **Book Reviews** (2-column cards layout)  
✅ **Price Display** – always shows `Free`  
✅ **Conditional Links** in description (or "Update Soon")  
✅ **Only Users** can write reviews (admins are restricted)  
✅ **Search & Filter** books by title/author  
✅ **Pagination** for performance  
✅ **Role-Based Navbar** (admin/user)  
✅ **Clean Animations & UI** with full mobile support

---

## 🛠️ Built With

- **React.js** (v18+)
- **React Router DOM**
- **Framer Motion**
- **Axios**
- **CSS3** (Custom modern styling)
- **React Context API** (for auth state)

---

## 🔧 Installation

```bash
# Clone the project
git clone https://github.com/your-username/bookreview-frontend.git
cd bookreview-frontend

# Install dependencies
npm install

# Start the frontend
npm start
```

🌐 Open in browser: [http://localhost:3000](http://localhost:3000)

---

## 📦 Environment Variables

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Ensure your `axios.js` points to `process.env.REACT_APP_API_URL`.

---

## 📌 Key Routes

| Route               | Description                 |
| ------------------- | --------------------------- |
| `/`                 | Home (Explore books)        |
| `/books`            | List of all books           |
| `/books/:id`        | Book details + reviews      |
| `/books/:id/review` | Submit a review (User only) |
| `/login`            | User login                  |
| `/register`         | New user registration       |
| `/admin-login`      | Admin login                 |
| `/profile`          | User profile                |
| `/admin/dashboard`  | Admin dashboard & controls  |

---

## 🔐 Authentication

- Uses **Basic Auth** headers via `Authorization`
- Credentials stored securely in `localStorage`
- Auto-injects headers with every Axios call
- Handles protected routes and logout
- Auto re-login after refresh (if session valid)

---

## 🎨 UI Highlights

- 💫 Smooth animations on every page
- 📦 Book cards with hover effects
- 🔎 Live filtering for books
- 🧾 Review cards in 2-column format
- 📱 Mobile responsive + touch friendly

---

## 📷 Screenshots

> Add UI snapshots here once deployed!

---

## 🧠 Future Improvements

- Dark Mode toggle
- Book categories & genres
- Upload book PDFs
- Like/upvote reviews
- Admin controls for review moderation

---

## 👨‍💻 Author

**Narendra Posa**
📧 [narisnarendras6@gmail.com](mailto:narisnarendras6@gmail.com)
📱 +91 9014293910

---

## 📄 License

This project is free and open-source for learning and educational purposes.

---

## ⭐️ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!

```


```
