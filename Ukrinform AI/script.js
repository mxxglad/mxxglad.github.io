$('.header__lang-button').click(function(){
    $('.lang-list').toggleClass('lang-list--active')
});
$('.more-button').click(function () {
    $('.more__list').toggleClass('more__list--active')
    $('.more__first-elem').toggleClass('more__first-elem--active')
});
$('.header__burger').click(function () {
    $('.all-nav-aside').toggleClass('visible');
    $('.more__list').toggleClass('more__list--active');
    $('body').toggleClass('body--locked');
});
$(function () {
    $(window).scroll(function () {
        var top = $(document).scrollTop();
        if (top > 42) $('.all-nav-aside').addClass('all-nav-aside--downed');
        else $('.all-nav-aside').removeClass('all-nav-aside--downed')
    });
});