import { browser } from "$app/environment";
import { writable } from "svelte/store";

/**
 * Tema da página: claro ou escuro.
 *
 * O padrão é o tema do navegador de quem lê (`prefers-color-scheme`). Um
 * script inline em `app.html` já decide isso antes da primeira pintura — lá
 * mora a explicação de por quê — e grava a escolha no atributo `data-theme`
 * do `<html>`, que é o que a folha de estilo lê. Este módulo só espelha esse
 * atributo numa store, para os componentes que precisam do valor em JS (a cor
 * do latão, o acento do osciloscópio), e cuida da troca manual.
 *
 * Segue o mesmo desenho do idioma em `i18n.ts`: a store nasce com o padrão do
 * site — aqui, escuro — e só passa a valer o que o navegador (ou a pessoa)
 * escolheu no `onMount` do layout, para a primeira renderização no cliente
 * bater com o HTML pré-gerado.
 */
const STORAGE_KEY = "theme";

export const dark = writable(true);

let media: MediaQueryList | null = null;

export function useBrowserTheme() {
	if (!browser) return;
	dark.set(document.documentElement.dataset.theme !== "light");

	media = window.matchMedia("(prefers-color-scheme: dark)");
	media.addEventListener("change", (event) => {
		// Só o navegador decide daqui em diante se a pessoa nunca trocou o tema
		// à mão — a escolha manual, uma vez feita, vale até ela mudar de novo.
		if (!localStorage.getItem(STORAGE_KEY)) dark.set(event.matches);
	});
}

/** Troca o tema e grava a escolha — a partir daqui o navegador não manda mais. */
export function setDark(value: boolean) {
	dark.set(value);
	if (!browser) return;
	localStorage.setItem(STORAGE_KEY, value ? "dark" : "light");
	document.documentElement.dataset.theme = value ? "dark" : "light";
}
