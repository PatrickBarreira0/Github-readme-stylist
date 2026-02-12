import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: '../../dist/index.cjs',
  format: 'cjs',
  loader: {
    '.flf': 'text'
  },
  define: {
    'import.meta.url': '"file:///dist/index.cjs"'
  }
});