import { useState, useEffect, useCallback } from 'react';

// Array of beautiful background images from Unsplash
const backgroundImages = [
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
  'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
  'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6',
  'https://images.unsplash.com/photo-1490730141103-6cac27aaab94',
  'https://images.unsplash.com/photo-1490682143684-14369e18dce8',
  'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d'
];

export const useRandomBackground = () => {
  const [backgroundUrl, setBackgroundUrl] = useState<string>('');

  const getRandomBackground = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const baseUrl = backgroundImages[randomIndex];
    // Append sizing parameters for better performance
    const optimizedUrl = `${baseUrl}?auto=format&fit=crop&w=1920&q=80`;
    setBackgroundUrl(optimizedUrl);
  }, []);

  useEffect(() => {
    getRandomBackground();
  }, [getRandomBackground]);

  return {
    backgroundUrl,
    getRandomBackground
  };
};
