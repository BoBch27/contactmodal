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

build({
    entryPoints: ['src/contactmodal.js'],
    bundle: true,
    outfile: 'dist/contactmodal.min.js',
    minify: true,
    loader: { '.html': 'text' },
    format: 'iife',
    target: 'es6',
    plugins: [CSSMinifyPlugin],
}).catch(() => process.exit(1));