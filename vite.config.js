import typescript2 from 'rollup-plugin-typescript2'
import path from 'path'
import {globSync} from 'glob'
import { defineConfig } from 'vite'
import {name} from './package.json'
import config from './config'

const srcFiles = globSync(path.resolve(__dirname, 'src/**/*.{ts,js}+(|x)'))

export default defineConfig({
    plugins: [
        {
            ...typescript2(),
            apply: 'build',
        }
    ],
    build: {
        minify: false,
        emptyOutDir: true,
        lib: {
            entry: srcFiles,
            name,
            fileName: name,
        },
        rollupOptions: {
            input: srcFiles,
            output: config.formats.map(format => {
                return {
                    format,
                    strict: false,
                    chunkFileNames: `[name].[hash].[format].js`,
                    entryFileNames: `[name].${format}.js`,
                    preserveModules: true,
                }
            })
        }
    },
})