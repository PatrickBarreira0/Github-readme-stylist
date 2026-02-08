'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { generateAsciiArt, getFonts, fetchGitHubDataForUser, renderReadmeFromDataAction } from './actions';
import { Copy, Terminal, Type, Github, BarChart3, Code2, Activity, Settings, RefreshCw, Eye, EyeOff } from 'lucide-react';
import type { Config, GitHubData } from '@github-readme-stylist/core';
import ReactMarkdown from 'react-markdown'; // Import the renderer


//TODO Make ascii art dynamic after generation
//TODO Change enabling/disabling button

//default initial config
const initialConfig: Config = {
  username: '',
  sections: {
    ascii: {
      enabled: true,
      text: 'Readme',
      font: 'Standard',
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

export default function Home() {
  const [config, setConfig] = useState<Config>(initialConfig);
  const [fonts, setFonts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('general');
  
  const [asciiPreview, setAsciiPreview] = useState('');
  const [fullPreview, setFullPreview] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAsciiLoading, setIsAsciiLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [gitHubData, setGitHubData] = useState<GitHubData | null>(null);
  const [fetchedUsername, setFetchedUsername] = useState('');
  const fullRenderId = useRef(0);

  useEffect(() => {
    getFonts().then(setFonts);
  }, []);

  const updateAsciiPreview = useCallback(async () => {
    if (!config.sections.ascii.enabled) {
        setAsciiPreview('');
        return;
    }
    setIsAsciiLoading(true);
    try {
      const art = await generateAsciiArt(config.sections.ascii.text, config.sections.ascii.font);
      setAsciiPreview(art);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAsciiLoading(false);
    }
  }, [config.sections.ascii.text, config.sections.ascii.font, config.sections.ascii.enabled]);

  useEffect(() => {
    const timer = setTimeout(updateAsciiPreview, 500);
    return () => clearTimeout(timer);
  }, [updateAsciiPreview]);

  useEffect(() => {
    if (fetchedUsername && config.username !== fetchedUsername) {
      setGitHubData(null);
      setFullPreview('');
    }
  }, [config.username, fetchedUsername]);

  useEffect(() => {
    if (!gitHubData) return;
    const timer = setTimeout(async () => {
      const requestId = ++fullRenderId.current;
      try {
        const result = await renderReadmeFromDataAction(config, gitHubData);
        if (requestId !== fullRenderId.current) return;
        if (result.success && result.content) {
          setFullPreview(result.content);
          setError('');
        } else {
          setError(result.error || 'Failed to render README');
        }
      } catch (e: any) {
        if (requestId === fullRenderId.current) {
          setError(e.message);
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [config, gitHubData]);

  const handleGenerateFull = async () => {
    if (!config.username) {
        setError('GitHub Username is required');
        return;
    }
    setError('');
    setIsGenerating(true);
    try {
        const dataResult = await fetchGitHubDataForUser(config.username);
        if (!dataResult.success || !dataResult.data) {
          setError(dataResult.error || 'Failed to fetch GitHub data');
          return;
        }
        setGitHubData(dataResult.data);
        setFetchedUsername(config.username);
        const renderResult = await renderReadmeFromDataAction(config, dataResult.data);
        if (renderResult.success && renderResult.content) {
          setFullPreview(renderResult.content);
        } else {
          setError(renderResult.error || 'Failed to render README');
        }
    } catch (e: any) {
        setError(e.message);
    } finally {
        setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullPreview || asciiPreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateSection = (section: keyof typeof config.sections, key: string, value: any) => {
    setConfig((prev: Config) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: {
          ...prev.sections[section],
          [key]: value
        }
      }
    }));
  };

  const CleanPreview = (fullPreview ?? '') // i simply dont know a better way to do this
  .replace(/<!--[\s\S]*?-->/g, '')
  .trim();

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-black dark:bg-white rounded-lg">
                <Terminal className="w-6 h-6 text-white dark:text-black" />
            </div>
            <div>
                <h1 className="text-2xl font-bold tracking-tight">GitHub Readme Stylist</h1>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tabs */}
            <div className="flex space-x-1 overflow-x-auto pb-2">
                {[
                    { id: 'general', icon: Settings, label: 'General' },
                    { id: 'ascii', icon: Type, label: 'ASCII' },
                    { id: 'stats', icon: BarChart3, label: 'Stats' },
                    { id: 'languages', icon: Code2, label: 'Langs' },
                    { id: 'activity', icon: Activity, label: 'Activity' },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                            activeTab === tab.id 
                                ? 'bg-black dark:bg-white text-white dark:text-black' 
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 min-h-[400px]">
                
                {activeTab === 'general' && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold flex items-center gap-2">
                                <Github className="w-4 h-4" /> GitHub Username
                            </label>
                            <input
                                type="text"
                                value={config.username}
                                onChange={(e) => setConfig((prev: Config) => ({ ...prev, username: e.target.value }))}
                                className="w-full p-3 rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Enter your GitHub username"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'ascii' && (
                    <div className="space-y-4">
                         <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-semibold">Enable ASCII Section</label>
                            <button
                                onClick={() => updateSection('ascii', 'enabled', !config.sections.ascii.enabled)}
                                className={`p-2 rounded-lg transition-colors ${config.sections.ascii.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}
                            >
                                {config.sections.ascii.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                        </div>
                        {config.sections.ascii.enabled && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Text</label>
                                    <textarea
                                        value={config.sections.ascii.text}
                                        onChange={(e) => updateSection('ascii', 'text', e.target.value)}
                                        className="w-full p-3 rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold">Font</label>
                                    <select
                                        value={config.sections.ascii.font}
                                        onChange={(e) => updateSection('ascii', 'font', e.target.value)}
                                        className="w-full p-3 rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        {fonts.map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="space-y-4">
                         <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-semibold">Enable Stats Section</label>
                            <button
                                onClick={() => updateSection('stats', 'enabled', !config.sections.stats.enabled)}
                                className={`p-2 rounded-lg transition-colors ${config.sections.stats.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}
                            >
                                {config.sections.stats.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                        </div>
                        {config.sections.stats.enabled && (
                            <div className="space-y-2">
                                {['showCommits', 'showStars', 'showFollowers'].map((key) => (
                                    <label key={key} className="flex items-center gap-3 p-3 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={config.sections.stats[key as keyof typeof config.sections.stats]}
                                            onChange={(e) => updateSection('stats', key, e.target.checked)}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm capitalize">{key.replace('show', '')}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'languages' && (
                     <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                           <label className="text-sm font-semibold">Enable Languages Section (Python, C Java, etc.)</label>
                           <button
                               onClick={() => updateSection('languages', 'enabled', !config.sections.languages.enabled)}
                               className={`p-2 rounded-lg transition-colors ${config.sections.languages.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}
                           >
                               {config.sections.languages.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                           </button>
                       </div>
                       {config.sections.languages.enabled && (
                           <div className="space-y-2">
                               <label className="text-sm font-semibold">Amount of Languages to Show</label>
                               <input
                                   type="number"
                                   min="1"
                                   max="10"
                                   value={config.sections.languages.topN}
                                   onChange={(e) => updateSection('languages', 'topN', parseInt(e.target.value))}
                                   className="w-full p-3 rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                               />
                           </div>
                       )}
                   </div>
                )}

                {activeTab === 'activity' && (
                     <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                           <label className="text-sm font-semibold">Enable last commits section</label>
                           <button
                               onClick={() => updateSection('activity', 'enabled', !config.sections.activity.enabled)}
                               className={`p-2 rounded-lg transition-colors ${config.sections.activity.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}
                           >
                               {config.sections.activity.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                           </button>
                       </div>
                       {config.sections.activity.enabled && (
                           <div className="space-y-2">
                               <label className="text-sm font-semibold">Commits to Show</label>
                               <input
                                   type="number"
                                   min="1"
                                   max="20"
                                   value={config.sections.activity.limit}
                                   onChange={(e) => updateSection('activity', 'limit', parseInt(e.target.value))}
                                   className="w-full p-3 rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                               />
                           </div>
                       )}
                   </div>
                )}

            </div>

            <button
                onClick={handleGenerateFull}
                disabled={isGenerating || !config.username}
                className="w-full py-4 bg-white hover:bg-gray-50 text-black border border-gray-200 dark:border-gray-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
                {isGenerating ? (
                    <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Generating Profile...
                    </>
                ) : (
                    <>
                        <RefreshCw className="w-5 h-5" />
                        Generate README
                    </>
                )}
            </button>
            
            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                    {error}
                </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                <span className="text-sm font-medium text-gray-500">Preview</span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-90 transition-opacity"
                >
                  {copied ? 'Copied!' : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Markdown
                    </>
                  )}
                </button>
              </div>
              
              <div className="flex-1 p-6 overflow-auto bg-[#0d1117] text-gray-300 min-h-[500px]">
                {fullPreview ? (
                    // React Markdown Rendering
                    <div className="markdown-preview">
                        <ReactMarkdown
                            components={{
                                h4: ({children}) => (
                                    <h4 className="text-xl font-semibold mt-6 mb-4 pb-2 border-b border-gray-700 text-white">
                                        {children}
                                    </h4>
                                ),
                                pre: ({children}) => (
                                    <pre className="bg-[#161b22] p-4 rounded-md overflow-x-auto border border-gray-700 text-xs sm:text-sm leading-[1.1] font-mono text-gray-300 my-4">
                                        {children}
                                    </pre>
                                ),
                                code: ({children}) => (
                                    <code className="font-mono text-xs sm:text-sm">
                                        {children}
                                    </code>
                                ),
                                p: ({children}) => (
                                    <p className="mb-4 leading-relaxed">
                                        {children}
                                    </p>
                                )
                            }}
                        >
                            {CleanPreview}
                        </ReactMarkdown>
                    </div>
                ) : asciiPreview ? (
                    <pre className="font-mono text-xs sm:text-sm leading-none whitespace-pre select-all text-center flex flex-col items-center justify-center h-full">
                        {asciiPreview}
                        <div className="mt-8 text-gray-500 text-sm font-sans">
                            (Live ASCII preview - Click Generate for full details)
                        </div>
                    </pre>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                        <Github className="w-12 h-12 opacity-20" />
                        <p>Configure your settings and click Generate</p>
                    </div>
                )}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
