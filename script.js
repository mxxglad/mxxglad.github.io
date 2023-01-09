$(document).ready(function () {
    $('.burger-container').click(function () {
        $('.header__menu').toggleClass('header__menu--active');
        $('.header__burger').toggleClass('header__burger--active');
        $('.burger-container').toggleClass('burger-container--active--768');
    });
    $('.header__lang-nav').click(function () {
        $('.header__lang-list').toggleClass('header__lang-list--active');
    });
});