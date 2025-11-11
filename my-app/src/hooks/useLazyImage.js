/**
 * useLazyImage Hook
 * Uses Intersection Observer to lazy load images when they're about to enter viewport
 * Falls back to native loading="lazy" if Intersection Observer is not supported
 */

import { useState, useEffect, useRef } from 'react';

/**
 * Hook to lazy load images using Intersection Observer
 * @param {string|Object} imageSrc - Image source (string URL or imported module)
 * @param {Object} options - Configuration options
 * @param {number} options.rootMargin - Margin around root (default: '200px' for early loading)
 * @param {number} options.threshold - Visibility threshold (default: 0.01)
 * @param {boolean} options.enabled - Whether to enable lazy loading (default: true)
 * @returns {Object} - { src: string, isLoaded: boolean, isVisible: boolean }
 */
export const useLazyImage = (imageSrc, options = {}) => {
  const {
    rootMargin = '200px',
    threshold = 0.01,
    enabled = true
  } = options;

  const [src, setSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);
  const rafRef = useRef(null);

  // Get image URL from imported module or string
  const getImageUrl = (src) => {
    if (typeof src === 'string') return src;
    if (src?.default) return src.default;
    if (typeof src === 'object' && src !== null) return src;
    return null;
  };

  const imageUrl = getImageUrl(imageSrc);

  useEffect(() => {
    if (!enabled || !imageUrl) {
      // If disabled or no image, set src immediately
      setSrc(imageUrl);
      return;
    }

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: use native lazy loading
      setSrc(imageUrl);
      return;
    }

    // Create observer with batched callbacks to prevent render spikes
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Cancel any pending RAF to batch updates
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
        
        // Batch all state updates in a single RAF
        rafRef.current = requestAnimationFrame(() => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              setSrc(imageUrl);
              // Once loaded, disconnect observer
              if (observerRef.current && imgRef.current) {
                observerRef.current.unobserve(imgRef.current);
              }
            }
          });
          rafRef.current = null;
        });
      },
      {
        rootMargin,
        threshold
      }
    );

    // Observe the element
    if (imgRef.current && observerRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (observerRef.current && imgRef.current) {
        observerRef.current.unobserve(imgRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [imageUrl, rootMargin, threshold, enabled]);

  // Track image load
  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(false);
    img.src = typeof src === 'string' ? src : (src.default || src);
  }, [src]);

  return {
    src: src || imageUrl, // Fallback to imageUrl if observer hasn't triggered yet
    isLoaded,
    isVisible,
    imgRef,
    // For use with img tag: <img ref={imgRef} src={src} loading="lazy" />
  };
};

/**
 * Simplified version that returns just the src string
 * Use this when you don't need ref tracking
 */
export const useLazyImageSrc = (imageSrc, options = {}) => {
  const { src } = useLazyImage(imageSrc, options);
  return src;
};

export default useLazyImage;

