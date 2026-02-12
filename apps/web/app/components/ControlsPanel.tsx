'use client';

import type { Config } from '@github-readme-stylist/core';
import { Activity, BarChart3, Code2, Copy, Github, Palette, RefreshCw, Settings, Type, Wrench } from 'lucide-react';
import { useState } from 'react';

export type TabId = 'general' | 'ascii' | 'stats' | 'languages' | 'activity' | 'style' | 'setup';

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
  onStyleTextChange: (value: string) => void;
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
  { id: 'setup', icon: Wrench, label: 'Setup' },
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

function CopyBlock({ title, content, language = 'json' }: { title: string; content: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold">{title}</label>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-white-500 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-md hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
          <Copy className="w-3 h-3" />
        </button>
      </div>
      <div className="relative group">
        <pre className="p-4 rounded-lg bg-white dark:bg-black border border-gray-200 dark:border-gray-800 overflow-x-auto text-xs font-mono max-h-[200px] overflow-y-auto scrollbar-hide">
          <code>{content}</code>
        </pre>
      </div>
    </div>
  );
}

const WORKFLOW_YAML = `name: Update Profile README

on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:

jobs:
  update-readme:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Generate README
        run: npm run dev:core
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

      - name: Commit and Push changes
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "Update Profile README"
          file_pattern: README.md
          branch: main
          commit_user_name: github-actions[bot]
          commit_user_email: 41898282+github-actions[bot]@users.noreply.github.com
          commit_author: github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>`;

export function ControlsPanel({
  config,
  fonts,
  activeTab,
  onTabChange,
  onUsernameChange,
  onUpdateSection,
  onStyleChange,
  onStyleTextChange,
  onGenerate,
  isGenerating,
  error,
}: ControlsPanelProps) {
  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
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
            <div className="space-y-2">
              <label className="text-sm font-semibold">Text</label>
              <textarea
                value={config.styleText ?? ''}
                onChange={(e) => onStyleTextChange(e.target.value)}
                className="w-full p-3 rounded-lg border bg-white dark:bg-black border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        )}

        {activeTab === 'setup' && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-lg">
              <h3 className="text-sm font-bold mb-2">Option 1: Manual (Static)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Simply copy the generated Markdown from the preview panel and paste it into your repository with the same name as your github username as a
                README.md
                file.
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-lg">
              <h3 className="text-sm font-bold text-blue-900 dark:text-blue-100 mb-2">
                Option 2: Automatic (Daily Updates)
              </h3>
              <ol className="list-decimal list-inside text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>Create a repository with the same name as your github username.</li>
                <li>
                  Copy <code>profile.config.json</code> in the repository root with the content below.
                </li>
                <li>
                  Copy <code>.github/workflows/update-readme.yml</code> and add it to the repository root.
                </li>
              </ol>
            </div>

            <CopyBlock title="1. profile.config.json" content={JSON.stringify(config, null, 2)} />

            <CopyBlock title="2. .github/workflows/update-readme.yml" content={WORKFLOW_YAML} language="yaml" />
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