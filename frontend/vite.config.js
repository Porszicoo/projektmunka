import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      "@components/*": "src/ui/components/*",
      "@icons/*": "src/ui/icons/*",
      "@utils/*": "src/utils/*"
    }
  }
})
