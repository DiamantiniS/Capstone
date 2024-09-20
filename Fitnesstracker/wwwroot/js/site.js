// Script per gestire il menu toggle sulla navbar mobile
$(function () {
    $('.navbar-toggler').click(function () {
        $(this).toggleClass('active');
    });
});

// ScrollReveal per animazioni (se desideri aggiungere effetti)
const revealOptions = [
    { selector: '.header__content h1', delay: 200 },
    { selector: '.header__content h2', delay: 400 },
    { selector: '.header__content p', delay: 600 },
    { selector: '.btn__primary', delay: 800 }
];

revealOptions.forEach(option => {
    ScrollReveal().reveal(option.selector, { delay: option.delay });
});


