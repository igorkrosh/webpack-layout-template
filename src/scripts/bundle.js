global.$ = global.jQuery = require('jquery');
require('owl.carousel');

global.SimpleLightbox = require('simple-lightbox');
global.SimpleLightbox.registerAsJqueryPlugin($);

$(document).ready(Core)

function Core()
{
    InitLightbox()
}

function InitLightbox()
{
    $('a.lightbox').simpleLightbox();
}
