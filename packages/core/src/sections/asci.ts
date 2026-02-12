import figlet from 'figlet';
import type { Section } from './types.js';
import type { GitHubData } from '../fetcher.js';
import type { Config } from '../config.js';
import { addCatsToAscii } from '../ascii/cats.js';
import { customFonts } from '../ascii/custom-fonts.js';
import { bundledFonts } from '../ascii/generated/index.js';

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

function getFontContent(fontName: string): string | undefined {

    if (customFonts[fontName]) return customFonts[fontName];
    if (bundledFonts[fontName]) return bundledFonts[fontName];

    const lowerName = fontName.toLowerCase();
    const foundKey = Object.keys(bundledFonts).find(key => key.toLowerCase() === lowerName);
    
    if (foundKey) {
        return bundledFonts[foundKey];
    }

    return undefined;
}

export function renderAscii(text: string, font: string = 'Standard'): string {
    let textToRender = text.trim();
    if (!textToRender) {
        throw new Error('ASCII text cannot be empty');
    }

    const fontContent = getFontContent(font);

    if (fontContent) {
        const patchedContent = patchFlfSpace(fontContent);

        figlet.parseFont(font, patchedContent);
        
        textToRender = processTextForFont(textToRender, font);
    } 

    return figlet.textSync(textToRender, { 
        font: font as any, 
        width: 1000, 
        whitespaceBreak: true 
    });
}

export const asciiSection: Section = {
    id: 'ascii',
    render(_data: GitHubData, config: Config): string {
        const { text, font } = config.sections.ascii;
        const art = renderAscii(text, font);
        
        const output = config.sections.ascii.showCats ? addCatsToAscii(art) : art;
        const styleText = config.style === 'classic' ? (config.styleText ?? '').trim() : '';
        const suffix = styleText ? `\n${styleText}` : '';
        return `\`\`\`text\n${output}${suffix}\n\`\`\``;
    },
};