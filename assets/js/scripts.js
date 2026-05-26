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
        el.checked = theme === 'light';
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
        el.setAttribute('aria-label', 'Alternar entre tema claro e escuro');
        el.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme') || 'dark';
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    });
});

// === Tooltips Bootstrap ===
document.addEventListener('DOMContentLoaded', function () {
    if (typeof bootstrap === 'undefined') return;
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (el) { return new bootstrap.Tooltip(el); });
});

// === LightGallery (galeria de projetos) ===
document.addEventListener('DOMContentLoaded', function () {
    var galerias = document.querySelectorAll('.galeria-projetos');
    if (typeof lightGallery === 'undefined') return;
    galerias.forEach(function (g) {
        lightGallery(g, { selector: '.lightgallery-item' });
    });
});

// === LightSlider (depoimentos) — respeita prefers-reduced-motion ===
if (typeof jQuery !== 'undefined') {
    jQuery(function ($) {
        if (!$('#lightSlider').length) return;
        var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        $('#lightSlider').lightSlider({
            item: 3,
            autoWidth: true,
            slideMove: 1,
            slideMargin: 16,
            mode: 'slide',
            useCSS: true,
            cssEasing: 'ease',
            easing: 'linear',
            speed: 600,
            auto: !reduceMotion,
            loop: !reduceMotion,
            slideEndAnimation: true,
            pause: 5000,
            keyPress: true,
            controls: true,
            prevHtml: '',
            nextHtml: '',
            adaptiveHeight: false,
            pager: true,
            enableTouch: true,
            enableDrag: true,
            freeMove: true,
            swipeThreshold: 40,
            responsive: [
                { breakpoint: 1399, settings: { item: 2, slideMove: 1, slideMargin: 16 } },
                { breakpoint: 991, settings: { item: 2, slideMove: 1, slideMargin: 16 } },
                { breakpoint: 700, settings: { item: 1, slideMove: 1, slideMargin: 8 } }
            ]
        });
    });
}

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
        (ok ? 'success' : 'warning') + '">' +
        '<h5>' + msg + '</h5>' +
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
