import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { getDocuments, addDocument, updateDocument, deleteDocument } from '../../firebase/firestore';
import { uploadImage, deleteImage } from '../../firebase/storage';
import { generateSlug } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
}

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    order: 1,
    isActive: true,
    imageFile: null as File | null,
    imageUrl: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getDocuments('categories', []);
      const sortedData = (data as Category[]).sort((a, b) => a.order - b.order);
      setCategories(sortedData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageFile && !formData.imageUrl && !editingCategory) {
      toast.error('Please select an image or enter image URL');
      return;
    }

    try {
      setUploading(true);
      let imageUrl = editingCategory?.imageUrl || '';

      if (formData.imageFile) {
        imageUrl = await uploadImage(formData.imageFile, 'categories');
      } else if (formData.imageUrl) {
        imageUrl = formData.imageUrl;
      }

      const categoryData = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        description: formData.description,
        order: formData.order,
        isActive: formData.isActive,
        imageUrl
      };

      if (editingCategory) {
        await updateDocument('categories', editingCategory.id, categoryData);
        toast.success('Category updated successfully!');
      } else {
        await addDocument('categories', categoryData);
        toast.success('Category added successfully!');
      }

      resetForm();
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save category';
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      order: category.order,
      isActive: category.isActive,
      imageFile: null,
      imageUrl: ''
    });
    setShowForm(true);
  };

  const handleDelete = async (category: Category) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await deleteImage(category.imageUrl);
      await deleteDocument('categories', category.id);
      toast.success('Category deleted successfully!');
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      order: 1,
      isActive: true,
      imageFile: null,
      imageUrl: ''
    });
    setEditingCategory(null);
    setShowForm(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center space-x-2">
          <FaPlus />
          <span>Add Category</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label className="flex items-center space-x-2 cursor-pointer mt-8">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Image</label>
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
              {editingCategory && !formData.imageFile && !formData.imageUrl && (
                <img src={editingCategory.imageUrl} alt="Current" className="mt-2 h-32 object-cover rounded" />
              )}
              {formData.imageUrl && (
                <img src={formData.imageUrl} alt="Preview" className="mt-2 h-32 object-cover rounded" />
              )}
            </div>
            <div className="flex space-x-4">
              <button type="submit" disabled={uploading} className="btn-primary">
                {uploading ? 'Saving...' : 'Save Category'}
              </button>
              <button type="button" onClick={resetForm} className="btn-outline">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={category.imageUrl} alt={category.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className={`badge ${category.isActive ? 'badge-success' : 'badge-error'}`}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(category)} className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(category)} className="text-red-600 hover:text-red-800">
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

export default CategoryManager;
