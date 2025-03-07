import { build } from 'esbuild';

build({
    entryPoints: ['src/contactmodal.js'],
    bundle: true,
    outfile: 'dist/contactmodal.min.js',
    minify: true,
    loader: { '.html': 'text', '.css': 'text' },
    format: 'iife',
    target: 'es6'
}).catch(() => process.exit(1));