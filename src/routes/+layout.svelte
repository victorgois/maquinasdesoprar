<script lang="ts">
	import { onMount } from "svelte";
	import { browser } from "$app/environment";
	import { locale, useBrowserLocale } from "$lib/i18n";
	import LanguageSelector from "$lib/components/LanguageSelector.svelte";

	/* Este site é uma reportagem só, e ela nasce escura: latão sobre preto é o
	   contraste em que os três modelos 3D leem melhor. Não há alternador de
	   tema — a paleta é fixa, declarada abaixo em `:root`, e a matéria lê essas
	   variáveis (--backgroundColor, --mainColor, --visitedColor, --fontFamily).
	   Elas guardam os mesmos nomes do blog de onde a reportagem veio, para que
	   uma correção lá continue valendo aqui sem tradução de nomes. */

	onMount(useBrowserLocale);

	// O `lang` do documento acompanha o seletor: leitor de tela e tradutor
	// automático dependem dele para saber em que idioma está o texto.
	$: if (browser) document.documentElement.lang = $locale;

	const credits = {
		pt: {
			byline: "Reportagem, código e modelos 3D de",
			photos: "Fotos do Wikimedia Commons, creditadas uma a uma ao pé de cada imagem.",
			source: "Código-fonte"
		},
		en: {
			byline: "Reporting, code and 3D models by",
			photos: "Photographs from Wikimedia Commons, credited individually beneath each image.",
			source: "Source code"
		}
	};

	$: foot = credits[$locale as keyof typeof credits] ?? credits.pt;
</script>


<slot />

<footer>
	<div class="row">
		<LanguageSelector />
		<p class="byline">
			{foot.byline}
			<a href="https://victorgois.dev">Victor Góis</a>
		</p>
	</div>
	<p class="fine">{foot.photos}</p>
	<p class="fine">
		<a href="https://github.com/victorgois/maquinasdesoprar">{foot.source}</a>
	</p>
</footer>

<style>
	:global(:root) {
		--backgroundColor: #1a1a1a;
		--mainColor: white;
		--secondaryColor: darkgray;
		--visitedColor: rgb(200, 232, 16);
		--fontFamily: "Fira Code", monospace;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		min-height: 100vh;
		width: 100%;
		/* A matéria tem faixas de foto que sangram para fora da coluna; sem isto
		   o mobile ganha uma barra horizontal. */
		overflow-x: hidden;
		background-color: var(--backgroundColor);
		color: var(--mainColor);
		font-family: var(--fontFamily);
		line-height: 1.75;
	}

	:global(#svelte) {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
	}

	:global(a) {
		color: var(--visitedColor);
		text-decoration: none;
	}

	:global(a:hover) {
		text-decoration: underline;
	}

	:global(::selection) {
		color: var(--backgroundColor);
		background: var(--mainColor);
	}

	footer {
		margin-top: auto;
		padding: 2rem 1.5rem 3rem;
		border-top: 1px solid color-mix(in srgb, var(--mainColor) 18%, transparent);
		text-align: center;
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 0.75rem;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
	}

	.byline {
		margin: 0;
		font-size: 0.8rem;
	}

	.fine {
		margin: 0.5rem 0 0;
		font-size: 0.7rem;
		color: var(--secondaryColor);
	}

	.fine a {
		color: var(--secondaryColor);
	}
</style>
