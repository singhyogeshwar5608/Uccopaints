import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import Dashboard from '../../components/admin/Dashboard';
import BannerManager from '../../components/admin/BannerManager';
import CategoryManager from '../../components/admin/CategoryManager';
import ProductManager from '../../components/admin/ProductManager';
import GalleryManager from '../../components/admin/GalleryManager';
import InquiryManager from '../../components/admin/InquiryManager';

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="banners" element={<BannerManager />} />
        <Route path="categories" element={<CategoryManager />} />
        <Route path="products" element={<ProductManager />} />
        <Route path="gallery" element={<GalleryManager />} />
        <Route path="inquiries" element={<InquiryManager />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
