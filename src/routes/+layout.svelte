<script lang="ts">
	import { onMount } from "svelte";
	import { browser } from "$app/environment";
	import { locale, useBrowserLocale } from "$lib/i18n";
	import { useBrowserTheme } from "$lib/theme";
	import LanguageSelector from "$lib/components/LanguageSelector.svelte";
	import ThemeToggle from "$lib/components/ThemeToggle.svelte";

	/* Este site é uma reportagem só, e o tema padrão dela é escuro: latão sobre
	   preto é o contraste em que os três modelos 3D leem melhor. Quem prefere
	   claro tem o botão do topo — o padrão, na ausência de escolha, segue o do
	   navegador. As duas paletas vivem abaixo em `:root`, atrás das mesmas
	   variáveis (--backgroundColor, --mainColor, --visitedColor, --fontFamily)
	   que o blog de origem já usava, para que uma correção lá continue valendo
	   aqui sem tradução de nomes. */

	onMount(() => {
		useBrowserLocale();
		useBrowserTheme();
	});

	// O `lang` do documento acompanha o seletor: leitor de tela e tradutor
	// automático dependem dele para saber em que idioma está o texto.
	$: if (browser) document.documentElement.lang = $locale;

	const credits = {
		pt: {
			byline: "Reportagem, código e modelos 3D de",
			photos: "Fotos do Wikimedia Commons, creditadas uma a uma ao pé de cada imagem.",
			disclaimer: "Reportagem produzida com auxílio de inteligência artificial. Caso perceba alguma informação errada, entre em contato com o autor",
			source: "Código-fonte"
		},
		en: {
			byline: "Reporting, code and 3D models by",
			photos: "Photographs from Wikimedia Commons, credited individually beneath each image.",
			disclaimer: "This report was produced with the aid of artificial intelligence. If you notice any incorrect information, please contact the author.",
			source: "Source code"
		}
	};

	$: foot = credits[$locale as keyof typeof credits] ?? credits.pt;
</script>

<div class="theme-corner">
	<LanguageSelector />
	<ThemeToggle />
</div>

<slot />

<footer>
	<p class="byline">
		{foot.byline}
		<a href="https://victorgois.com.br">Victor Góis</a>
	</p>
	<p class="fine">
		{foot.disclaimer}
	</p>
	<p class="fine">{foot.photos}</p>
	<p class="fine">
		<a href="https://github.com/victorgois/maquinasdesoprar" target="_blank">{foot.source}</a>
	</p>
</footer>

<style>
	/* Escuro é o padrão em `:root` — bate com o script inline de `app.html`,
	   que já resolveu `data-theme` antes desta folha carregar, e é o que vale
	   para quem não tem JS. Os atributos abaixo, escritos pelo mesmo script e
	   por `$lib/theme.ts`, sobrescrevem para claro quando é a vez dele. */
	:global(:root) {
		--backgroundColor: #1a1a1a;
		--mainColor: white;
		--secondaryColor: darkgray;
		--visitedColor: rgb(200, 232, 16);
		--fontFamily: "Fira Code", monospace;
	}

	/* #FDFBD4 é marfim — o par claro do latão sobre preto. O acento verde-limão
	   não lê nesse fundo, então vira o próprio latão; a tinta e o cinza mudam
	   junto para manter o contraste que o texto precisa. */
	:global(:root[data-theme="light"]) {
		--backgroundColor: #fdfbd4;
		--mainColor: #241f0f;
		--secondaryColor: #7a7048;
		--visitedColor: #8f6516;
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

	/* Fixos no topo e fora do fluxo: os controles precisam estar ao alcance em
	   qualquer ponto da rolagem, sem empurrar a abertura da matéria nem
	   competir com ela por espaço. */
	.theme-corner {
		position: fixed;
		top: 0.9rem;
		right: 0.9rem;
		z-index: 40;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	footer {
		margin-top: auto;
		padding: 2rem 1.5rem 3rem;
		border-top: 1px solid color-mix(in srgb, var(--mainColor) 18%, transparent);
		text-align: center;
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
