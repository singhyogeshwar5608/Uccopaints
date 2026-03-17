import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaImage } from 'react-icons/fa';
import { getDocuments, addDocument, updateDocument, deleteDocument } from '../../firebase/firestore';
import { uploadImage, deleteImage } from '../../firebase/storage';
import LoadingSpinner from '../common/LoadingSpinner';

interface Banner {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  order: number;
  isActive: boolean;
}

const BannerManager: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    order: 1,
    isActive: true,
    imageFile: null as File | null,
    imageUrl: ''
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const data = await getDocuments('banners', []);
      const sortedData = (data as Banner[]).sort((a, b) => a.order - b.order);
      setBanners(sortedData);
    } catch (error) {
      console.error('Error fetching banners:', error);
      toast.error('Failed to fetch banners');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageFile && !formData.imageUrl && !editingBanner) {
      toast.error('Please select an image or enter image URL');
      return;
    }

    try {
      setUploading(true);
      let imageUrl = editingBanner?.imageUrl || '';

      if (formData.imageFile) {
        imageUrl = await uploadImage(formData.imageFile, 'banners');
      } else if (formData.imageUrl) {
        imageUrl = formData.imageUrl;
      }

      const bannerData = {
        title: formData.title,
        subtitle: formData.subtitle,
        order: formData.order,
        isActive: formData.isActive,
        imageUrl
      };

      if (editingBanner) {
        await updateDocument('banners', editingBanner.id, bannerData);
        toast.success('Banner updated successfully!');
      } else {
        await addDocument('banners', bannerData);
        toast.success('Banner added successfully!');
      }

      resetForm();
      fetchBanners();
    } catch (error) {
      console.error('Error saving banner:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save banner';
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      order: banner.order,
      isActive: banner.isActive,
      imageFile: null,
      imageUrl: ''
    });
    setShowForm(true);
  };

  const handleDelete = async (banner: Banner) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;

    try {
      await deleteImage(banner.imageUrl);
      await deleteDocument('banners', banner.id);
      toast.success('Banner deleted successfully!');
      fetchBanners();
    } catch (error) {
      toast.error('Failed to delete banner');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      order: 1,
      isActive: true,
      imageFile: null,
      imageUrl: ''
    });
    setEditingBanner(null);
    setShowForm(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Banner Management</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center space-x-2">
          <FaPlus />
          <span>Add Banner</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingBanner ? 'Edit Banner' : 'Add New Banner'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="input-field"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-600">Upload Image File</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, imageFile: e.target.files?.[0] || null, imageUrl: '' })}
                    className="input-field"
                  />
                </div>
                <div className="text-center text-gray-500 text-sm">OR</div>
                <div>
                  <label className="text-xs text-gray-600">Enter Image URL</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value, imageFile: null })}
                    placeholder="https://example.com/image.jpg"
                    className="input-field"
                  />
                </div>
              </div>
              {editingBanner && !formData.imageFile && !formData.imageUrl && (
                <img src={editingBanner.imageUrl} alt="Current" className="mt-2 h-32 object-cover rounded" />
              )}
              {formData.imageUrl && (
                <img src={formData.imageUrl} alt="Preview" className="mt-2 h-32 object-cover rounded" />
              )}
            </div>
            <div className="flex space-x-4">
              <button type="submit" disabled={uploading} className="btn-primary">
                {uploading ? 'Saving...' : 'Save Banner'}
              </button>
              <button type="button" onClick={resetForm} className="btn-outline">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={banner.imageUrl} alt={banner.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{banner.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{banner.subtitle}</p>
              <div className="flex items-center justify-between">
                <span className={`badge ${banner.isActive ? 'badge-success' : 'badge-error'}`}>
                  {banner.isActive ? 'Active' : 'Inactive'}
                </span>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(banner)} className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(banner)} className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerManager;
