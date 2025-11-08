/**
 * Image Preloader Utility
 * Loads images in chunks with progress tracking
 */

/**
 * Preloads a single image with priority hints and size tracking
 * @param {string} src - Image source URL
 * @param {string} priority - 'high' | 'low' | 'auto' (default: 'auto')
 * @returns {Promise<{img: HTMLImageElement, size: number, dimensions: {width: number, height: number}}>}
 */
export const preloadImage = (src, priority = 'auto') => {
  return new Promise((resolve, reject) => {
    // Handle both string URLs and imported modules
    const imageUrl = typeof src === 'string' ? src : src.default || src;
    
    // Skip if already loaded
    if (typeof window !== 'undefined') {
      const existingImg = document.querySelector(`img[src="${imageUrl}"]`);
      if (existingImg?.complete) {
        resolve({
          img: existingImg,
          size: 0, // Can't determine size for already loaded
          dimensions: { width: existingImg.naturalWidth, height: existingImg.naturalHeight }
        });
        return;
      }
    }

    const img = new Image();
    const startTime = performance.now();
    
    // Set fetch priority for important images (Chrome 101+)
    if (priority === 'high' && 'fetchPriority' in img) {
      img.fetchPriority = 'high';
    }
    
    img.onload = async () => {
      const loadTime = performance.now() - startTime;
      
      // Try to get actual file size from network resources
      // Resource timing might not be available immediately, so we'll check multiple times
      let fileSize = 0;
      
      const getSizeFromResourceTiming = () => {
        if (typeof window !== 'undefined' && window.performance) {
          const resources = performance.getEntriesByType('resource');
          const resource = resources.find(r => {
            // Match by URL (handle both absolute and relative paths)
            const resourceName = r.name;
            const imageUrlClean = imageUrl.split('?')[0]; // Remove query params
            return resourceName.includes(imageUrlClean) || resourceName === imageUrl;
          });
          if (resource && resource.transferSize && resource.transferSize > 0) {
            return resource.transferSize;
          }
          // Fallback to decodedBodySize if transferSize not available
          if (resource && resource.decodedBodySize && resource.decodedBodySize > 0) {
            return resource.decodedBodySize;
          }
        }
        return 0;
      };
      
      // Check immediately
      fileSize = getSizeFromResourceTiming();
      
      // If not available, wait a bit and check again (resource timing can be delayed)
      if (fileSize === 0) {
        await new Promise(resolve => setTimeout(resolve, 50));
        fileSize = getSizeFromResourceTiming();
      }
      
      // Final fallback: try fetch HEAD request for Content-Length
      if (fileSize === 0 && typeof fetch !== 'undefined') {
        try {
          const response = await fetch(imageUrl, { method: 'HEAD', cache: 'force-cache' });
          const contentLength = response.headers.get('content-length');
          if (contentLength) {
            fileSize = parseInt(contentLength, 10);
          }
        } catch (e) {
          // Ignore fetch errors, we'll just report 0
        }
      }
      
      resolve({
        img,
        size: fileSize,
        dimensions: { width: img.naturalWidth, height: img.naturalHeight },
        loadTime
      });
    };
    
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
  const imageStats = {
    totalSize: 0,
    totalLoadTime: 0,
    largestImage: { size: 0, url: '' },
    slowestImage: { time: 0, url: '' }
  };

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
          const { img, size, dimensions, loadTime } = result.value;
          results.push(result.value);
          loaded++;
          
          // Track statistics
          imageStats.totalSize += size;
          if (loadTime) {
            imageStats.totalLoadTime += loadTime;
            if (loadTime > imageStats.slowestImage.time) {
              imageStats.slowestImage = { time: loadTime, url: chunk[index] };
            }
          }
          if (size > imageStats.largestImage.size) {
            imageStats.largestImage = { size, url: chunk[index], dimensions };
          }
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

  // Attach stats to results for analysis
  results.stats = imageStats;
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

