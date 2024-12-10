import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    base: "/Front_cash_machine",
    server: {
        host: true,
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:8000",
                changeOrigin: true,
                rewrite: (path) => path,
            }
        },
    },
    plugins: [
        react(),
        tsconfigPaths(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
              enabled: true,
            },
        })
    ]
})