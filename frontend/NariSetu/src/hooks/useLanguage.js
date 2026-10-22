import { useState, useEffect } from 'react';
import { content } from '../data/content';
import { storageService } from '../services/storageService';

const LANG_STORAGE_KEY = 'narisetu_lang';

export function useLanguage(initialLang = 'en') {
  const [lang, setLang] = useState(() => {
    return storageService.getItem(LANG_STORAGE_KEY, initialLang);
  });

  const changeLanguage = (newLang) => {
    if (content[newLang]) {
      setLang(newLang);
      storageService.setItem(LANG_STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const activeContent = content[lang] || content.en;

  return {
    lang,
    changeLanguage,
    content: activeContent,
    availableLanguages: [
      { code: 'en', label: 'English', native: 'English' },
      { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
      { code: 'bn', label: 'Bengali', native: 'বাংলা' }
    ]
  };
}
