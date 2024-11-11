$(document).ready(Core);

function Core()
{
    InitOwlCarousel();
}

function InitOwlCarousel()
{
    $('section.main-screen .owl-carousel').owlCarousel({
        items: 1,
        autoHeight: true,
        dragging: false,
        touchDrag: false,
        mouseDrag: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 1000
    })
}