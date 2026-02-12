import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: '../../dist/index.js',
  format: 'cjs',
  loader: {
    '.flf': 'text'
  },
  banner: {
    js: `
// Polyfills for bundled code
if (typeof __dirname === 'undefined') {
  global.__dirname = '.';
}
if (typeof __filename === 'undefined') {
  global.__filename = 'index.js';
}
if (typeof import.meta === 'undefined') {
  global.import = { meta: { url: 'file:///' + __dirname + '/' + __filename } };
}
    `.trim()
  },
  mainFields: ['module', 'main'],
  define: {
    'import.meta.url': '"file:///dist/index.js"'
  }
});