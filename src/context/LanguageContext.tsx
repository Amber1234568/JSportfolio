import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Lang } from '../content';

const STORAGE_KEY = 'lang';

function getInitial(): Lang {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s === 'en' || s === 'zh') return s;
  } catch {
    // localStorage unavailable
  }
  return 'en';
}

interface LangCtx {
  lang: Lang;
  toggle: () => void;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitial);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === 'en' ? 'zh' : 'en';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, toggle, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
