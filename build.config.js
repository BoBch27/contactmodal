import { transform, build } from 'esbuild';
import { readFile } from "fs/promises";

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
build({
    ...commonConfig,
    outfile: 'dist/contactmodal.min.js',
    format: 'iife',
}).catch(() => process.exit(1));

// ESM version for npm imports
build({
    ...commonConfig,
    outfile: 'dist/contactmodal.esm.js',
    format: 'esm',
}).catch(() => process.exit(1));