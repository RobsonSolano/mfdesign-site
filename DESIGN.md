---
name: MF Designer
description: Portfólio de Mayara Ferreira — atelier de design, vitrine de um trabalho artesanal.
colors:
  gold: "#C9A35A"
  gold-deep: "#A6803E"
  gold-soft: "#E5C98B"
  ink: "#181612"
  ink-elevated: "#221F1A"
  ink-line: "#2E2A24"
  parchment: "#F7F4EE"
  parchment-elevated: "#FFFEFB"
  parchment-line: "#E6E1D7"
  ash: "#777268"
  ash-soft: "#B5AFA3"
typography:
  display:
    fontFamily: "Fraunces, 'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(2.5rem, 7vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Fraunces, 'Cormorant Garamond', Georgia, serif"
    fontSize: "clamp(1.75rem, 4vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, 'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, 'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, 'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  none: "0"
  sm: "2px"
  md: "4px"
  lg: "8px"
  xl: "16px"
  image: "12px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  xxl: "64px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.gold-deep}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.gold}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
    typography: "{typography.label}"
  button-ghost-hover:
    backgroundColor: "{colors.ink-elevated}"
    textColor: "{colors.gold}"
  card-image:
    backgroundColor: "{colors.ink-elevated}"
    rounded: "{rounded.image}"
    padding: "0"
  card-meta:
    backgroundColor: "transparent"
    textColor: "{colors.ash-soft}"
    rounded: "{rounded.none}"
    padding: "16px 0 0 0"
    typography: "{typography.body}"
  input-line:
    backgroundColor: "transparent"
    textColor: "{colors.parchment}"
    rounded: "{rounded.none}"
    padding: "12px 0"
    typography: "{typography.body}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.parchment}"
    rounded: "{rounded.none}"
    padding: "8px 0"
    typography: "{typography.label}"
---

# Design System: MF Designer

## 1. Overview

**Creative North Star: "The Atelier Window"**

O site é a vitrine de um ateliê de design. A UI é a moldura — discreta, deliberada, sem competir com o trabalho exposto. O herói é sempre o portfólio; a interface cede espaço pra ele respirar. O visitante chega em modo de avaliação silenciosa, percorre as peças, e sai com a sensação de que viu o trabalho de uma designer confiante.

A linguagem é editorial-modernista. Tipografia serif variável (Fraunces) carrega autoridade calma nos títulos; sans neutro (Inter) suporta o corpo sem chamar atenção. Um único acento dourado-antigo aparece com parcimônia — em CTAs, links, e detalhes que merecem peso. Tudo o mais é neutro warm: near-black em dark, parchment em light. Nenhum gradiente, nenhum neon, nenhuma sombra decorativa.

O sistema rejeita explicitamente: o template Bootstrap atual (gradiente roxo→rosa, cards uniformes, ar de "startup pessoal"); a estética SaaS dark com gradientes neon ("AI tool"); kitsch wedding (script + floral); portfólios tech-bro (monospace cinza-grafite).

**Key Characteristics:**
- Restrained palette: gold antigo + neutros warm. Zero gradientes.
- Tipografia faz o trabalho pesado: contraste serif/sans, escala generosa, hierarquia óbvia.
- Cards e superfícies flat. Sem shadow-glow decorativa.
- Mobile como tela primária; desktop é amplificação, não palco.
- Dark e light recebem o mesmo cuidado de execução.

## 2. Colors: A Paleta do Atelier

Paleta restrita por convicção: um acento metálico quente sobre neutros igualmente quentes. A rara presença do gold é o que dá peso à sua aparição.

### Primary
- **Atelier Gold** (`#C9A35A` / `oklch(76% 0.115 82)`): único acento saturado. CTAs principais, ativos de navegação, fios de divisão sob títulos, ícones de status crítico. Usado com parcimônia.
- **Atelier Gold Deep** (`#A6803E` / `oklch(62% 0.115 82)`): estado hover/pressed do gold. Também em texto sobre superfícies parchment quando o gold puro perderia contraste.
- **Atelier Gold Soft** (`#E5C98B` / `oklch(85% 0.085 85)`): destaque em texto, citações, badges. Quando o gold puro seria demais.

### Neutral (Dark Theme)
- **Ink** (`#181612` / `oklch(15% 0.005 80)`): background base do dark theme. Near-black tingido em direção ao quente.
- **Ink Elevated** (`#221F1A` / `oklch(20% 0.005 80)`): superfícies elevadas (cards, nav, footer). 1 step acima do base.
- **Ink Line** (`#2E2A24` / `oklch(25% 0.005 80)`): bordas, divisores. Quase invisível, intencional.

### Neutral (Light Theme)
- **Parchment** (`#F7F4EE` / `oklch(96% 0.008 80)`): background base do light theme. Off-white quente, nunca puro branco.
- **Parchment Elevated** (`#FFFEFB` / `oklch(99% 0.005 80)`): superfícies elevadas no light theme. Quase branco, mas ainda tingido.
- **Parchment Line** (`#E6E1D7` / `oklch(90% 0.012 80)`): bordas e divisores no light theme.

### Neutral (Text on opposite mode)
- **Ash** (`#777268` / `oklch(50% 0.008 80)`): body text secundário, captions. Funciona em ambos os temas.
- **Ash Soft** (`#B5AFA3` / `oklch(72% 0.008 80)`): meta text, labels descritivos no dark theme.

### Named Rules

**The Single Voice Rule.** Atelier Gold é a única cor saturada do sistema. Em qualquer tela, gold ocupa ≤10% da superfície. Sua raridade é o que dá peso.

**The Anti-Gradient Rule.** Gradientes são proibidos. Em texto (`background-clip: text`), em superfícies, em CTAs, em qualquer lugar. Hierarquia vem do peso tipográfico e do uso pontual do gold sólido, não de transições suaves entre cores.

**The Warm Neutral Rule.** Nenhum neutro é puro. Todo preto é tingido em direção ao gold (chroma 0.005–0.012, hue 80). Todo branco também. Pureza cromática parece estéril; calor é deliberado.

## 3. Typography

**Display Font:** Fraunces (com fallbacks `Cormorant Garamond, Georgia, serif`)
**Body Font:** Inter (com fallbacks `Plus Jakarta Sans, system-ui, sans-serif`)
**Label Font:** Inter — mesma família do body, em peso 600 + tracking +0.08em, geralmente uppercase.

**Character:** Fraunces traz personalidade variável e otimização ótica — autoridade calma com leve fragilidade nos eixos de softness. Inter é o neutro confiável, sem opinião própria, deixando o serif brilhar. O contraste serif-display + sans-body é a backbone do tom editorial.

### Hierarchy

- **Display** (Fraunces 400, `clamp(2.5rem, 7vw, 5rem)`, line-height 1.05, letter-spacing -0.02em): hero principal, título da página. Uma única ocorrência por tela.
- **Headline** (Fraunces 500, `clamp(1.75rem, 4vw, 2.75rem)`, line-height 1.15, -0.01em): título de seção. Marca o início de um bloco temático.
- **Title** (Inter 600, `clamp(1.125rem, 1.5vw, 1.375rem)`, line-height 1.3): título de card, subseção, nome de projeto na galeria.
- **Body** (Inter 400, `1rem`, line-height 1.6): texto longo. Largura máxima 65ch.
- **Label** (Inter 600, `0.75rem`, line-height 1.2, letter-spacing 0.08em, UPPERCASE): navegação, botões, badges, metadata de projeto.

### Named Rules

**The Serif-for-Voice Rule.** Apenas Display e Headline usam Fraunces. Tudo o mais é Inter. Misturar serifa em UI pequena empobrece o ritmo.

**The 65ch Rule.** Body text nunca passa de 65 caracteres de largura. Acima disso, força quebra com `max-width`.

**The Caps Are Earned Rule.** UPPERCASE só em Label (tracking +0.08em). Nunca em Display, nunca em Body, nunca em Headline.

## 4. Elevation

Sistema flat por convicção. Nenhuma superfície tem shadow em repouso. Profundidade é construída por **tonal layering** — cada nível de elevação muda 1 step de lightness no neutro warm, mantendo a paleta coesa.

Hover é a única exceção: pode revelar uma soft glow (shadow ambient) em superfícies clicáveis, mas com chroma baixíssima — nunca uma cor saturada.

### Tonal Layers (dark)
- **Base** (`#181612`): background da página.
- **Surface +1** (`#221F1A`): cards, nav, footer.
- **Surface +2** (`#2E2A24`): elementos dentro de cards (input fields em card de form, por ex).

### Hover Shadow (raro)
- **`box-shadow: 0 2px 24px rgba(201, 163, 90, 0.08)`** — uma sombra dourada quase imperceptível, só em hover de cards de projeto. Sugere profundidade sem decorar.

### Named Rules

**The Flat By Default Rule.** Cards, nav, footer, sections — todos flat em repouso. Nenhum drop-shadow padrão.

**The No Shadow Cards Rule.** Cards de projeto (galeria) podem ter um hover-glow dourado ultra-sutil. Cards informativos (skills, educação) permanecem flat até quando hover.

## 5. Components

### Buttons

Funcionalidade nua: tipografia em label uppercase, retângulo levemente arredondado, zero shadow.

- **Shape:** retângulo com cantos suavemente arredondados (`4px`).
- **Primary:** background gold (`#C9A35A`), text ink (`#181612`), padding `14px 28px`, label typography (Inter 600 12px tracking +0.08em UPPER).
- **Hover:** background gold-deep (`#A6803E`), sem transform.
- **Focus:** outline `2px solid #C9A35A` com `outline-offset: 2px`.
- **Ghost:** background transparent, text gold, border `1px solid {colors.ink-line}` (dark) ou `1px solid {colors.parchment-line}` (light). Hover preenche com `ink-elevated`.
- **WhatsApp flutuante:** circular (`rounded.pill`), background gold, ícone ink. Sutilmente visível, não invasivo.

### Cards

#### Card de projeto (galeria)
- **Shape:** `border-radius: 12px` (image-friendly).
- **Background:** `ink-elevated` no dark, `parchment-elevated` no light.
- **Border:** none por padrão. Hover revela hover-shadow dourada.
- **Internal padding:** zero ao redor da imagem (fica edge-to-edge); meta info abaixo da imagem em `padding: 16px 0 0 0`.
- **Meta typography:** Title (Inter 600) pro nome do projeto; Label (Inter 600 uppercase) pra categoria. Atelier Gold só na categoria (3-5 caracteres por categoria, raro).

#### Card informativo (skills, educação, depoimentos)
- **Shape:** `border-radius: 4px` (mais editorial, menos "image card").
- **Background:** `ink-elevated` no dark, `parchment-elevated` no light.
- **Border:** `1px solid {colors.ink-line}` ou `parchment-line`.
- **Internal padding:** `24px`.
- **NUNCA nested cards.** Card dentro de card é prohibido.

### Inputs (form de contato)

Estilo underline-only — minimal e editorial.

- **Style:** sem background, sem border (apenas `border-bottom: 1px solid {colors.ink-line}` no dark, `parchment-line` no light). Padding `12px 0`.
- **Label:** flutuante sutil, em Label typography (Inter 600 12px tracking +0.08em UPPER), `ash-soft` no dark / `ash` no light.
- **Focus:** `border-bottom-color: gold`, label vira `gold`. Transição 200ms ease-out.
- **Error:** `border-bottom-color: gold-deep` (não vermelho — coerência cromática). Mensagem inline em Body typography com cor `gold-deep`.

### Navigation

- **Style:** horizontal bar, sticky no topo. Background `ink` (dark) / `parchment` (light), border-bottom `1px solid {colors.ink-line}`.
- **Logo:** "MF Designer" em Fraunces 500 1.375rem.
- **Links:** Label typography (Inter 600 12px tracking +0.08em UPPER). Default `parchment` (dark) / `ink` (light). Hover: `gold`. Active: `gold` com underline gold `2px` em `text-underline-offset: 6px`.
- **Theme toggle:** ícone simples (sun/moon), sem caixa em volta. Hover muda pra gold.
- **Mobile:** menu colapsado com hamburger em label uppercase ("MENU"); abre full-height side drawer com mesmos estilos.

### Signature: Gallery Plate

Componente custom pra galeria expandida em `/galeria`. Imagem do projeto edge-to-edge no card. Abaixo, três linhas:
1. **Categoria** em Label gold uppercase (ex.: "MÍDIA SOCIAL", "LOGOTIPO").
2. **Nome do projeto** em Title (Inter 600).
3. **Cliente / contexto** em Body Ash (1-2 linhas, opcional).

Click expande pra lightbox (lightgallery), mantém o mesmo card-meta abaixo da imagem no overlay.

## 6. Do's and Don'ts

### Do:
- **Do** usar **Atelier Gold em ≤10% da superfície** (regra The Single Voice). Aparece em CTAs primários, links ativos, ícones críticos, underlines de seção.
- **Do** carregar a hierarquia visual com **peso tipográfico** (Display Fraunces 400 vs Body Inter 400 = contraste enorme por família, não por cor).
- **Do** tingir todo neutro em direção ao gold (chroma 0.005–0.012, hue ~80). Pretos puros (`#000`) e brancos puros (`#fff`) são proibidos.
- **Do** dar à galeria ar para respirar — `padding: clamp(40px, 8vw, 96px)` em volta da grid de projetos.
- **Do** tratar o tema light com o **mesmo nível de polish** do dark. Sem "dark default + light afterthought".

### Don't:
- **Don't** usar **gradientes**. Em texto (`background-clip: text` + gradient), em superfícies, em CTAs. Em lugar nenhum. (Era a estética principal do site antigo — está oficialmente morta.)
- **Don't** repetir o **template Bootstrap genérico** — cards idênticos uniformes, hierarquia plana, gradiente roxo→rosa, ar de "startup pessoal". É o anti-reference primário.
- **Don't** usar **dark com neon roxo/azul** (estética "AI tool" / SaaS). O dark do Atelier é warm e silencioso, não eletrônico.
- **Don't** usar **script fonts** ou paleta rosa-bebê-com-dourado (kitsch wedding). Atelier Gold é antigo e seco, não chamativo.
- **Don't** usar **shadows em cards informativos**. Flat em repouso. Hover de cards de projeto é a única exceção, e é uma glow gold ultra-sutil.
- **Don't** usar **side-stripe borders** (`border-left: 4px solid gold`). Border completo de 1px ou nada.
- **Don't** misturar **serif em UI miúda**. Fraunces fica restrito a Display e Headline. Tudo abaixo de Title é Inter.
- **Don't** abusar de **animations**. Apenas transitions de estado (200-300ms ease-out). Reduced-motion respeitado.
- **Don't** usar **em dashes** (—) em UI copy. Use vírgula, dois-pontos, parênteses, ou ponto.
