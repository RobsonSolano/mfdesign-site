// === Tema (data-theme + localStorage, com fallback prefers-color-scheme) ===
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    // Ícones do toggle
    document.querySelectorAll('.tema-dark-icon').forEach(function (el) {
        el.classList.toggle('d-block', theme === 'dark');
        el.classList.toggle('d-none', theme !== 'dark');
    });
    document.querySelectorAll('.tema-light-icon').forEach(function (el) {
        el.classList.toggle('d-block', theme === 'light');
        el.classList.toggle('d-none', theme !== 'light');
    });

    // Estado a11y do switch
    document.querySelectorAll('.alterar-tema').forEach(function (el) {
        el.setAttribute('aria-checked', theme === 'light' ? 'true' : 'false');
    });

    document.querySelectorAll('meta[name="theme-color"]').forEach(function (el) {
        el.setAttribute('content', theme === 'light' ? '#ffffff' : '#0e0e11');
    });

    try { localStorage.setItem('theme', theme); } catch (e) {}
}

function getInitialTheme() {
    try {
        var saved = localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    // Sem preferência salva: dark default (PRODUCT.md), mas respeita system se for light explícito
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    return 'dark';
}

// Aplica imediatamente (antes do DOMContentLoaded pra evitar flash)
setTheme(getInitialTheme());

document.addEventListener('DOMContentLoaded', function () {
    // Reaplica pra atualizar os ícones depois que o DOM existe
    setTheme(document.documentElement.getAttribute('data-theme') || 'dark');

    document.querySelectorAll('.alterar-tema').forEach(function (el) {
        el.setAttribute('role', 'switch');
        el.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme') || 'dark';
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    });
});

// === LightGallery (projetos) ===
document.addEventListener('DOMContentLoaded', function () {
    if (typeof lightGallery === 'undefined') return;
    document.querySelectorAll('.galeria-projetos').forEach(function (g) {
        lightGallery(g, {
            selector: '.lightgallery-item',
            download: false,
            counter: true,
            hash: false,
            thumbnail: false
        });
    });
});

// === Mural de feedbacks: indicadores da faixa deslizante ===
// A faixa existe só até 991px (ver mfdesign.css). Os indicadores mostram a
// posição, levam até cada print e ligam o esmaecimento das bordas.
document.addEventListener('DOMContentLoaded', function () {
    var mural = document.querySelector('.mural');
    var dots = document.querySelector('.mural-dots');
    if (!mural || !dots) return;

    var itens = [].slice.call(mural.querySelectorAll('.mural__item'));
    if (itens.length < 2) return;

    // Mantém o número da dica em sincronia com a quantidade real de prints
    var total = document.querySelector('.mural-dica [data-total]');
    if (total) total.textContent = itens.length;

    var base = itens[0].offsetLeft;
    itens.forEach(function (item, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Ver depoimento ' + (i + 1) + ' de ' + itens.length);
        b.addEventListener('click', function () {
            var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            mural.scrollTo({ left: item.offsetLeft - base, behavior: reduz ? 'auto' : 'smooth' });
        });
        dots.appendChild(b);
    });

    var botoes = [].slice.call(dots.children);
    function marcar(i) {
        botoes.forEach(function (b, j) {
            if (j === i) b.setAttribute('aria-current', 'true');
            else b.removeAttribute('aria-current');
        });
    }
    marcar(0);

    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (e) {
                if (e.isIntersecting) marcar(itens.indexOf(e.target));
            });
        }, { root: mural, threshold: 0.6 });
        itens.forEach(function (item) { io.observe(item); });
    }

    // A faixa sangra 20px além do container, então em repouso o scrollLeft é o
    // próprio padding, não zero: o limite tem que considerar isso. Medido fora
    // do handler pra não forçar cálculo de estilo a cada evento de scroll.
    var folgaInicial = 0;
    function medirFolga() {
        folgaInicial = (parseFloat(getComputedStyle(mural).paddingLeft) || 0) + 4;
    }
    function bordas() {
        var rolavel = mural.scrollWidth - mural.clientWidth > 4;
        mural.classList.toggle('tem-mais-esquerda', rolavel && mural.scrollLeft > folgaInicial);
        mural.classList.toggle('tem-mais-direita', rolavel && mural.scrollLeft + mural.clientWidth < mural.scrollWidth - 4);
    }
    medirFolga();
    bordas();
    mural.addEventListener('scroll', bordas, { passive: true });
    window.addEventListener('resize', function () { medirFolga(); bordas(); });
});

// === Máscara de telefone (form de contato) ===
(function () {
    var tel = document.querySelector('input[attrname=maskphone]');
    if (!tel || typeof VMasker === 'undefined') return;
    var telMask = ['(99) 9999-99999', '(99) 99999-9999'];
    VMasker(tel).maskPattern(telMask[0]);
    tel.addEventListener('input', function (e) {
        var c = e.target;
        var v = c.value.replace(/\D/g, '');
        var m = c.value.length > 14 ? 1 : 0;
        VMasker(c).unMask();
        VMasker(c).maskPattern(telMask[m]);
        c.value = VMasker.toPattern(v, telMask[m]);
    });
})();

// === Submit do form via Web3Forms (AJAX) ===
function renderFlash(container, ok, customMsg) {
    var msg = customMsg || (ok
        ? '<strong>Contato enviado com sucesso.</strong><br>Em breve retorno o seu contato.'
        : '<strong>Não foi possível enviar o contato.</strong><br>Verifique os campos e tente novamente.');
    container.innerHTML =
        '<div class="flash-message d-flex justify-content-center">' +
        '<div class="w-100 text-center alert-dismissible fade show alert flash alert-' +
        (ok ? 'success' : 'warning') + '" role="status">' +
        '<p class="mb-0">' + msg + '</p>' +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>' +
        '</div></div>';
}

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    var btn = document.querySelector('.js-btn-enviar-email');
    var container = document.querySelector('.flash-message-container');
    if (!form || !btn) return;

    var originalLabel = btn.textContent;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        var keyInput = form.querySelector('input[name="access_key"]');
        if (!keyInput || !keyInput.value) {
            if (container) {
                renderFlash(container, false,
                    '<strong>Formulário não configurado.</strong><br>Configure a access_key do Web3Forms antes de receber contatos.');
            }
            return;
        }

        btn.textContent = 'Enviando...';
        btn.disabled = true;

        var formData = new FormData(form);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data && data.success) {
                    if (container) renderFlash(container, true);
                    form.reset();
                } else {
                    if (container) renderFlash(container, false);
                }
            })
            .catch(function () {
                if (container) renderFlash(container, false);
            })
            .finally(function () {
                btn.textContent = originalLabel;
                btn.disabled = false;
            });
    });
});
