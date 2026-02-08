'use client';

import type { Config } from '@github-readme-stylist/core';
import { Activity, BarChart3, Code2, Github, Palette, RefreshCw, Settings, Type } from 'lucide-react';

export type TabId = 'general' | 'ascii' | 'stats' | 'languages' | 'activity' | 'style';

export type UpdateSection = <S extends keyof Config['sections'], K extends keyof Config['sections'][S]>(
  section: S,
  key: K,
  value: Config['sections'][S][K],
) => void;

type StyleValue = NonNullable<Config['style']>;

type ControlsPanelProps = {
  config: Config;
  fonts: string[];
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onUsernameChange: (value: string) => void;
  onUpdateSection: UpdateSection;
  onStyleChange: (value: StyleValue) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  error: string;
};

const tabs: Array<{ id: TabId; icon: typeof Settings; label: string }> = [
  { id: 'general', icon: Settings, label: 'General' },
  { id: 'ascii', icon: Type, label: 'ASCII' },
  { id: 'stats', icon: BarChart3, label: 'Stats' },
  { id: 'languages', icon: Code2, label: 'Langs' },
  { id: 'activity', icon: Activity, label: 'Activity' },
  { id: 'style', icon: Palette, label: 'Style' },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
      }`}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out`}
      />
    </button>
  );
}

export function ControlsPanel({
  config,
  fonts,
  activeTab,
  onTabChange,
  onUsernameChange,
  onUpdateSection,
  onStyleChange,
  onGenerate,
  isGenerating,
  error,
}: ControlsPanelProps) {
  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="flex space-x-1 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
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
                onChange={(e) => onUsernameChange(e.target.value)}
                className="w-full p-3 rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your GitHub username"
              />
            </div>
          </div>
        )}

        {activeTab === 'ascii' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4 p-2 bg-white dark:bg-black rounded-lg border border-gray-100 dark:border-gray-800">
              <label className="text-sm font-semibold">Enable ASCII Section</label>
              <Toggle
                checked={config.sections.ascii.enabled}
                onChange={(val) => onUpdateSection('ascii', 'enabled', val)}
              />
            </div>
            {config.sections.ascii.enabled && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Text</label>
                  <textarea
                    value={config.sections.ascii.text}
                    onChange={(e) => onUpdateSection('ascii', 'text', e.target.value)}
                    className="w-full p-3 rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Font</label>
                  <select
                    value={config.sections.ascii.font}
                    onChange={(e) => onUpdateSection('ascii', 'font', e.target.value)}
                    className="w-full p-3 rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {fonts.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between p-2 bg-white dark:bg-black rounded-lg border border-gray-100 dark:border-gray-800">
                  <label className="text-sm font-semibold">Cats</label>
                  <Toggle
                    checked={config.sections.ascii.showCats}
                    onChange={(val) => onUpdateSection('ascii', 'showCats', val)}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4 p-2 bg-white dark:bg-black rounded-lg border border-gray-100 dark:border-gray-800">
              <label className="text-sm font-semibold">Enable Stats Section</label>
              <Toggle
                checked={config.sections.stats.enabled}
                onChange={(val) => onUpdateSection('stats', 'enabled', val)}
              />
            </div>
            {config.sections.stats.enabled && (
              <div className="space-y-2">
                {(['showCommits', 'showStars', 'showFollowers'] as Array<keyof Config['sections']['stats']>).map(
                  (key) => (
                    <label
                      key={key}
                      className="flex items-center gap-3 p-3 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={config.sections.stats[key]}
                        onChange={(e) => onUpdateSection('stats', key, e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm capitalize">{String(key).replace('show', '')}</span>
                    </label>
                  ),
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'languages' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4 p-2 bg-white dark:bg-black rounded-lg border border-gray-100 dark:border-gray-800">
              <label className="text-sm font-semibold">Enable Languages Section</label>
              <Toggle
                checked={config.sections.languages.enabled}
                onChange={(val) => onUpdateSection('languages', 'enabled', val)}
              />
            </div>
            {config.sections.languages.enabled && (
              <div className="space-y-2">
                <label className="text-sm font-semibold">Amount of Languages to Show</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={config.sections.languages.topN}
                  onChange={(e) => onUpdateSection('languages', 'topN', parseInt(e.target.value, 10))}
                  className="w-full p-3 rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4 p-2 bg-white dark:bg-black rounded-lg border border-gray-100 dark:border-gray-800">
              <label className="text-sm font-semibold">Enable Activity Section</label>
              <Toggle
                checked={config.sections.activity.enabled}
                onChange={(val) => onUpdateSection('activity', 'enabled', val)}
              />
            </div>
            {config.sections.activity.enabled && (
              <div className="space-y-2">
                <label className="text-sm font-semibold">Commits to Show</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={config.sections.activity.limit}
                  onChange={(e) => onUpdateSection('activity', 'limit', parseInt(e.target.value, 10))}
                  className="w-full p-3 rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'style' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">README Style</label>
              <select
                value={config.style ?? 'terminal'}
                onChange={(e) => onStyleChange(e.target.value as StyleValue)}
                className="w-full p-3 rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="terminal">Terminal</option>
                <option value="compact">Compact</option>
                <option value="classic">Classic</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onGenerate}
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
  );
}