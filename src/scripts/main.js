$(document).ready(Core);

function Core()
{
    InitOwlCarousel();
}

function InitOwlCarousel()
{
    $('.owl-carousel').owlCarousel({
        items: 1,
        autoHeight: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 1000
    })
}