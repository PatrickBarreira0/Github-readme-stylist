'use server';

import { renderAscii, loadCustomFont, processTextForFont, generateReadmeContent } from '@github-readme-stylist/core';
import type { Config } from '@github-readme-stylist/core';
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

export async function generateAsciiArt(text: string, font: string) {
  if (!text) return '';
  try {
    const fontsDir = findFontsDir();
    if (fontsDir) {
        loadCustomFont(font, fontsDir);
        const processedText = processTextForFont(text, font);
        return renderAscii(processedText, font);
    }
    return renderAscii(text, font);
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

export async function generateFullReadme(config: Config) {
    try {
        if (config.sections.ascii.enabled) {
            const fontsDir = findFontsDir();
            if (fontsDir) {
                loadCustomFont(config.sections.ascii.font, fontsDir);
                config.sections.ascii.text = processTextForFont(config.sections.ascii.text, config.sections.ascii.font);
            }
        }

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

