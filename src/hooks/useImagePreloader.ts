'use client';

import { useState, useEffect } from 'react';

export function useImagePreloader(frameCount: number, folderPath: string, prefix: string, padLength: number = 3) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Format number to padding like '001', '002', etc.
      const paddedIndex = i.toString().padStart(padLength, '0');
      img.src = `${folderPath}/${prefix}-${paddedIndex}.jpg`;
      
      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        setLoaded(loadedCount);
      };
      
      loadedImages.push(img);
    }

    setImages(loadedImages);

    return () => {
      isMounted = false;
    };
  }, [frameCount, folderPath, prefix, padLength]);

  return {
    images,
    progress: frameCount > 0 ? loaded / frameCount : 0,
    isLoaded: loaded === frameCount
  };
}
