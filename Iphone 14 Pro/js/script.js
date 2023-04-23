$(document).ready(function () {
    $('.header__burger').click(function () {
        $('.header__list').toggleClass('header__list--active');
        $('.header__nav').toggleClass('header__nav--active');
        $('.header__burger').toggleClass('header__burger--active');
        $('.burger__line').toggleClass('burger__line--active');
        $('body').toggleClass('body--locked');
    });
});

