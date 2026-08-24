<script lang="ts">
	import { page } from "$app/stores";
	import { locale } from "$lib/i18n";

	const copy = {
		pt: { title: "Página não encontrada", back: "Ir para a reportagem" },
		en: { title: "Page not found", back: "Go to the feature" }
	};

	$: c = copy[$locale as keyof typeof copy] ?? copy.pt;
</script>

<svelte:head>
	<title>{$page.status} — Máquinas de soprar</title>
</svelte:head>

<section>
	<p class="code">{$page.status}</p>
	<h1>{c.title}</h1>
	<p><a href="/">{c.back}</a></p>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		min-height: 70vh;
		padding: 2rem;
		text-align: center;
	}

	.code {
		margin: 0;
		font-size: 3rem;
		color: #d9a441;
	}

	h1 {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 500;
	}
</style>
