import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/CRM-ToDoList/', // For GitHub Pages deploy (correct)
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Required for @ alias to work
    }
  },
  test: {
    environment: 'jsdom', // For Jest-like behavior
    globals: true         // Optional but helps for test setup
  }
})
