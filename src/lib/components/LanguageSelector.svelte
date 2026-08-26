<script lang="ts">
	import { locale, locales } from "$lib/i18n";
</script>

<select class="language-select" bind:value={$locale} aria-label="Idioma / Language">
	{#each locales as l}
		<option value={l}>{l}</option>
	{/each}
</select>

<style>
	/* Mesmo tratamento visual do botão de tema ao lado — pílula com borda e
	   fundo desfocado — para que os dois leiam como um par, não como dois
	   controles soltos. */
	.language-select {
		cursor: pointer;
		height: 2rem;
		padding: 0 0.6rem;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--mainColor) 18%, transparent);
		background: color-mix(in srgb, var(--backgroundColor) 55%, transparent);
		backdrop-filter: blur(6px);
		color: var(--secondaryColor);
		font-family: var(--fontFamily);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		transition: color 0.2s ease, border-color 0.2s ease;
	}

	.language-select:hover,
	.language-select:focus-visible {
		color: var(--visitedColor);
		border-color: var(--visitedColor);
	}

	.language-select option {
		/* `<option>` ignora `backdrop-filter`/transparência — cor sólida evita
		   texto ilegível no menu nativo do navegador. */
		background: var(--backgroundColor);
		color: var(--mainColor);
	}
</style>
