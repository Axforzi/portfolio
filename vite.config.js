import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project at https://axforzi.github.io/portfolio/, not at
// the domain root. A relative base ('./') resolves assets against the current URL,
// which breaks on any deep path such as /portfolio/projects -- the request would go
// to /portfolio/projects/assets/index-*.js and 404. The base has to be absolute.
const PROJECT_BASE = '/portfolio/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: PROJECT_BASE,
})
