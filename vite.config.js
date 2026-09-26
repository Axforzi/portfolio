import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// maikeldev.site is the canonical domain and is served from the domain root,
// so the app lives at "/" and the base must be "/".
//
// This used to be '/portfolio/', which is correct only for the GitHub Pages
// project URL axforzi.github.io/portfolio/. Both hosts serve this same branch,
// but a project-path site puts the app under /portfolio/ while a custom domain
// puts it at /, and one build cannot satisfy both with an absolute base. Under
// '/portfolio/' every asset request on maikeldev.site went to
// /portfolio/assets/*, 404'd, and got answered with the HTML 404 page -- which a
// module script refuses to execute, so the site rendered blank. Changing the
// base here is what fixes it; public/404.html's APP_ROOT must match this value.
//
// 'axforzi.github.io/portfolio/' no longer serves the site. Note the custom
// domain is mapped in GitHub Pages settings rather than by a CNAME file in the
// branch, which is deliberate: 'npm run deploy' uses --remove and would delete a
// CNAME on every publish.
const PROJECT_BASE = '/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: PROJECT_BASE,
})
