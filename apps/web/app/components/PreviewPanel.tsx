'use client';

import { Copy, Github } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../contexts/LanguageContext';

type PreviewPanelProps = {
  fullPreview: string;
  asciiPreview: string;
  copied: boolean;
  onCopy: () => void;
};

export function PreviewPanel({ fullPreview, asciiPreview, copied, onCopy }: PreviewPanelProps) {
  const { t } = useLanguage();
  const cleanedPreview = (fullPreview ?? '').replace(/<!--[\s\S]*?-->/g, '').trim();

  return (
    <div className="lg:col-span-7">
      <div className="h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          <span className="text-sm font-medium text-gray-500">{t('preview.title')}</span>
          <button
            onClick={onCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-90 transition-opacity"
          >
            {copied ? t('preview.copied') : (
              <>
                <Copy className="w-4 h-4" />
                {t('preview.copy')}
              </>
            )}
          </button>
        </div>

        <div className="flex-1 p-6 overflow-auto bg-[#0d1117] text-gray-300 min-h-[500px]">
          {fullPreview ? (
            <div className="markdown-preview">
              <ReactMarkdown
                components={{
                  h4: ({ children }) => (
                    <h4 className="text-xl font-semibold mt-6 mb-4 pb-2 border-b border-gray-700 text-white">
                      {children}
                    </h4>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-[#161b22] p-4 rounded-md overflow-x-auto border border-gray-700 text-xs sm:text-sm leading-[1.1] font-mono text-gray-300 my-4">
                      {children}
                    </pre>
                  ),
                  code: ({ children }) => (
                    <code className="font-mono text-xs sm:text-sm">
                      {children}
                    </code>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 leading-relaxed">
                      {children}
                    </p>
                  ),
                }}
              >
                {cleanedPreview}
              </ReactMarkdown>
            </div>
          ) : asciiPreview ? (
            <pre className="font-mono text-xs sm:text-sm leading-none whitespace-pre select-all text-center flex flex-col items-center justify-center h-full">
              {asciiPreview}
              <div className="mt-8 text-gray-500 text-sm font-sans">
                {t('preview.asciiLive')}
              </div>
            </pre>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
              <Github className="w-12 h-12 opacity-20" />
              <p>{t('preview.emptyState')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}