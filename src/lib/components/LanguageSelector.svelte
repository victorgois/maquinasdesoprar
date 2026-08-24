<script lang="ts">
	import { locale, locales } from "$lib/i18n";
</script>

<select bind:value={$locale} aria-label="Idioma / Language">
	{#each locales as l}
		<option value={l}>{l}</option>
	{/each}
</select>

<style>
	select {
		cursor: pointer;
		width: 45px;
		height: fit-content;
		font-size: medium;
		font-weight: 500;
		font-family: var(--fontFamily);
		background: transparent;
		border: none;
		color: var(--mainColor);
	}
</style>
