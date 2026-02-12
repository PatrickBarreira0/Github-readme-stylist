'use client';

import { Terminal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// --- Flag Components (SVG) ---

function FlagBrazil({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 50" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect fill="#009b3a" width="72" height="50" rx="4" />
      <path fill="#fedf00" d="M36 6 64 25 36 44 8 25z" />
      <circle fill="#002776" cx="36" cy="25" r="10" />
      {/* Simple white band for detail */}
      <path fill="none" stroke="#fff" strokeWidth="1.5" d="M28 28c4-4 10-5 16-2" opacity="0.9" />
    </svg>
  );
}

function FlagUSA({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 50" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Red Background (Stripes) */}
      <rect fill="#b22234" width="72" height="50" rx="4" />
      {/* White Stripes */}
      <path
        stroke="#fff"
        strokeWidth="3.8"
        d="M0 3.8h72M0 11.5h72M0 19.2h72M0 26.9h72M0 34.6h72M0 42.3h72"
      />
      {/* Blue Canton */}
      <rect fill="#3c3b6e" width="32" height="27" rx="1" />
      {/* Simplified Stars (Dots) */}
      <g fill="#fff">
        <circle cx="5" cy="5" r="1.2" />
        <circle cx="11" cy="5" r="1.2" />
        <circle cx="17" cy="5" r="1.2" />
        <circle cx="23" cy="5" r="1.2" />
        <circle cx="8" cy="10" r="1.2" />
        <circle cx="14" cy="10" r="1.2" />
        <circle cx="20" cy="10" r="1.2" />
        <circle cx="26" cy="10" r="1.2" />
        <circle cx="5" cy="15" r="1.2" />
        <circle cx="11" cy="15" r="1.2" />
        <circle cx="17" cy="15" r="1.2" />
        <circle cx="23" cy="15" r="1.2" />
        <circle cx="8" cy="20" r="1.2" />
        <circle cx="14" cy="20" r="1.2" />
        <circle cx="20" cy="20" r="1.2" />
      </g>
    </svg>
  );
}

// --- Main Header Component ---

export function Header() {
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en');
  };

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-black dark:bg-white rounded-lg">
          <Terminal className="w-6 h-6 text-white dark:text-black" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('header.title')}</h1>
        </div>
      </div>

      <button
        onClick={toggleLanguage}
        className="group flex items-center gap-3 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm"
        title={language === 'en' ? 'Mudar para Português' : 'Switch to English'}
      >
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {language === 'en' ? 'English' : 'Português'}
        </span>
        <div className="relative w-8 h-6 shadow-sm rounded overflow-hidden ring-1 ring-black/10">
          {language === 'en' ? (
            <FlagUSA className="w-full h-full object-cover" />
          ) : (
            <FlagBrazil className="w-full h-full object-cover" />
          )}
        </div>
      </button>
    </header>
  );
}