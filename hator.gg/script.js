$(document).ready(function () {
    $('.burger-container').click(function () {
        $('.header__menu').toggleClass('header__menu--active');
        $('.header__burger').toggleClass('header__burger--active');
        $('.burger-container').toggleClass('burger-container--active');
        $('body').toggleClass('body--locked');
    });
    $(function () {
        $(window).scroll(function () {
            var top = $(document).scrollTop();
            if (top > 60) $('.burger-container').addClass('burger-container--downed'), $('.burger__label').addClass('burger__label--downed');
            else $('.burger-container').removeClass('burger-container--downed'), $('.burger__label').removeClass('burger__label--downed')});
    });
    $(".header__lang-nav").click(function () {
        $('.header__lang-list').toggle();
        $('.header__lang-list').toggleClass('header__lang-list--active');
        $('.header__lang-nav').toggleClass('header__lang-nav--active');
    });
    $(document).on('click', function (e) {
        if (!$(e.target).closest(".header__lang-nav").length) {
            $('.header__lang-list').hide();
        }
    });
});

