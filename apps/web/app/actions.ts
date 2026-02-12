'use server';

import { 
  renderAscii, 
  generateReadmeContent, 
  fetchGitHubData, 
  addCatsToAscii, 
  renderReadmeFromData,
  customFontNames
} from '@github-readme-stylist/core';
import type { Config, GitHubData } from '@github-readme-stylist/core';

export async function generateAsciiArt(text: string, font: string, showCats: boolean) {
  if (!text) return '';
  try {

    const art = renderAscii(text, font);
    return showCats ? addCatsToAscii(art) : art;
  } catch (e: any) {
    return '';
  }
}

export async function getFonts() {
  const standardFonts = [
    'Standard', 'Keyboard','Ghost', 'Graffiti', 'Slant', 'Big', 'Banner', 
    'Block', 'Bubble', 'Mini', 'Script', 'Shadow', 'Small', 'Speed', 
    'Star Wars', 'Avatar', 'Big Money-SE', 'BlurVision ASCII', 'Chiseled'
  ];
  
  const allFonts = [...standardFonts, ...customFontNames];

  return Array.from(new Set(allFonts)).sort();
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
        const errorMessage = error.message || 'Unknown error occurred';
        
        if (errorMessage.startsWith('INVALID_USERNAME:')) {
            return { success: false, error: errorMessage.replace('INVALID_USERNAME:', '') };
        }
        
        if (errorMessage.startsWith('GENERIC_ERROR:')) {
            return { success: false, error: errorMessage.replace('GENERIC_ERROR:', '') };
        }
        
        return { success: false, error: 'An unexpected error occurred. Please try again later.' };
    }
}

export async function renderReadmeFromDataAction(config: Config, data: GitHubData) {
    try {
        const content = renderReadmeFromData(data, config);
        return { success: true, content };
    } catch (error: any) {
        return { success: false, error: 'Failed to generate README preview. Please try again.' };
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
        const errorMessage = error.message || 'Unknown error occurred';
        
        if (errorMessage.startsWith('INVALID_USERNAME:')) {
            return { success: false, error: errorMessage.replace('INVALID_USERNAME:', '') };
        }
        
        if (errorMessage.startsWith('GENERIC_ERROR:')) {
            return { success: false, error: errorMessage.replace('GENERIC_ERROR:', '') };
        }
        
        return { success: false, error: 'Failed to generate README. Please try again later.' };
    }
}