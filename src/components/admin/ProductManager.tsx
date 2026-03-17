import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { getDocuments, addDocument, updateDocument, deleteDocument } from '../../firebase/firestore';
import { uploadImage } from '../../firebase/storage';
import { generateSlug } from '../../utils/helpers';
import LoadingSpinner from '../common/LoadingSpinner';

interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  description: string;
  shortDescription: string;
  mainImage: string;
  isActive: boolean;
  isFeatured: boolean;
}

interface Category {
  id: string;
  name: string;
}

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    categoryId: '',
    description: '',
    shortDescription: '',
    isActive: true,
    isFeatured: false,
    imageFile: null as File | null,
    imageUrl: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        getDocuments('products', []),
        getDocuments('categories', [])
      ]);
      setProducts(productsData as Product[]);
      setCategories(categoriesData as Category[]);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageFile && !formData.imageUrl && !editingProduct) {
      toast.error('Please select an image or enter image URL');
      return;
    }

    try {
      setUploading(true);
      let mainImage = editingProduct?.mainImage || '';

      if (formData.imageFile) {
        mainImage = await uploadImage(formData.imageFile, 'products');
      } else if (formData.imageUrl) {
        mainImage = formData.imageUrl;
      }

      const category = categories.find(c => c.id === formData.categoryId);
      const productData = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        categoryId: formData.categoryId,
        categoryName: category?.name || '',
        description: formData.description,
        shortDescription: formData.shortDescription,
        mainImage,
        images: [mainImage],
        features: [],
        specifications: {},
        isActive: formData.isActive,
        isFeatured: formData.isFeatured
      };

      if (editingProduct) {
        await updateDocument('products', editingProduct.id, productData);
        toast.success('Product updated successfully!');
      } else {
        await addDocument('products', productData);
        toast.success('Product added successfully!');
      }

      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error saving product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save product';
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      categoryId: product.categoryId,
      description: product.description,
      shortDescription: product.shortDescription,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      imageFile: null,
      imageUrl: ''
    });
    setShowForm(true);
  };

  const handleDelete = async (product: Product) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteDocument('products', product.id);
      toast.success('Product deleted successfully!');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      categoryId: '',
      description: '',
      shortDescription: '',
      isActive: true,
      isFeatured: false,
      imageFile: null,
      imageUrl: ''
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center space-x-2">
          <FaPlus />
          <span>Add Product</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="input-field"
                maxLength={100}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
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
              {editingProduct && !formData.imageFile && !formData.imageUrl && (
                <img src={editingProduct.mainImage} alt="Current" className="mt-2 h-32 object-cover rounded" />
              )}
              {formData.imageUrl && (
                <img src={formData.imageUrl} alt="Preview" className="mt-2 h-32 object-cover rounded" />
              )}
            </div>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-gray-700">Featured</span>
              </label>
            </div>
            <div className="flex space-x-4">
              <button type="submit" disabled={uploading} className="btn-primary">
                {uploading ? 'Saving...' : 'Save Product'}
              </button>
              <button type="button" onClick={resetForm} className="btn-outline">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <img src={product.mainImage} alt={product.name} className="h-12 w-12 object-cover rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.shortDescription}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{product.categoryName}</td>
                <td className="px-6 py-4">
                  <span className={`badge ${product.isActive ? 'badge-success' : 'badge-error'}`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-900 mr-4">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(product)} className="text-red-600 hover:text-red-900">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManager;
