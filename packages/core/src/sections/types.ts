import type { GitHubData } from '../fetcher.js';
import type { Config } from '../config.js';

export interface Section {
    id: string;
    render(data: GitHubData, config: Config): string;
}





