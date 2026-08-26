<script lang="ts">
	import { dark, setDark } from "$lib/theme";
	import { locale } from "$lib/i18n";

	/* Só um par de rótulos, junto do próprio botão — como o `credits` do
	   layout, não vale abrir uma chave no dicionário grande de `copy.ts` por
	   duas palavras. */
	const labels = {
		pt: { toLight: "Mudar para tema claro", toDark: "Mudar para tema escuro" },
		en: { toLight: "Switch to light theme", toDark: "Switch to dark theme" }
	};

	$: t = labels[$locale as keyof typeof labels] ?? labels.pt;
	$: label = $dark ? t.toLight : t.toDark;
</script>

<button type="button" class="theme-toggle" on:click={() => setDark(!$dark)} aria-label={label} title={label}>
	{#if $dark}
		<!-- Sol: o tema para o qual o clique leva. -->
		<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
			<circle cx="12" cy="12" r="4.2" fill="currentColor" />
			<g stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
				<path d="M12,2.5 V5.5" />
				<path d="M12,18.5 V21.5" />
				<path d="M2.5,12 H5.5" />
				<path d="M18.5,12 H21.5" />
				<path d="M4.9,4.9 L7,7" />
				<path d="M17,17 L19.1,19.1" />
				<path d="M19.1,4.9 L17,7" />
				<path d="M7,17 L4.9,19.1" />
			</g>
		</svg>
	{:else}
		<!-- Lua: idem. -->
		<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
			<path
				d="M20,14.2 C18.6,14.9 17,15.3 15.4,15.3 C9.9,15.3 5.5,10.9 5.5,5.4 C5.5,3.8 5.9,2.2 6.6,0.8 C3.4,2.4 1.3,5.7 1.3,9.6 C1.3,15.1 5.7,19.5 11.2,19.5 C15,19.5 18.3,17.4 20,14.2 Z"
				fill="currentColor"
				transform="translate(1.5,1.8) scale(0.92)"
			/>
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		padding: 0;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--mainColor) 18%, transparent);
		background: color-mix(in srgb, var(--backgroundColor) 55%, transparent);
		backdrop-filter: blur(6px);
		color: var(--secondaryColor);
		cursor: pointer;
		transition: color 0.2s ease, border-color 0.2s ease;
	}

	.theme-toggle:hover {
		color: var(--visitedColor);
		border-color: var(--visitedColor);
	}

	.theme-toggle svg {
		width: 1.05rem;
		height: 1.05rem;
	}
</style>
