import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const terminalLogger = () => ({
  name: 'terminal-logger',
  configureServer(server) {
    server.middlewares.use('/__client-log', (req, res, next) => {
      if (req.method !== 'POST') {
        next()
        return
      }

      let body = ''

      req.on('data', (chunk) => {
        body += chunk
      })

      req.on('end', () => {
        try {
          const log = JSON.parse(body)
          console.log(`[client:${log.type}] ${log.time} - ${log.message}`)
        } catch {
          console.log(`[client] ${body}`)
        }

        res.statusCode = 204
        res.end()
      })
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), terminalLogger()],
})
