import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

const content = JSON.parse(readFileSync(new URL('./content/portfolio.json', import.meta.url), 'utf8'))
const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character])

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'portfolio-meta',
      transformIndexHtml(html) {
        return html
          .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(content.site.title)}</title>`)
          .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(content.site.description)}" />`)
          .replace(/<meta name="application-name" content="[^"]*"\s*\/>/, `<meta name="application-name" content="${escapeHtml(content.site.applicationName)}" />`)
      },
    },
  ],
})
