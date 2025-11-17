// image preloader utility - loads images in chunks with progress tracking.

// preloads a single image.
export const preloadImage = (src, priority = 'auto') => {
	return new Promise((resolve, reject) => {
		// get image url.
		const imageUrl = typeof src === 'string' ? src : src.default || src;
		
		// check if image is already loaded,
		if (typeof window !== 'undefined') {
			const existingImg = document.querySelector(`img[src="${imageUrl}"]`);
			if (existingImg?.complete) {
				resolve({
					img: existingImg,
					size: 0,
					dimensions: { width: existingImg.naturalWidth, height: existingImg.naturalHeight }
				});
				return;
			}
		}

		// else, create a new image.
		const img = new Image();
		const startTime = performance.now();
		
		// set fetch priority.
		if (priority === 'high' && 'fetchPriority' in img) {
			img.fetchPriority = 'high';
		}
		
		// on load, get the load time.
		img.onload = async () => {
			const loadTime = performance.now() - startTime;
			let fileSize = 0;
			
			// get the file size from the resource timing.
			const getSizeFromResourceTiming = () => {
				if (typeof window !== 'undefined' && window.performance) {
					const resources = performance.getEntriesByType('resource');
					const resource = resources.find(r => {
						const resourceName = r.name;
						const imageUrlClean = imageUrl.split('?')[0];
						return resourceName.includes(imageUrlClean) || resourceName === imageUrl;
					});
					if (resource && resource.transferSize && resource.transferSize > 0) {
						return resource.transferSize;
					}
					if (resource && resource.decodedBodySize && resource.decodedBodySize > 0) {
						return resource.decodedBodySize;
					}
				}
				return 0;
			};
			
			fileSize = getSizeFromResourceTiming();
			
			// if the file size is 0, wait for 50ms and try again.
			if (fileSize === 0) {
				await new Promise(resolve => setTimeout(resolve, 50));
				fileSize = getSizeFromResourceTiming();
			}
			
			// if the file size is still 0, try to fetch the image.
			if (fileSize === 0 && typeof fetch !== 'undefined') {
				try {
					const response = await fetch(imageUrl, { method: 'HEAD', cache: 'force-cache' });
					const contentLength = response.headers.get('content-length');
					if (contentLength) {
						fileSize = parseInt(contentLength, 10);
					}
				} catch (e) {
					// ignore fetch errors
				}
			}
			
			// resolve the image.
			resolve({
				img,
				size: fileSize,
				dimensions: { width: img.naturalWidth, height: img.naturalHeight },
				loadTime
			});
		};
		
		// on error, reject the promise.
		img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
		
		// set the image source.
		img.src = imageUrl;
	});
};

// preloads multiple images in chunks.
export const preloadImagesInChunks = async (
	images, 
	chunkSize = 3, 
	onProgress,
	priority = 'auto',
	delayBetweenChunks = 50
) => {
	// get the total number of images.
	const total = images.length;

	// initialize the loaded count, results array, and image stats.
	let loaded = 0;
	const results = [];
	const imageStats = {
		totalSize: 0, 								// total size of all images.
		totalLoadTime: 0, 							// total load time of all images.
		largestImage: { size: 0, url: '' }, 		// largest image.
		slowestImage: { time: 0, url: '' } 			// slowest image.
	};

	// loop through the images in chunks.
	for (let i = 0; i < images.length; i += chunkSize) {
		// get the current chunk.
		const chunk = images.slice(i, i + chunkSize);
		
		try {
			// preload the images in the current chunk.
			const chunkResults = await Promise.allSettled(
				chunk.map(img => preloadImage(img, priority))
			);

			// loop through the results in the current chunk.
			chunkResults.forEach((result, index) => {
				if (result.status === 'fulfilled') {
					const { img, size, dimensions, loadTime } = result.value;
					results.push(result.value);
					loaded++;
					
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
					loaded++;
				}
			});

			// if there is a progress callback, call it.
			if (onProgress) {
				onProgress(loaded, total, Math.floor(i / chunkSize) + 1);
			}

			// if there is a delay between chunks, wait for the delay.
			if (delayBetweenChunks > 0 && i + chunkSize < images.length) {
				await new Promise(resolve => setTimeout(resolve, delayBetweenChunks));
			}
		} catch (error) {
			// ignore preload errors
		}
	}

	// add the image stats to the results.
	results.stats = imageStats;

	// return the results.
	return results;
};

// re-export the image map functions.
export {
	getCriticalImages,
	getImportantImages,
	getLazyImages,
	getAllImages,
	getImagesBySection,
	getImagesByPriority,
} from './imageMap.js';

