import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaHome, FaImage, FaThLarge, FaBoxOpen, FaImages, FaEnvelope, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { logoutUser } from '../../firebase/auth';
import { ROUTES } from '../../utils/constants';

interface AdminSidebarProps {
  onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/admin/dashboard/banners', icon: FaImage, label: 'Banners' },
    { path: '/admin/dashboard/categories', icon: FaThLarge, label: 'Categories' },
    { path: '/admin/dashboard/products', icon: FaBoxOpen, label: 'Products' },
    { path: '/admin/dashboard/gallery', icon: FaImages, label: 'Gallery' },
    { path: '/admin/dashboard/inquiries', icon: FaEnvelope, label: 'Inquiries' },
  ];

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success('Logged out successfully');
      navigate(ROUTES.ADMIN_LOGIN);
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary-blue">
            UCCO<span className="text-primary-orange">PAINTS</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-gray-600 hover:text-gray-900">
            <FaTimes size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-blue text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                end={item.path === '/admin/dashboard'}
              >
                <item.icon className="text-xl" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
        >
          <FaSignOutAlt className="text-xl" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
