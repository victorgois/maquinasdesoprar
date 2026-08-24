import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// O site é uma página só, inteiramente do lado do cliente: 3D, áudio e
		// MIDI rodam no navegador e nada aqui precisa de servidor. Adapter
		// estático publica HTML puro — sem funções que não seriam usadas.
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: "404.html",
			precompress: false
		})
	}
};

export default config;
