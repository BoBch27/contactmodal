import { transform, context } from 'esbuild';
import { readFile } from "fs/promises";

const isDev = process.argv.includes('--watch');

// helper to build+watch a specific config
const buildOrWatch = async (config, label) => {
    const ctx = await context(config);
    if (isDev) {
        await ctx.watch();
        console.log(`👀 Watching ${label}...`);
    } else {
        await ctx.rebuild();
        await ctx.dispose();
        console.log(`✅ Built ${label}`);
    }
};

const CSSMinifyPlugin = {
    name: "CSSMinifyPlugin",
    setup(build) {
        build.onLoad({ filter: /\.css$/ }, async (args) => {
            const f = await readFile(args.path);
            const css = await transform(f, { loader: "css", minify: true });
            return { loader: "text", contents: css.code };
        });
    }
};

const commonConfig = {
    entryPoints: ['src/contactmodal.js'],
    bundle: true,
    minify: true,
    target: 'es6',
    loader: { '.html': 'text' },
    plugins: [CSSMinifyPlugin],
};

// IIFE version for <script src="...">
await buildOrWatch({
    ...commonConfig,
    outfile: 'dist/contactmodal.min.js',
    format: 'iife',
}, 'IIFE');

// ESM version for npm imports
await buildOrWatch({
    ...commonConfig,
    outfile: 'dist/contactmodal.esm.js',
    format: 'esm',
}, 'ESM');