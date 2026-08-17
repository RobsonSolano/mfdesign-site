---
name: MF Designer
description: Portfólio de Mayara Ferreira, designer gráfica. Vitrine de projetos com identidade própria em degradê.
register: brand
colors:
  brand-blue: "#1e30f3"
  brand-pink: "#e21e80"
  brand-deep: "#a01d8f"
  gradient-brand: "linear-gradient(135deg, #1e30f3 0%, #e21e80 100%)"
  ink: "#0e0e11"
  ink-elevated: "#16171a"
  ink-line: "#26262d"
  ink-line-strong: "#35353f"
  parchment: "#ffffff"
  parchment-elevated: "#f7f7f8"
  parchment-line: "#e4e3e8"
  text-secondary-dark: "#b4b1bd"
  text-muted-dark: "#a09daa"
  text-secondary-light: "#5b5862"
  text-muted-light: "#66626e"
  accent-text-dark: "#f2489b"
  accent-text-light: "#c2186c"
typography:
  display:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  role:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.6vw, 1.625rem)"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  rule: "3px"
  control: "10px"
  surface: "14px"
  panel: "20px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  xxl: "64px"
components:
  button-primary:
    background: "{colors.gradient-brand}"
    textColor: "#ffffff"
    rounded: "{rounded.control}"
    padding: "15px 28px"
    typography: "{typography.label}"
  button-ghost:
    background: "transparent"
    textColor: "{colors.parchment}"
    border: "1px solid {colors.ink-line-strong}"
    rounded: "{rounded.control}"
    padding: "15px 28px"
    typography: "{typography.label}"
  gallery-plate:
    background: "{colors.ink-elevated}"
    border: "1px solid {colors.ink-line}"
    rounded: "{rounded.surface}"
    imageAspect: "1 / 1"
  definition-list:
    background: "transparent"
    separator: "1px solid {colors.ink-line}"
    padding: "24px 0"
  chip:
    background: "{colors.ink-elevated}"
    border: "1px solid {colors.ink-line}"
    rounded: "{rounded.control}"
    padding: "11px 18px"
    typography: "{typography.label}"
  input-line:
    background: "transparent"
    borderBottom: "1px solid {colors.ink-line-strong}"
    rounded: "{rounded.rule}"
    padding: "24px 0 8px"
---

# Design System: MF Designer

Este documento descreve o sistema que está implementado em `assets/css/mfdesign.css`. Os tokens acima são o espelho do `:root` daquele arquivo; ao mudar um, mude os dois.

## 1. Overview

**North star: o projeto é o herói, a interface é a moldura.**

O portfólio existe para responder três perguntas em segundos: quem é a profissional, o que ela sabe fazer, e ela consegue provar isso. Tudo que compete com as peças de design perde espaço.

A identidade é o degradê azul→rosa sobre fundo escuro. Ele não foi abandonado: foi concentrado. Aparece em superfícies que emolduram ou convidam, nunca dentro do conteúdo:

- moldura da foto do hero;
- botão primário;
- fio de 44px abaixo de cada título de seção;
- painel de contato;
- botão flutuante de WhatsApp.

Fora desses pontos, a página é neutro escuro (ou neutro claro, no tema light) com tipografia carregando a hierarquia.

**Características:**

- Montserrat como família única; hierarquia por peso (800 no nome, 700 em títulos, 600 em rótulos, 400 no corpo) e por escala fluida.
- Superfícies chapadas. Sombra só em hover de peça clicável e sob o botão primário.
- Dark é o padrão; light recebe o mesmo cuidado e os dois passam WCAG AA.
- Mobile é a tela principal: a maior parte do tráfego vem de Instagram e WhatsApp.

## 2. Cores

Estratégia: **committed**. Um degradê de marca carrega a personalidade em pontos estratégicos, sobre uma base de neutros levemente puxados para o violeta (entre o azul e o rosa da marca).

### Marca

- **Brand Blue** (`#1e30f3`): início do degradê.
- **Brand Pink** (`#e21e80`): fim do degradê. Também é a cor de borda/fio de acento.
- **Brand Deep** (`#a01d8f`): estado hover sobre superfícies claras.

### Texto de acento

Rosa puro tem 4.4:1 no escuro e 4.4:1 no branco, insuficiente para texto miúdo. Existe um token separado só para texto:

- **accent-text (dark)** `#f2489b`, 5.7:1 sobre `ink`.
- **accent-text (light)** `#c2186c`, 5.8:1 sobre branco.

Use `--accent` para fios, bordas e decoração; `--accent-text` sempre que a cor for de texto.

### Neutros

Dark: `ink` (#0e0e11) base, `ink-elevated` (#16171a) para cards, `ink-line` (#26262d) para filetes, `ink-line-strong` (#35353f) para bordas de controle.

Light: branco base, `#f7f7f8` elevado, `#e4e3e8` filete.

Texto: `text-primary` (branco ou ink), `text-secondary` para rótulos, `text-muted` para corpo descritivo. Os quatro valores de secondary/muted foram escolhidos por medição: todos ficam entre 5.5:1 e 9:1 nos dois temas.

### Regras nomeadas

**Degradê só em superfície.** Nunca `background-clip: text`. Texto em degradê enfraquece a leitura e é a marca visual de template genérico. Hierarquia vem de peso e escala.

**O acento é raro.** O rosa aparece em categoria de projeto, link ativo, fio de seção e marcadores de lista. Nada mais.

**Neutro nenhum é puro cinza.** Todos têm um resto de violeta, coerente com o degradê.

## 3. Tipografia

Família única: **Montserrat**. A escolha é herdada da identidade que já estava no ar e foi mantida de propósito.

- **Display** (800, `clamp(2.5rem, 6vw, 3.75rem)`, tracking -0.03em): o nome dela, uma vez por página.
- **Headline** (700, `clamp(1.75rem, 3.5vw, 2.25rem)`): título de seção.
- **Role** (600, `clamp(1.25rem, 2.6vw, 1.625rem)`): a profissão, logo abaixo do nome, em `accent-text`.
- **Title** (600, 1.125rem): nome de projeto, termo de lista.
- **Body** (400, 1rem, line-height 1.65): texto corrido, no máximo 68ch.
- **Label** (600, 0.8125rem, tracking 0.1em, caixa alta): navegação, botões, categoria de projeto, rótulos de case.

**Caixa alta é ganha.** Só em Label. Nunca em título, nunca em corpo.

## 4. Elevação

Sistema chapado. Profundidade vem de um degrau de luminosidade (`base` → `elevated`) e de filete de 1px.

Exceções, ambas intencionais:

- `box-shadow: 0 6px 20px -8px rgba(226,30,128,0.55)` sob o botão primário, para ele parecer clicável.
- `box-shadow: 0 18px 40px -20px rgba(0,0,0,0.6)` + `translateY(-2px)` no hover da peça de projeto.

## 5. Componentes

### Gallery Plate

A peça central. Imagem em janela quadrada **1:1** (`object-fit: cover`), porque as peças são apresentações de marca em 1:1 onde cada faixa da composição conta, do logotipo no topo à paleta no rodapé; recortar em 3:2 comeria justamente as pontas. A janela fixa alinha a grade mesmo se entrar uma peça de outro formato. Metadata abaixo: categoria em Label rosa, nome em Title, contexto em body muted. Na página de galeria o mesmo componente recebe um mini case com Objetivo, Desenvolvimento e Resultado.

Clique abre lightbox (lightgallery.js). O botão de download é escondido no CSS: o trabalho é para ver, não para baixar.

### Lista de definição

Para habilidades e educação. Filetes horizontais, termo à esquerda em Title, descrição à direita em body muted, duas colunas a partir de 768px. Escolhida deliberadamente em vez de grade de cards: cinco cards iguais com título e parágrafo é o padrão que faz um portfólio parecer template.

### Chips

Rótulos curtos em linha, com `flex-wrap`. Usados em Ferramentas e no bloco Competências (empatia, resiliência e afins), que fica **abaixo** da lista de habilidades: primeiro o que ela produz, depois como ela trabalha. Chip é para palavra curta; se precisar de descrição, é lista de definição.

### Mural de feedbacks

Os 7 prints de conversa, cada um no tamanho natural. Nada de altura forçada nem `object-fit: cover`: recortar print corta mensagem.

Dois modos, decididos por espaço disponível e não por dispositivo:

- **Até 991px:** faixa deslizante horizontal (`display: flex` + `scroll-snap-type: x mandatory`), cards em `min(82%, 420px)`, sangrando 20px além do container para o próximo card aparecer. O teto de 420px evita que o print passe da largura natural de 560px e fique borrado. Nessa faixa o container só comporta uma coluna, e empilhar 7 prints daria um paredão de scroll.

  Card espiando não é affordance suficiente: ninguém entende que rola para o lado. São três sinais somados, e nessa ordem de clareza:
  1. **Aviso explícito** acima da faixa, em `accent-text` com ícone de seta dupla ("Arraste para o lado para ver os 7"). É HTML estático, funciona sem JS.
  2. **Indicadores de posição** abaixo, um por print, gerados pelo `scripts.js`. O ativo estica e ganha o degradê. São `<button>` de 40x44px com `aria-label` e `aria-current`, e levam até o print com scroll suave (respeitando `prefers-reduced-motion`). Quem acompanha a posição é um `IntersectionObserver` com a própria faixa como `root`.
  3. **Esmaecimento das bordas** via `mask-image`, ligado por classe conforme a posição do scroll, então a máscara só aparece do lado que ainda tem conteúdo. O limite considera o padding da sangria: em repouso o `scrollLeft` é 20px, não zero.
- **De 992px para cima:** `columns: 340px`, ou seja, o navegador cria quantas colunas de 340px couberem (2 em notebook, 3 em tela larga). Sem `column-count` fixo e sem breakpoint: a coluna nunca fica estreita o bastante para a mensagem virar ilegível.

O container leva `role="group"`, `tabindex="0"` e `aria-label`, porque região com scroll precisa ser alcançável pelo teclado.

Alturas de coluna ficam desiguais de propósito: é mural, e igualar exigiria cortar conteúdo.

### Botões

Retângulo de raio 10px, Label em caixa alta. Primário em degradê com sombra colorida; fantasma transparente com borda `ink-line-strong`. Sobre o painel de degradê, o fantasma inverte para fundo branco.

### Navegação

Barra com filete inferior. Links em Label, ativo em `accent-text` com sublinhado rosa de 2px. Toggle de tema é um `<button>` de 44px com `role="switch"` e `aria-checked`, focável pelo teclado.

## 6. Raio

Uma escala, três degraus, aplicada sem exceção:

- **10px** em controles: botão, chip, toggle, ícone de rodapé.
- **14px** em superfícies: peça de projeto, card, print de feedback.
- **20px** em painéis: moldura da foto, painel de contato.
- **999px** só no botão flutuante.

Raio interno é concêntrico: a foto do hero tem 12px dentro de uma moldura de 20px com 18px de padding.

## 7. Do's and Don'ts

### Do

- **Do** manter o degradê nos cinco pontos listados no Overview. Ele é a identidade.
- **Do** medir contraste antes de escolher cor de texto. Os tokens atuais passam AA nos dois temas.
- **Do** dar à grade de projetos mais espaço vertical que a qualquer outra seção (`.secao--destaque`).
- **Do** usar `.secao--compacta` em ferramentas e educação: são as seções de menor prioridade.
- **Do** declarar `width`/`height` e `loading="lazy"` em toda imagem, para não haver salto de layout.
- **Do** servir as derivadas `-grade.webp` (1200x1200) na grade e `-full.webp` no lightbox.

### Don't

- **Don't** usar degradê em texto.
- **Don't** transformar habilidades, ferramentas ou educação em grade de cards iguais.
- **Don't** forçar altura igual nos prints de feedback.
- **Don't** apontar `<img>` para os originais de 3 a 4 MB em `assets/img/projetos/`. Eles são o arquivo-fonte.
- **Don't** usar travessão em texto de interface. Vírgula, dois-pontos ou parênteses.
- **Don't** adicionar seção nova sem tirar outra. O portfólio é enxuto de propósito.
