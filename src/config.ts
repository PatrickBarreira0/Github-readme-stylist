import fs from 'fs';
import path from 'path';

export interface AsciiConfig {
    enabled: boolean;
    text: string;
    font: string;
}

export interface StatsConfig {
    enabled: boolean;
    showCommits: boolean;
    showStars: boolean;
    showFollowers: boolean;
}

export interface LanguagesConfig {
    enabled: boolean;
    topN: number;
}

export interface SectionsConfig {
    ascii: AsciiConfig;
    stats: StatsConfig;
    languages: LanguagesConfig;
}

export interface Config {
    username: string;
    sections: SectionsConfig;
}

export function loadConfig(configPath?: string): Config {
    const resolvedPath = configPath ?? path.resolve(process.cwd(), 'profile.config.json');
    const raw = fs.readFileSync(resolvedPath, 'utf-8');
    return JSON.parse(raw) as Config;
}

