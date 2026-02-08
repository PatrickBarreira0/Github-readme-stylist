'use server';

import { renderAscii, loadCustomFont, processTextForFont, generateReadmeContent, renderReadmeFromData, fetchGitHubData, addCatsToAscii } from '@github-readme-stylist/core';
import type { Config, GitHubData } from '@github-readme-stylist/core';
import path from 'path';
import fs from 'fs';

function findFontsDir() {
  const candidates = [
    path.resolve(process.cwd(), 'assets', 'fonts'),
    path.resolve(process.cwd(), '../../assets/fonts'),
    path.resolve(process.cwd(), '../../../assets/fonts'),
  ];

  for (const dir of candidates) {
    if (fs.existsSync(dir)) {
      return dir;
    }
  }
  return null;
}

export async function generateAsciiArt(text: string, font: string, showCats: boolean) {
  if (!text) return '';
  try {
    const fontsDir = findFontsDir();
    if (fontsDir) {
        loadCustomFont(font, fontsDir);
        const processedText = processTextForFont(text, font);
        const art = renderAscii(processedText, font);
        return showCats ? addCatsToAscii(art) : art;
    }
    const art = renderAscii(text, font);
    return showCats ? addCatsToAscii(art) : art;
  } catch (e) {
    console.error('Error generating ASCII art:', e);
    return 'Error generating ASCII art';
  }
}

export async function getFonts() {
  const fontsDir = findFontsDir();
  let customFonts: string[] = [];
  
  if (fontsDir && fs.existsSync(fontsDir)) {
    const files = fs.readdirSync(fontsDir);
    files.forEach(file => {
      if (file.endsWith('.flf')) {
        customFonts.push(file.replace('.flf', ''));
      }
    });
  }
  
  const standardFonts = [
    'Standard', 'Ghost', 'Graffiti', 'Slant', 'Big', 'Banner', 'Block', 'Bubble', 'Digital', 'Ivory', 'Mini', 'Script', 'Shadow', 'Small', 'Speed', 'Star Wars', 'Stop'
  ];
  
  // Return unique sorted fonts
  return Array.from(new Set([...standardFonts, ...customFonts])).sort();
}

export async function fetchGitHubDataForUser(username: string) {
    try {
        const token = process.env.GITHUB_TOKEN;
        if (!token) {
            throw new Error('GITHUB_TOKEN environment variable is not set on the server.');
        }
        const data = await fetchGitHubData(username, token);
        return { success: true, data };
    } catch (error: any) {
        console.error('Error fetching GitHub data:', error);
        return { success: false, error: error.message || 'Unknown error occurred' };
    }
}

export async function renderReadmeFromDataAction(config: Config, data: GitHubData) {
    try {
        const configCopy = structuredClone(config);
        if (configCopy.sections.ascii.enabled) {
            const fontsDir = findFontsDir();
            if (fontsDir) {
                loadCustomFont(configCopy.sections.ascii.font, fontsDir);
                configCopy.sections.ascii.text = processTextForFont(configCopy.sections.ascii.text, configCopy.sections.ascii.font);
            }
        }
        const content = renderReadmeFromData(data, configCopy);
        return { success: true, content };
    } catch (error: any) {
        console.error('Error rendering README:', error);
        return { success: false, error: error.message || 'Unknown error occurred' };
    }
}

export async function generateFullReadme(config: Config) {
    try {
        const token = process.env.GITHUB_TOKEN;
        if (!token) {
            throw new Error('GITHUB_TOKEN environment variable is not set on the server.');
        }
        const content = await generateReadmeContent(config, token);
        return { success: true, content };
    } catch (error: any) {
        console.error('Error generating README:', error);
        return { success: false, error: error.message || 'Unknown error occurred' };
    }
}

