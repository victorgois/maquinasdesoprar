import { browser } from "$app/environment";
import { writable } from "svelte/store";

/**
 * Idioma da reportagem.
 *
 * O texto todo vive em `$lib/instruments/copy.ts`, em pt e en — este módulo só
 * guarda qual dos dois está na tela. Não há dicionário de chaves porque não há
 * mais nada para traduzir: o site é uma página só.
 *
 * O padrão é português: a matéria nasceu em português e o domínio também.
 */
const fallbackLocale = "pt";

export const locales = ["pt", "en"];

/**
 * O idioma do navegador, quando for um dos dois que a reportagem tem.
 *
 * `navigator.languages` já vem na ordem de preferência de quem lê, e só
 * interessa a parte antes do hífen — `pt-BR`, `pt-PT` e `pt` são todos `pt`.
 */
function detectLocale(): string {
	if (!browser) return fallbackLocale;

	const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];

	for (const tag of preferred) {
		const base = tag?.toLowerCase().split("-")[0];
		if (base && locales.includes(base)) return base;
	}

	return fallbackLocale;
}

export const locale = writable(fallbackLocale);

/**
 * Aplica o idioma do navegador. Roda no `onMount` do layout — e não na criação
 * da store — para que a primeira renderização no cliente seja igual à do HTML
 * pré-gerado, que não tem `navigator`. Depois disso, quem manda é o seletor.
 */
export function useBrowserLocale() {
	locale.set(detectLocale());
}
