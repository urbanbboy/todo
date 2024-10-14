import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }]
    },
    server: {
        port: 3000
    },
    define: {
        __BASE_URL__: JSON.stringify('http://localhost:8000/api')
    }
})
