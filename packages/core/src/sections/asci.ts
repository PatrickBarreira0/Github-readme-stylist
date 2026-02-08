import figlet from 'figlet';
import fs from 'fs';
import path from 'path';
import type { Section } from './types.js';
import type { GitHubData } from '../fetcher.js';
import type { Config } from '../config.js';

export function renderAscii(text: string, font: string = 'Standard'): string {
    const trimmed = text.trim();
    if (!trimmed) {
        throw new Error('ASCII text cannot be empty');
    }
    return figlet.textSync(trimmed, { 
        font: font as any, 
        width: 1000, 
        whitespaceBreak: true 
    });
}

function hasInk(fontName: string, charCode: number): boolean {
    const font = (figlet as any).figFonts?.[fontName];
    if (!font) return false;
    const glyph = font[charCode];
    if (!glyph) return false;
    const hardBlank = font.options?.hardBlank;
    return glyph.some((line: string) => {
        let cleaned = line;
        if (hardBlank) {
            cleaned = line.split(hardBlank).join(' ');
        }
        return cleaned.trim().length > 0;
    });
}

    // Helper to patch 0-width space in FLF data
    function patchFlfSpace(data: string): string {
    if (data.charCodeAt(0) === 0xFEFF) {
        data = data.slice(1);
    }

    const lines = data.split(/\r?\n/);
    const header = lines[0];

    if (!header || !header.startsWith('flf2a')) return data;

    const hardblank = header.charAt(5); 
    
    const headerParts = header.split(' ');

    const heightStr = headerParts[1] ?? '0';
    const commentLinesStr = headerParts[5] ?? '0';

    const height = parseInt(heightStr, 10);
    const commentLines = parseInt(commentLinesStr, 10);
    
    if (isNaN(height) || isNaN(commentLines)) return data;

    const spaceStartIndex = 1 + commentLines;

    if (lines.length >= spaceStartIndex + height) {
        let isEmpty = true;
        for (let i = 0; i < height; i++) {
            const line = lines[spaceStartIndex + i];
           
            if (!line || !/^@+$/.test(line)) {
                isEmpty = false;
                break;
            }
        }

        if (isEmpty) {
            const spacer = hardblank.repeat(4); 
            for (let i = 0; i < height; i++) {
                const line = lines[spaceStartIndex + i];
                if (line !== undefined) {
                    lines[spaceStartIndex + i] = spacer + line;
                }
            }
            return lines.join('\n');
        }
    }
    
    return data;
}

export function loadCustomFont(font: string, fontsDir: string): boolean {
    const customFontPath = path.resolve(fontsDir, `${font}.flf`);
    if (fs.existsSync(customFontPath)) {
        let fontData = fs.readFileSync(customFontPath, 'utf8');
        fontData = patchFlfSpace(fontData);
        figlet.parseFont(font, fontData);
        return true;
    }
    return false;
}

export function processTextForFont(text: string, font: string): string {
    const hasUpper = hasInk(font, 65);
    const hasLower = hasInk(font, 97);

    if (hasUpper && !hasLower) {
        return text.toUpperCase();
    } else if (hasLower && !hasUpper) {
        return text.toLowerCase();
    }
    return text;
}

export const asciiSection: Section = {
    id: 'ascii',
    render(_data: GitHubData, config: Config): string {
        let { text, font } = config.sections.ascii;

        const fontsDir = path.resolve(process.cwd(), 'assets', 'fonts');
        if (loadCustomFont(font, fontsDir)) {
             text = processTextForFont(text, font);
        }

        const art = renderAscii(text, font);
        return `\`\`\`text\n${art}\n\`\`\``;
    },
};
