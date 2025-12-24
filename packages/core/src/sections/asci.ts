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

export const asciiSection: Section = {
    id: 'ascii',
    render(_data: GitHubData, config: Config): string {
        let { text, font } = config.sections.ascii;

        const customFontPath = path.resolve(process.cwd(), 'assets', 'fonts', `${font}.flf`);
        if (fs.existsSync(customFontPath)) {
            const fontData = fs.readFileSync(customFontPath, 'utf8');
            figlet.parseFont(font, fontData);

            const hasUpper = hasInk(font, 65);
            const hasLower = hasInk(font, 97);

            if (hasUpper && !hasLower) {
                text = text.toUpperCase();
            } else if (hasLower && !hasUpper) {
                text = text.toLowerCase();
            }
        }

        const art = renderAscii(text, font);
        return `\`\`\`text\n${art}\n\`\`\``;
    },
};

