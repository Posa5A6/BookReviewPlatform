import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import ReviewForm from './pages/ReviewForm';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

import AdminLogin from './pages/AdminLogin';               // ⬅️ added
import AdminDashboard from './pages/AdminDashboard';       // ⬅️ added
import RequireAdmin from './components/RequireAdmin';      // ⬅️ guard

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './App.css';     // main styles
//import './Auth.css';    // ⬅️ form validation styles

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/reviews/:id" element={<ReviewForm />} />

        {/* Review form (protect later for logged-in users) */}
        <Route path="/books/:id/review" element={<ReviewForm />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} /> {/* ⬅️ admin login */}

        {/* Profile (user must be logged in—protect later) */}
        <Route path="/profile" element={<Profile />} />

        {/* Admin protected routes */}
        <Route element={<RequireAdmin />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* add more admin routes here if needed */}
        </Route>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
