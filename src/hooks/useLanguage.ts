import { useState, useCallback } from 'react';
import type { Lang } from '../content';

const STORAGE_KEY = 'portfolio_lang';

function getInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'zh') return stored;
  } catch {
    // localStorage unavailable
  }
  return 'en';
}

export function useLanguage() {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === 'en' ? 'zh' : 'en';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const setLangPersist = useCallback((l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  }, []);

  return { lang, toggle, setLang: setLangPersist };
}
