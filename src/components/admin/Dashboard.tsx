import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaThLarge, FaEnvelope, FaExclamationCircle } from 'react-icons/fa';
import { getDocuments } from '../../firebase/firestore';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    inquiries: 0,
    newInquiries: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, categories, inquiries] = await Promise.all([
          getDocuments('products'),
          getDocuments('categories'),
          getDocuments('inquiries')
        ]);

        const newInquiries = inquiries.filter((inq: any) => inq.status === 'new').length;

        setStats({
          products: products.length,
          categories: categories.length,
          inquiries: inquiries.length,
          newInquiries
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.products,
      icon: FaBoxOpen,
      color: 'bg-blue-500',
      link: '/admin/dashboard/products'
    },
    {
      title: 'Categories',
      value: stats.categories,
      icon: FaThLarge,
      color: 'bg-green-500',
      link: '/admin/dashboard/categories'
    },
    {
      title: 'Total Inquiries',
      value: stats.inquiries,
      icon: FaEnvelope,
      color: 'bg-purple-500',
      link: '/admin/dashboard/inquiries'
    },
    {
      title: 'New Inquiries',
      value: stats.newInquiries,
      icon: FaExclamationCircle,
      color: 'bg-red-500',
      link: '/admin/dashboard/inquiries'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to UCCOPAINTS Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-4 rounded-lg`}>
                <stat.icon className="text-white text-2xl" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/dashboard/products"
            className="btn-primary text-center"
          >
            Add New Product
          </Link>
          <Link
            to="/admin/dashboard/categories"
            className="btn-secondary text-center"
          >
            Add New Category
          </Link>
          <Link
            to="/admin/dashboard/inquiries"
            className="btn-outline text-center"
          >
            View All Inquiries
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
