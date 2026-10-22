import { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

const FONT_SIZE_KEY = 'narisetu_font_scale';

export function useAccessibility() {
  const [scale, setScale] = useState(() => {
    return storageService.getItem(FONT_SIZE_KEY, 'normal'); // 'small' | 'normal' | 'large'
  });

  useEffect(() => {
    const root = document.documentElement;
    if (scale === 'small') {
      root.style.fontSize = '14.5px';
    } else if (scale === 'large') {
      root.style.fontSize = '18px';
    } else {
      root.style.fontSize = '16px';
    }
    storageService.setItem(FONT_SIZE_KEY, scale);
  }, [scale]);

  return {
    scale,
    setFontScale: setScale
  };
}
