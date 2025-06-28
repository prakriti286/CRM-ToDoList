import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/CRM-ToDoList/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') 
    }
  },
  test: {
    environment: 'jsdom', // For Jest-like behavior
    globals: true         // Optional but helps for test setup
  }
})
