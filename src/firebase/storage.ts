import { uploadImageToCloudinary, deleteImageFromCloudinary } from '../utils/cloudinary';

export const uploadImage = async (
  file: File,
  folder: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    // Simulate progress for UI feedback
    if (onProgress) {
      onProgress(50);
    }

    // Upload to Cloudinary
    const imageUrl = await uploadImageToCloudinary(file, folder);
    
    if (onProgress) {
      onProgress(100);
    }

    return imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    await deleteImageFromCloudinary(imageUrl);
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw error as it's not critical
  }
};

export const uploadMultipleImages = async (
  files: File[],
  folder: string,
  onProgress?: (progress: number) => void
): Promise<string[]> => {
  const uploadPromises = files.map((file, index) => 
    uploadImage(file, folder, (fileProgress) => {
      if (onProgress) {
        const totalProgress = ((index + fileProgress / 100) / files.length) * 100;
        onProgress(totalProgress);
      }
    })
  );

  return Promise.all(uploadPromises);
};
