import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, Briefcase, BookOpen, Mail, Users, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [services, setServices] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    fetchServices();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data.slice(0, 6)); // Limit to 6 for the dropdown
    } catch (error) {
      console.error('Error fetching services for navbar:', error);
    }
  };

  const navLinks = [
    { path: '/', label: 'Início', icon: <Home size={18} /> },
    { path: '/servicos', label: 'Serviços', icon: <Briefcase size={18} />, hasDropdown: true },
    { path: '/blog', label: 'Blog', icon: <BookOpen size={18} /> },
    { path: '/sobre-nos', label: 'Sobre Nós', icon: <Users size={18} /> },
    { path: '/contacto', label: 'Contacto', icon: <Mail size={18} /> },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <img src="https://res.cloudinary.com/dvcnfd5hw/image/upload/v1773134575/Gemini_Generated_Image_m2b2g5m2b2g5m2b2_ctfgjs.png" alt="XIGOTSO Logo" />
        </NavLink>

        <div className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </div>

        <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li
              key={link.path}
              className={link.hasDropdown ? 'nav-item-dropdown' : ''}
              onMouseEnter={() => link.hasDropdown && setShowDropdown(true)}
              onMouseLeave={() => link.hasDropdown && setShowDropdown(false)}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                {link.label}
                {link.hasDropdown && <ChevronDown size={14} className={`dropdown-arrow ${showDropdown ? 'rotated' : ''}`} />}
              </NavLink>

              {link.hasDropdown && (
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      className="dropdown-menu glass"
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <div className="dropdown-grid">
                        {services.map((service) => (
                          <NavLink
                            key={service.id}
                            to={`/servicos/${service.slug}`}
                            className="dropdown-item"
                            onClick={() => { setShowDropdown(false); setIsOpen(false); }}
                          >
                            <div className="item-icon">
                              <Sparkles size={16} />
                            </div>
                            <div className="item-info">
                              <span className="item-title">{service.title}</span>
                              <span className="item-desc">{service.category}</span>
                            </div>
                          </NavLink>
                        ))}
                        <NavLink to="/servicos" className="dropdown-footer" onClick={() => { setShowDropdown(false); setIsOpen(false); }}>
                          Ver todos os serviços <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />
                        </NavLink>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
