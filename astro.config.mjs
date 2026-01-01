// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://ab54s.github.io/obsidian-astro-digital-garden/',
    base: '/obsidian-astro-digital-garden',
  vite: {
    plugins: [tailwindcss()]
  }
});
