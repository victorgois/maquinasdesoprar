# Máquinas de soprar

Reportagem interativa sobre a mecânica de três instrumentos de sopro — trompete,
saxofone e trombone. A pessoa rola o texto e os três modelos 3D se desmontam
junto com a leitura; no fim, um teclado (do computador, do mouse ou de um
controlador MIDI) toca os instrumentos e mostra o dedilhado correspondente.

Publicada em [maquinasdesoprar.art](https://maquinasdesoprar.art). Nasceu como
uma página do blog [victorgois.dev](https://victorgois.dev) e ganhou domínio
próprio.

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera build/ — HTML estático
npm run preview  # serve o build
npm run check    # tipos e diagnósticos do Svelte
```

Node 22 ou mais novo (o Vite 8 exige ≥ 20.19).

## Como o projeto está organizado

O site é uma página só, inteiramente do lado do cliente — não há servidor, e o
build gera HTML estático.

```
src/routes/+page.svelte          a reportagem inteira: narrativa, palcos 3D e oficina
src/routes/+layout.svelte        paleta escura, tipografia e rodapé
src/lib/instruments/
  copy.ts                        todo o texto, em pt e en
  types.ts                       o contrato entre modelo 3D, dedilhado e áudio
  builder.ts, geometry.ts,       a fábrica de peças: tornos, curvas e materiais
  materials.ts
  trumpet.ts, saxophone.ts,      um arquivo por instrumento — a geometria de cada um
  trombone.ts
  fingerings.ts                  dedilhados, transposição e nomes de nota
  audio.ts                       síntese (Tone.js), carregada só quando alguém toca
  midi.ts                        Web MIDI e o mapa do teclado do computador
  tracks.ts, spotify.ts          as gravações citadas e o embed que as toca
src/lib/components/instruments/  visor 3D, mostrador do mecanismo, teclado, espectro
static/images/instruments/       as fotos, em duas larguras e dois formatos
```

O `three` e o `tone` entram por `import()` dinâmico: quem só lê o texto não
baixa nenhum dos dois.

## Sobre as fotos

Vêm do Wikimedia Commons e cada uma carrega, na própria página, o crédito na
forma exigida pela licença. O crédito está em `copy.ts`, junto do texto que
contextualiza a imagem — se a foto mudar, o crédito muda no mesmo lugar.

## Licença

MIT, para o código. As fotografias seguem as licenças de origem, creditadas uma
a uma.
