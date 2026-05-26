// === Tema (persistido em localStorage) ===
function applyTheme(theme) {
    var opposite = theme === 'dark' ? 'light' : 'dark';

    document.body.classList.remove('bg-' + opposite);
    document.body.classList.add('bg-' + theme);

    document.querySelectorAll('.bg-' + opposite).forEach(function (el) {
        el.classList.remove('bg-' + opposite);
        el.classList.add('bg-' + theme);
    });

    if (theme === 'light') {
        document.querySelectorAll('.nav-link').forEach(function (el) { el.classList.remove('text-light'); });
        document.querySelectorAll('.tema-dark-icon').forEach(function (el) {
            el.classList.remove('d-block'); el.classList.add('d-none');
        });
        document.querySelectorAll('.tema-light-icon').forEach(function (el) {
            el.classList.remove('d-none'); el.classList.add('d-block');
        });
    } else {
        document.querySelectorAll('.nav-link').forEach(function (el) { el.classList.add('text-light'); });
        document.querySelectorAll('.tema-light-icon').forEach(function (el) {
            el.classList.remove('d-block'); el.classList.add('d-none');
        });
        document.querySelectorAll('.tema-dark-icon').forEach(function (el) {
            el.classList.remove('d-none'); el.classList.add('d-block');
        });
    }

    try { localStorage.setItem('theme', theme); } catch (e) {}
}

// Aplica tema salvo no carregamento (HTML padrão é dark; só atua se estiver salvo light)
(function () {
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    if (saved && saved !== 'dark') {
        document.addEventListener('DOMContentLoaded', function () { applyTheme(saved); });
    }
})();

// Toggle ao clicar no switch
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.alterar-tema').forEach(function (el) {
        el.addEventListener('click', function () {
            var current = document.body.classList.contains('bg-light') ? 'light' : 'dark';
            applyTheme(current === 'light' ? 'dark' : 'light');
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
    var galeriaProjetos = document.querySelector('.galeria-projetos');
    if (galeriaProjetos && typeof lightGallery !== 'undefined') {
        lightGallery(galeriaProjetos, { selector: '.lightgallery-item' });
    }
});

// === LightSlider (depoimentos) — depende de jQuery ===
if (typeof jQuery !== 'undefined') {
    jQuery(function ($) {
        if (!$('#lightSlider').length) return;
        $('#lightSlider').lightSlider({
            item: 3,
            autoWidth: true,
            slideMove: 1,
            slideMargin: 10,
            mode: 'slide',
            useCSS: true,
            cssEasing: 'ease',
            easing: 'linear',
            speed: 800,
            auto: true,
            loop: true,
            slideEndAnimation: true,
            pause: 4000,
            keyPress: false,
            controls: true,
            prevHtml: '',
            nextHtml: '',
            rtl: false,
            adaptiveHeight: false,
            vertical: false,
            verticalHeight: 600,
            vThumbWidth: 300,
            thumbItem: 10,
            pager: true,
            gallery: false,
            galleryMargin: 5,
            thumbMargin: 5,
            currentPagerPosition: 'middle',
            enableTouch: true,
            enableDrag: true,
            freeMove: true,
            swipeThreshold: 40,
            responsive: [
                { breakpoint: 1399, settings: { item: 2, slideMove: 1, slideMargin: 10 } },
                { breakpoint: 991, settings: { item: 2, slideMove: 1, slideMargin: 10 } },
                { breakpoint: 700, settings: { item: 1, slideMove: 1, verticalHeight: 400, vThumbWidth: 300, slideMargin: 0 } }
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
        ? '<strong>Contato enviado com sucesso</strong><br>Em breve retornarei seu contato'
        : '<strong>Não foi possível enviar o contato.</strong><br>Verifique os campos e tente novamente');
    container.innerHTML =
        '<div class="flash-message d-flex justify-content-center">' +
        '<div class="w-100 text-center alert-dismissible fade show alert flash alert-' +
        (ok ? 'success' : 'warning') + '">' +
        '<h5>' + msg + '</h5>' +
        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
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

        // Validação básica (HTML já cobre required/email/minlength, mas reforçamos)
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Checagem da access_key — só valida se o campo existir e estiver preenchido
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
