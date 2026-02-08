import fs from 'fs';
import path from 'path';

export interface AsciiConfig {
    enabled: boolean;
    text: string;
    font: string;
    showCats: boolean;
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

export interface ActivityConfig {
    enabled: boolean;
    limit: number;
}

export interface SectionsConfig {
    ascii: AsciiConfig;
    stats: StatsConfig;
    languages: LanguagesConfig;
    activity: ActivityConfig;
}

export type ReadmeStyle = 'classic' | 'compact' | 'terminal';

export interface Config {
    username: string;
    style?: ReadmeStyle;
    sections: SectionsConfig;
}

export function loadConfig(configPath?: string): Config {
    const resolvedPath = configPath ?? path.resolve(process.cwd(), 'profile.config.json');
    const raw = fs.readFileSync(resolvedPath, 'utf-8');
    return JSON.parse(raw) as Config;
}





