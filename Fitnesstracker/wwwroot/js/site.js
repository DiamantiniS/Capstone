// Script per gestire il menu toggle sulla navbar mobile
$(document).ready(function () {
    $('.navbar-toggler').click(function () {
        $(this).toggleClass('active');
    });
});

// ScrollReveal per animazioni (se desideri aggiungere effetti)
ScrollReveal().reveal('.header__content h1', { delay: 200 });
ScrollReveal().reveal('.header__content h2', { delay: 400 });
ScrollReveal().reveal('.header__content p', { delay: 600 });
ScrollReveal().reveal('.btn__primary', { delay: 800 });
