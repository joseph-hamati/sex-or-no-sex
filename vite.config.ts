import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Actions supplies the repository name. Override with VITE_BASE_PATH if needed.
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = process.env.VITE_BASE_PATH ?? (process.env.GITHUB_ACTIONS && repositoryName ? `/${repositoryName}/` : '/')

export default defineConfig({
  plugins: [react()],
  base,
})
