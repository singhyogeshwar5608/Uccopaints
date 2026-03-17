import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ROUTES } from './utils/constants';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingButtons from './components/common/FloatingButtons';
import LoadingSpinner from './components/common/LoadingSpinner';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Gallery from './pages/Gallery';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!user) {
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  return <>{children}</>;
};

// Public Route (redirect if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (user) {
    return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
  }

  return <>{children}</>;
};

// Main Layout
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path={ROUTES.HOME}
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path={ROUTES.PRODUCTS}
            element={
              <MainLayout>
                <Products />
              </MainLayout>
            }
          />
          <Route
            path={ROUTES.PRODUCT_DETAIL}
            element={
              <MainLayout>
                <ProductDetail />
              </MainLayout>
            }
          />
          <Route
            path={ROUTES.ABOUT}
            element={
              <MainLayout>
                <AboutUs />
              </MainLayout>
            }
          />
          <Route
            path={ROUTES.SERVICES}
            element={
              <MainLayout>
                <Services />
              </MainLayout>
            }
          />
          <Route
            path={ROUTES.CONTACT}
            element={
              <MainLayout>
                <ContactUs />
              </MainLayout>
            }
          />
          <Route
            path={ROUTES.GALLERY}
            element={
              <MainLayout>
                <Gallery />
              </MainLayout>
            }
          />

          {/* Admin Routes */}
          <Route
            path={ROUTES.ADMIN_LOGIN}
            element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            }
          />
          <Route
            path={`${ROUTES.ADMIN_DASHBOARD}/*`}
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <MainLayout>
                <NotFound />
              </MainLayout>
            }
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
