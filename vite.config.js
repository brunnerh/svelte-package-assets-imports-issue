import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	mode: 'development',
	plugins: [svelte()],
	build: { minify: false, assetsInlineLimit: 0 },
	optimizeDeps: {
		force: true,
	},
});
