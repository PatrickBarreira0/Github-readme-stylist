import fs from 'fs';
import { loadConfig } from './config.js';
import { fetchGitHubData } from './fetcher.js';

async function debug() {
    const config = loadConfig();
    const data = await fetchGitHubData(config.username);

    const output = {
        input: {
            config: config,
        },
        output: {
            githubData: data,
        },
    };

    const outputPath = 'debug-output.json';
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');
    
    console.log('Config input:');
    console.log(JSON.stringify(config, null, 2));
    console.log('\nGitHub API output:');
    console.log(JSON.stringify(data, null, 2));
    console.log(`\nFull output saved to: ${outputPath}`);
}

debug().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});