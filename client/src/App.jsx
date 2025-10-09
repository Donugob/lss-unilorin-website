import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // 1. Import AnimatePresence
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- COMPONENT IMPORTS ---
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition'; // 2. Import our wrapper

// --- PAGE IMPORTS ---
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import SingleEventPage from './pages/SingleEventPage';
import NewsPage from './pages/NewsPage';
import SinglePostPage from './pages/SinglePostPage';
import ContactPage from './pages/ContactPage';
import MaterialsPage from './pages/MaterialsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminEventsListPage from './pages/AdminEventsListPage';
import AdminEventEditPage from './pages/AdminEventEditPage';
import AdminPostsListPage from './pages/AdminPostsListPage';
import AdminPostEditPage from './pages/AdminPostEditPage';
import AdminExecutivesListPage from './pages/AdminExecutivesListPage';
import AdminExecutiveEditPage from './pages/AdminExecutiveEditPage';
import AdminMaterialsListPage from './pages/AdminMaterialsListPage';
import AdminMaterialEditPage from './pages/AdminMaterialEditPage';

// --- MAIN LAYOUT COMPONENT (UPDATED) ---
const AppLayout = () => {
  const location = useLocation(); // 3. Get the current location/URL

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <main>
        {/* 4. Use AnimatePresence and our PageTransition wrapper */}
        <AnimatePresence mode="wait">
          {/* We use location.pathname as a key to tell AnimatePresence that the page has changed */}
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
};

// ... (The rest of your App component with all the routes remains exactly the same)
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:id" element={<SingleEventPage />} />
          <Route path="news" an element={<NewsPage />} />
          <Route path="news/:slug" element={<SinglePostPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
        </Route>

        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route element={<ProtectedRoute />}>
          {/* We need a layout for the admin section too */}
          <Route element={<AppLayout />}>
             <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
             <Route path="/admin/events" element={<AdminEventsListPage />} />
             <Route path="/admin/event/new" element={<AdminEventEditPage />} />
             <Route path="/admin/event/:id/edit" element={<AdminEventEditPage />} />
             <Route path="/admin/posts" element={<AdminPostsListPage />} />
             <Route path="/admin/post/new" element={<AdminPostEditPage />} />
             <Route path="/admin/post/:id/edit" element={<AdminPostEditPage />} />
             <Route path="/admin/executives" element={<AdminExecutivesListPage />} />
             <Route path="/admin/executive/new" element={<AdminExecutiveEditPage />} />
             <Route path="/admin/executive/:id/edit" element={<AdminExecutiveEditPage />} />
             <Route path="/admin/materials" element={<AdminMaterialsListPage />} />
             <Route path="/admin/material/new" element={<AdminMaterialEditPage />} />
             <Route path="/admin/material/:id/edit" element={<AdminMaterialEditPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;