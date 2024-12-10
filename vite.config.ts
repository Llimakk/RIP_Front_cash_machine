import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    base: "/",
    server: {
        host: true,
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:8000",
                changeOrigin: true,
                secure: false,
            }
        },
    },
    plugins: [
        react(),
        tsconfigPaths()
    ]
})