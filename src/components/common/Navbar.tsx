import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { ROUTES } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: ROUTES.HOME },
    { name: 'Products', path: ROUTES.PRODUCTS },
    { name: 'Gallery', path: ROUTES.GALLERY },
    { name: 'About', path: ROUTES.ABOUT },
    { name: 'Services', path: ROUTES.SERVICES },
    { name: 'Contact', path: ROUTES.CONTACT }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary-blue">
              UCCO<span className="text-primary-orange">PAINTS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-primary-blue border-b-2 border-primary-blue'
                    : 'text-gray-700 hover:text-primary-blue'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Admin Button */}
          <div className="hidden md:flex items-center">
            {user ? (
              <Link
                to={ROUTES.ADMIN_DASHBOARD}
                className="flex items-center space-x-2 px-5 py-2 rounded-full text-white bg-purple-600 hover:bg-purple-700 shadow-md transition-colors"
              >
                <FaUser />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                to={ROUTES.ADMIN_LOGIN}
                className="flex items-center space-x-2 btn-outline"
              >
                <FaUser />
                <span>Admin Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl text-gray-700 focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b">
            <span className="text-xl font-bold text-primary-blue">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium py-2 transition-colors ${
                  isActive(link.path)
                    ? 'text-primary-blue'
                    : 'text-gray-700 hover:text-primary-blue'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t">
              {user ? (
                <Link
                  to={ROUTES.ADMIN_DASHBOARD}
                  className="flex items-center justify-center space-x-2 w-full px-5 py-2 rounded-full text-white bg-purple-600 hover:bg-purple-700 shadow-md transition-colors"
                >
                  <FaUser />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link
                  to={ROUTES.ADMIN_LOGIN}
                  className="flex items-center justify-center space-x-2 btn-outline w-full"
                >
                  <FaUser />
                  <span>Admin Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
