global.$ = global.jQuery = require('jquery');
require('owl.carousel');
require('jquery-modal');
require('jquery-mask-plugin');

global.SimpleLightbox = require('simple-lightbox');
global.SimpleLightbox.registerAsJqueryPlugin($);

$(document).ready(Core);

function Core()
{
    InitLightbox();
    InitMaskPlugin();

    SetAnchor()
}

function InitLightbox()
{
    $('a.lightbox').simpleLightbox();
}

function InitMaskPlugin()
{
    $('input.phone').mask('+7(000) 000-00-00')
}

function SetAnchor()
{
    $("[anchor]").on('click', function (e) {
        e.preventDefault();
        let anchor = $(this).attr('anchor');
        $(anchor)[0].scrollIntoView({ behavior: "smooth" });
    })
}
