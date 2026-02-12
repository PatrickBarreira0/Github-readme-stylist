'use client';

import { useCallback, useState } from 'react';
import type { Config } from '@github-readme-stylist/core';
import { ControlsPanel, type TabId, type UpdateSection } from './components/ControlsPanel';
import { Header } from './components/Header';
import { PreviewPanel } from './components/PreviewPanel';
import { useAsciiPreview } from './hooks/useAsciiPreview';
import { useClipboard } from './hooks/useClipboard';
import { useFonts } from './hooks/useFonts';
import { useReadmePreview } from './hooks/useReadmePreview';
import { LanguageProvider } from './contexts/LanguageContext';

const initialConfig: Config = {
  username: '',
  style: 'terminal',
  styleText: '',
  sections: {
    ascii: {
      enabled: true,
      text: 'Read me',
      font: 'Standard',
      showCats: false,
    },
    stats: {
      enabled: true,
      showCommits: true,
      showStars: true,
      showFollowers: true,
    },
    languages: {
      enabled: true,
      topN: 5,
    },
    activity: {
      enabled: true,
      limit: 5,
    },
  },
};

function AppContent() {
  const [config, setConfig] = useState<Config>(initialConfig);
  const [activeTab, setActiveTab] = useState<TabId>('general');

  const fonts = useFonts();
  const { asciiPreview } = useAsciiPreview(config.sections.ascii);
  const { fullPreview, isGenerating, error, generateFull } = useReadmePreview(config);
  const { copied, copy } = useClipboard();

  const updateSection: UpdateSection = useCallback((section, key, value) => {
    setConfig((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: {
          ...prev.sections[section],
          [key]: value,
        },
      },
    }));
  }, []);

  const handleUsernameChange = useCallback((value: string) => {
    setConfig((prev) => ({ ...prev, username: value }));
  }, []);

  const handleStyleChange = useCallback((value: NonNullable<Config['style']>) => {
    setConfig((prev) => ({ ...prev, style: value }));
  }, []);

  const handleStyleTextChange = useCallback((value: string) => {
    setConfig((prev) => ({ ...prev, styleText: value }));
  }, []);

  const handleCopy = useCallback(() => {
    copy(fullPreview || asciiPreview);
  }, [copy, fullPreview, asciiPreview]);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">
        <Header />

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <ControlsPanel
            config={config}
            fonts={fonts}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onUsernameChange={handleUsernameChange}
            onUpdateSection={updateSection}
            onStyleChange={handleStyleChange}
            onStyleTextChange={handleStyleTextChange}
            onGenerate={generateFull}
            isGenerating={isGenerating}
            error={error}
          />

          <PreviewPanel
            fullPreview={fullPreview}
            asciiPreview={asciiPreview}
            copied={copied}
            onCopy={handleCopy}
          />
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}