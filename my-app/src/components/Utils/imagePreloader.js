/**
 * Image Preloader Utility
 * Loads images in chunks with progress tracking
 */

/**
 * Preloads a single image with priority hints
 * @param {string} src - Image source URL
 * @param {string} priority - 'high' | 'low' | 'auto' (default: 'auto')
 * @returns {Promise<HTMLImageElement>}
 */
export const preloadImage = (src, priority = 'auto') => {
  return new Promise((resolve, reject) => {
    // Handle both string URLs and imported modules
    const imageUrl = typeof src === 'string' ? src : src.default || src;
    
    // Skip if already loaded
    if (typeof window !== 'undefined') {
      const existingImg = document.querySelector(`img[src="${imageUrl}"]`);
      if (existingImg?.complete) {
        resolve(existingImg);
        return;
      }
    }

    const img = new Image();
    
    // Set fetch priority for important images (Chrome 101+)
    if (priority === 'high' && 'fetchPriority' in img) {
      img.fetchPriority = 'high';
    }
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
    img.src = imageUrl;
  });
};

/**
 * Preloads multiple images in chunks
 * @param {Array<string|Object>} images - Array of image sources or imported modules
 * @param {number} chunkSize - Number of images to load in parallel per chunk
 * @param {Function} onProgress - Callback with (loaded, total, currentChunk)
 * @param {string} priority - 'high' | 'low' | 'auto' (default: 'auto')
 * @param {number} delayBetweenChunks - Delay in ms between chunks (default: 50ms, 0 to disable)
 * @returns {Promise<Array<HTMLImageElement>>}
 */
export const preloadImagesInChunks = async (
  images, 
  chunkSize = 3, 
  onProgress,
  priority = 'auto',
  delayBetweenChunks = 50
) => {
  const total = images.length;
  let loaded = 0;
  const results = [];

  // Process images in chunks
  for (let i = 0; i < images.length; i += chunkSize) {
    const chunk = images.slice(i, i + chunkSize);
    
    try {
      // Load chunk with appropriate priority
      const chunkResults = await Promise.allSettled(
        chunk.map(img => preloadImage(img, priority))
      );

      chunkResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.push(result.value);
          loaded++;
        } else {
          console.warn('Failed to preload image:', chunk[index], result.reason);
          // Still count as "loaded" to avoid blocking progress
          loaded++;
        }
      });

      // Report progress
      if (onProgress) {
        onProgress(loaded, total, Math.floor(i / chunkSize) + 1);
      }

      // Small delay between chunks (reduced or disabled for important images)
      if (delayBetweenChunks > 0 && i + chunkSize < images.length) {
        await new Promise(resolve => setTimeout(resolve, delayBetweenChunks));
      }
    } catch (error) {
      console.error('Error preloading chunk:', error);
    }
  }

  return results;
};

/**
 * Re-export image map functions for convenience
 * These are synchronous functions that return arrays
 */
export {
  getCriticalImages,
  getImportantImages,
  getLazyImages,
  getAllImages,
  getImagesBySection,
  getImagesByPriority,
} from './imageMap';

