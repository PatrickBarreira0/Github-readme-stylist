import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const figletEntry = require.resolve('figlet');
let figletRoot = path.dirname(figletEntry);

let fontsDir = path.join(figletRoot, 'fonts');

if (!fs.existsSync(fontsDir)) {
    figletRoot = path.join(figletRoot, '..');
    fontsDir = path.join(figletRoot, 'fonts');
}

if (!fs.existsSync(fontsDir)) {
    process.exit(1);
}

const outputDir = path.join(__dirname, '../src/ascii/generated');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(fontsDir).filter(f => f.endsWith('.flf'));

const imports: string[] = [];
const mapEntries: string[] = [];


files.forEach((file, index) => {
    const fontName = file.replace('.flf', '');
    const varName = `font_${index}`; 
    
    const srcPath = path.join(fontsDir, file);
    const destPath = path.join(outputDir, file);
    
    fs.copyFileSync(srcPath, destPath);

    imports.push(`import ${varName} from './${file}';`);
    mapEntries.push(`  '${fontName}': ${varName},`);
});

const content = `// This file is auto-generated. Do not edit.
// It bundles all standard figlet fonts so they are available in Vercel/Serverless environments.

${imports.join('\n')}

export const bundledFonts: Record<string, string> = {
${mapEntries.join('\n')}
};
`;

fs.writeFileSync(path.join(outputDir, 'index.ts'), content);