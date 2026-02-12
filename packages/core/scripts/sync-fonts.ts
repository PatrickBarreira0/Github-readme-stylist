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
    console.error('Figlet fonts directory not found');
    process.exit(1);
}

const outputDir = path.join(__dirname, '../src/ascii/generated');

if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(outputDir, { recursive: true });

const wantedFonts = new Set([
  'Standard.flf',
  'Keyboard.flf',
  'Ghost.flf',
  'Graffiti.flf',
  'Slant.flf',
  'Big.flf',
  'Banner.flf',
  'Block.flf',
  'Bubble.flf',
  'Mini.flf',
  'Script.flf',
  'Shadow.flf',
  'Small.flf',
  'Speed.flf',
  'Star Wars.flf',
  'Avatar.flf',
  'Big Money-se.flf',
  'BlurVision ASCII.flf', 
  'Chiseled.flf'
]);

const files = fs.readdirSync(fontsDir).filter(f => wantedFonts.has(f));

const imports: string[] = [];
const mapEntries: string[] = [];

files.forEach((file) => {
    const fontName = file.replace('.flf', '');
    // Sanitize filename for variable usage
    const safeVarName = fontName.replace(/[^a-zA-Z0-9]/g, '_'); 
    // Sanitize filename for disk (figlet sometimes has spaces)
    const safeFileName = file.replace(/[^a-zA-Z0-9.-]/g, '_');
    
    const srcPath = path.join(fontsDir, file);
    const destPath = path.join(outputDir, safeFileName);
    
    fs.copyFileSync(srcPath, destPath);

    const safeKey = fontName.replace(/'/g, "\\'");
    
    imports.push(`import ${safeVarName} from './${safeFileName}';`);
    mapEntries.push(`  '${safeKey}': ${safeVarName},`);
});

const content = `${imports.join('\n')}

export const bundledFonts: Record<string, string> = {
${mapEntries.join('\n')}
};
`;

fs.writeFileSync(path.join(outputDir, 'index.ts'), content);