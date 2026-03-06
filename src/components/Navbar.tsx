import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { content } from '../content';

export function Navbar() {
  const { lang, toggle } = useLanguage();
  const location = useLocation();
  const c = content[lang];
  const onCaseStudy = location.pathname.startsWith('/work/');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-[680px] mx-auto px-6 h-11 flex items-center justify-between">
        {/* Left: name or back link depending on page */}
        {onCaseStudy ? (
          <Link
            to="/work"
            className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-gray-700 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
            </svg>
            {c.work.title}
          </Link>
        ) : (
          <Link
            to="/work"
            className="text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            {c.name}
          </Link>
        )}

        {/* Right: language toggle */}
        <button
          onClick={toggle}
          className="text-[12px] text-gray-400 hover:text-gray-700 transition-colors px-2 py-0.5 rounded"
          aria-label="Toggle language"
        >
          {lang === 'en' ? c.nav.langToggleEn : c.nav.langToggleZh}
        </button>
      </div>
    </nav>
  );
}
