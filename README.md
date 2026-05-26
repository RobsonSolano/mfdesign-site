# MF Designer — Portfólio (versão estática)

Site estático em HTML/CSS/JS puro, pronto para deploy na Vercel. Originalmente desenvolvido em CodeIgniter 3; migrado para estático para hospedagem gratuita sem necessidade de runtime PHP.

**Produção:** https://mfdesign.vercel.app
**Repositório:** https://github.com/RobsonSolano/mfdesign-site

---

## Estrutura

```
.
├── index.html              # Home: hero, galeria resumida, sobre, CTA, depoimentos, skills, educação
├── galeria.html            # Projetos em layout expandido + formulário de contato
├── 404.html                # Página de erro
├── vercel.json             # Configuração do Vercel (cleanUrls)
└── assets/
    ├── css/                # styles.css (Bootstrap custom) + lightslider.css
    ├── js/                 # scripts.js (tema, validações, AJAX form) + lightslider.js
    ├── img/                # imagens estáticas
    │   ├── projetos/       # 6 imagens da galeria
    │   └── depoimentos/    # 7 imagens do carrossel
    └── mayararibeiroferreira.pdf
```

## Rodando localmente

Por ser estático puro, basta abrir `index.html` no navegador — mas o ideal é servir via HTTP local para o `fetch` do form e os caminhos absolutos `/galeria` funcionarem corretamente.

```bash
# Python 3
python3 -m http.server 8080

# Node (npx)
npx serve .

# PHP (se já estiver instalado)
php -S localhost:8080
```

Abra http://localhost:8080.

## Configurando o formulário de contato (Web3Forms)

O formulário em `/galeria#contato` envia via [Web3Forms](https://web3forms.com/) — serviço gratuito que entrega emails sem necessidade de backend.

1. Acesse https://web3forms.com/ e gere uma `access_key` (basta informar o email `mdesigner044@gmail.com`).
2. Em `galeria.html`, localize o input hidden:
   ```html
   <input type="hidden" name="access_key" value="8639006d-0584-4b1f-861c-20cbe8971743" />
   ```
3. Substitua `8639006d-0584-4b1f-861c-20cbe8971743` pela chave recebida.
4. (Opcional) Em web3forms.com configure o domínio `mfdesign.vercel.app` no allowlist — a access_key é exposta no HTML por design; a proteção contra abuso é feita por domínio no painel do Web3Forms.

Enquanto a access_key não for configurada, o submit exibe uma mensagem de erro avisando que o formulário não está configurado.

## Deploy na Vercel

1. Conecte o repositório `RobsonSolano/mfdesign-site` na Vercel.
2. **Framework Preset:** `Other` (sem framework — HTML estático).
3. **Build Command:** *(vazio — sem build)*.
4. **Output Directory:** *(vazio — usa a raiz)*.
5. **Install Command:** *(vazio)*.

A Vercel detecta automaticamente `vercel.json` e aplica `cleanUrls: true`, fazendo com que:
- `/` sirva `index.html`
- `/galeria` sirva `galeria.html`
- `/galeria.html` redirecione para `/galeria`
- Rotas inexistentes caiam em `404.html`

## Notas da migração

- **Tema (dark/light):** antes via `$_SESSION` do PHP; agora via `localStorage` (chave `theme`). Padrão `dark`.
- **Templating:** os antigos `view_header`, `view_navigation`, `view_inicio`, `view_footer` foram consolidados em cada HTML. Há duplicação entre `index.html` e `galeria.html` — ao editar nav/footer, alterar em ambos.
- **Formulário:** antes via `PHPMailer` no backend; agora via Web3Forms (client-side AJAX).
- **Galeria expandida:** títulos/descrições dos 6 projetos em `galeria.html` são genéricos — substituir pelos dados reais de cada peça.
