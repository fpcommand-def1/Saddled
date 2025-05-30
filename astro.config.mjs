// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site:'https://saddled.com',
    vite: {

        plugins: [tailwindcss()],
    },
    output: 'server',
    integrations: [react(), mdx(), sitemap()]
});