import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/Services';
import Portfolio from './pages/Portfolio';
import BlogPage from './pages/Blog';
import BlogDetailPage from './pages/BlogDetail';
import ShopPage from './pages/Shop';
import CoursesPage from './pages/Courses';
import ContactPage from './pages/Contact';
import PartnersPage from './pages/Partners';
import AboutPage from './pages/About';
import ServiceDetailPage from './pages/ServiceDetail';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogManager from './pages/admin/BlogManager';
import SettingsManager from './pages/admin/SettingsManager';
import ProductManager from './pages/admin/ProductManager';
import ServiceManager from './pages/admin/ServiceManager';
import LoginPage from './pages/auth/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import useAnalytics from './hooks/useAnalytics';
import './App.css';

function AppContent() {
  useAnalytics();
  return (
    <div className="app-container">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Navbar /><main className="main-content"><Home /></main><Footer /></>} />
        <Route path="/servicos" element={<><Navbar /><main className="main-content"><ServicesPage /></main><Footer /></>} />
        <Route path="/servicos/:slug" element={<><Navbar /><main className="main-content"><ServiceDetailPage /></main><Footer /></>} />
        <Route path="/portfolio" element={<><Navbar /><main className="main-content"><Portfolio /></main><Footer /></>} />
        <Route path="/blog" element={<><Navbar /><main className="main-content"><BlogPage /></main><Footer /></>} />
        <Route path="/blog/:slug" element={<><Navbar /><main className="main-content"><BlogDetailPage /></main><Footer /></>} />
        <Route path="/sobre-nos" element={<><Navbar /><main className="main-content"><AboutPage /></main><Footer /></>} />
        <Route path="/loja" element={<><Navbar /><main className="main-content"><ShopPage /></main><Footer /></>} />
        <Route path="/cursos" element={<><Navbar /><main className="main-content"><CoursesPage /></main><Footer /></>} />
        <Route path="/parceiros" element={<><Navbar /><main className="main-content"><PartnersPage /></main><Footer /></>} />
        <Route path="/contacto" element={<><Navbar /><main className="main-content"><ContactPage /></main><Footer /></>} />

        {/* Auth Route */}
        <Route path="/login/acess/admin" element={<LoginPage />} />

        {/* Admin Routes (Protected) */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="stats" element={<AdminDashboard />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="servicos" element={<ServiceManager />} />
            <Route path="settings" element={<SettingsManager />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
