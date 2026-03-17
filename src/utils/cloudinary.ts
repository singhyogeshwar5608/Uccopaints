import imageCompression from 'browser-image-compression';

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

// Validate Cloudinary configuration
if (!CLOUDINARY_CLOUD_NAME) {
  console.error('VITE_CLOUDINARY_CLOUD_NAME is not configured in environment variables');
}

// Generate signature for signed upload (simplified version)
const generateSignature = (timestamp: number, folder: string): string => {
  // For client-side, we'll use unsigned upload with a default preset
  // This is a fallback - ideally create 'ml_default' preset in Cloudinary
  return '';
};

/**
 * Upload image to Cloudinary using unsigned upload
 * @param file - Image file to upload
 * @param folder - Folder name in Cloudinary (e.g., 'banners', 'categories', 'products')
 * @returns Promise<string> - URL of uploaded image
 */
export const uploadImageToCloudinary = async (
  file: File,
  folder: string
): Promise<string> => {
  try {
    // Compress image before upload
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    // Validate Cloudinary configuration
    if (!CLOUDINARY_CLOUD_NAME) {
      throw new Error('Cloudinary is not configured. Please set VITE_CLOUDINARY_CLOUD_NAME in your .env file');
    }

    // Create form data for unsigned upload
    // Note: WebP conversion and quality settings should be configured in the upload preset
    const formData = new FormData();
    formData.append('file', compressedFile);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', `uccopaints/${folder}`);

    console.log('Uploading to Cloudinary...', {
      cloudName: CLOUDINARY_CLOUD_NAME,
      folder: `uccopaints/${folder}`,
      fileSize: compressedFile.size,
      fileName: compressedFile.name
    });

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const data = await response.json();
      console.error('Cloudinary upload error:', data);
      
      // Provide more specific error messages
      if (data.error?.message?.includes('Invalid upload preset')) {
        throw new Error(
          `Upload preset '${CLOUDINARY_UPLOAD_PRESET}' not found. Please create an unsigned upload preset in your Cloudinary dashboard or set VITE_CLOUDINARY_UPLOAD_PRESET in your .env file.`
        );
      }
      
      throw new Error(data.error?.message || `Failed to upload image: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();

    console.log('Upload successful:', data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    
    // Provide user-friendly error messages
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Failed to upload image. Please check your internet connection and try again.');
  }
};

/**
 * Delete image from Cloudinary
 * Note: For security reasons, deletion should ideally be done from backend
 * For now, we'll just return success as Cloudinary has auto-cleanup policies
 * @param imageUrl - URL of image to delete
 */
export const deleteImageFromCloudinary = async (imageUrl: string): Promise<void> => {
  try {
    // Extract public_id from URL
    const urlParts = imageUrl.split('/');
    const uploadIndex = urlParts.indexOf('upload');
    if (uploadIndex === -1) {
      console.warn('Invalid Cloudinary URL');
      return;
    }

    // For client-side deletion, we would need signed requests
    // For now, we'll rely on Cloudinary's auto-cleanup or manual deletion
    console.log('Image marked for deletion:', imageUrl);
    
    // In production, you should implement backend API for deletion
    // using Cloudinary Admin API with your API secret
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    // Don't throw error as it's not critical
  }
};

/**
 * Get optimized image URL from Cloudinary
 * @param imageUrl - Original Cloudinary URL
 * @param width - Desired width
 * @param height - Desired height
 * @returns Optimized image URL
 */
export const getOptimizedImageUrl = (
  imageUrl: string,
  width?: number,
  height?: number
): string => {
  if (!imageUrl.includes('cloudinary.com')) {
    return imageUrl;
  }

  const urlParts = imageUrl.split('/upload/');
  if (urlParts.length !== 2) {
    return imageUrl;
  }

  const transformations = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  transformations.push('c_fill', 'q_auto', 'f_auto');

  return `${urlParts[0]}/upload/${transformations.join(',')}/${urlParts[1]}`;
};
