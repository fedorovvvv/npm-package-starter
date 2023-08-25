import path from 'path'
import {globSync} from 'glob'
import { defineConfig } from 'vite'
import {name} from './package.json'
import config from './config'
import dts from 'vite-plugin-dts'

const srcFiles = globSync(path.resolve(__dirname, 'src/**/*.{ts,js}+(|x)'))

export default defineConfig({
    plugins: [
        dts()
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