import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaImage } from 'react-icons/fa';
import { getDocuments, addDocument, deleteDocument } from '../../firebase/firestore';
import { uploadImage } from '../../firebase/storage';
import LoadingSpinner from '../common/LoadingSpinner';

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
}

interface ImagePreview {
  file: File;
  preview: string;
  title: string;
  description: string;
}

const GalleryManager: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isActive: true,
    imageFiles: [] as File[],
    imageUrl: ''
  });

  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const data = await getDocuments('gallery', []);
      setImages(data as GalleryImage[]);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      toast.error('Failed to fetch gallery images');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPreviews: ImagePreview[] = files.map((file, index) => ({
      file,
      preview: URL.createObjectURL(file),
      title: formData.title || `Gallery Image ${imagePreviews.length + index + 1}`,
      description: formData.description || ''
    }));

    setImagePreviews([...imagePreviews, ...newPreviews]);
    setFormData({ ...formData, imageFiles: [...formData.imageFiles, ...files] });
  };

  const removePreview = (index: number) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newFiles = formData.imageFiles.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    setFormData({ ...formData, imageFiles: newFiles });
  };

  const updatePreviewData = (index: number, field: 'title' | 'description', value: string) => {
    const newPreviews = [...imagePreviews];
    newPreviews[index][field] = value;
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (imagePreviews.length === 0 && !formData.imageUrl) {
      toast.error('Please select at least one image or enter image URL');
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      if (formData.imageUrl) {
        // Single URL upload
        const galleryData = {
          imageUrl: formData.imageUrl,
          title: formData.title || 'Gallery Image',
          description: formData.description || '',
          isActive: formData.isActive
        };
        await addDocument('gallery', galleryData);
        toast.success('Image added to gallery successfully!');
      } else {
        // Multiple file uploads
        const totalImages = imagePreviews.length;
        let uploadedCount = 0;

        for (const preview of imagePreviews) {
          const imageUrl = await uploadImage(preview.file, 'gallery', (progress) => {
            const overallProgress = ((uploadedCount + progress / 100) / totalImages) * 100;
            setUploadProgress(Math.round(overallProgress));
          });

          const galleryData = {
            imageUrl,
            title: preview.title,
            description: preview.description,
            isActive: formData.isActive
          };

          await addDocument('gallery', galleryData);
          uploadedCount++;
        }

        toast.success(`${totalImages} image(s) added to gallery successfully!`);
      }

      resetForm();
      fetchImages();
    } catch (error) {
      console.error('Error adding image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to add image';
      toast.error(errorMessage);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (image: GalleryImage) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      await deleteDocument('gallery', image.id);
      toast.success('Image deleted successfully!');
      fetchImages();
    } catch (error) {
      toast.error('Failed to delete image');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      isActive: true,
      imageFiles: [],
      imageUrl: ''
    });
    setImagePreviews([]);
    setShowForm(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gallery Management</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="btn-primary flex items-center space-x-2 h-12 px-4 sm:px-6"
        >
          <FaPlus />
          <span className="hidden sm:inline">Add Image</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Add New Image</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images (Multiple)</label>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-600">Select Image Files (Hold Ctrl/Cmd for multiple)</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="input-field h-12"
                  />
                </div>
                <div className="text-center text-gray-500 text-sm">OR</div>
                <div>
                  <label className="text-xs text-gray-600">Enter Image URL (Single)</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="input-field h-12"
                  />
                </div>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-4 space-y-4">
                  <h3 className="font-semibold text-gray-700">Selected Images ({imagePreviews.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="border rounded-lg p-3 bg-gray-50">
                        <div className="flex gap-3">
                          <img src={preview.preview} alt="Preview" className="w-20 h-20 object-cover rounded" />
                          <div className="flex-1 space-y-2">
                            <input
                              type="text"
                              value={preview.title}
                              onChange={(e) => updatePreviewData(index, 'title', e.target.value)}
                              placeholder="Image Title"
                              className="input-field h-10 text-sm"
                            />
                            <input
                              type="text"
                              value={preview.description}
                              onChange={(e) => updatePreviewData(index, 'description', e.target.value)}
                              placeholder="Description (optional)"
                              className="input-field h-10 text-sm"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removePreview(index)}
                            className="text-red-600 hover:text-red-800 h-8 w-8 flex items-center justify-center"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formData.imageUrl && imagePreviews.length === 0 && (
                <div className="mt-4">
                  <img src={formData.imageUrl} alt="Preview" className="h-32 object-cover rounded" />
                  <div className="mt-2 space-y-2">
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Image Title"
                      className="input-field h-10"
                    />
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Description (optional)"
                      className="input-field h-10"
                    />
                  </div>
                </div>
              )}
            </div>
            {uploading && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-blue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button type="submit" disabled={uploading} className="btn-primary h-12 w-full sm:w-auto">
                {uploading ? `Uploading... ${uploadProgress}%` : imagePreviews.length > 0 ? `Upload ${imagePreviews.length} Image(s)` : 'Add to Gallery'}
              </button>
              <button type="button" onClick={resetForm} className="btn-outline h-12 w-full sm:w-auto">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {images.map((image) => (
          <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative aspect-square">
              <img 
                src={image.imageUrl} 
                alt={image.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => handleDelete(image)}
                  className="bg-red-600 text-white p-2 sm:p-3 rounded-full hover:bg-red-700 transition-colors shadow-lg"
                >
                  <FaTrash className="text-sm sm:text-base" />
                </button>
              </div>
              {!image.isActive && (
                <div className="absolute top-2 left-2">
                  <span className="badge badge-error">Inactive</span>
                </div>
              )}
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{image.title}</h3>
              {image.description && (
                <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{image.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <FaImage className="mx-auto text-6xl text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No images in gallery yet</p>
          <button 
            onClick={() => setShowForm(true)} 
            className="btn-primary mt-4 h-12 px-6"
          >
            Add First Image
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
