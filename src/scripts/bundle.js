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

    SetAnchor();
    SetTabSwitcher();
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

function SetTabSwitcher()
{
    $('.btn-tab').on('click', function(e) {
        e.preventDefault();

        if ($(this).hasClass('active'))
            return;

        $('.btn-tab').removeClass('active');
        $(this).addClass('active');

        let tabHeight = $(`.tab.active`)[0].clientHeight;
        $(`.tab.active`).closest('.tab-viewer').css('height', `${tabHeight}px`)

        SwitchTab($(this).attr('target'))
    })
}

function SwitchTab(target)
{
    $('.tab.active').animate({
        opacity: 0
    }, 500, function() {
        $('.tab.active').removeClass('active');

        $(`[tab-name="${target}"]`).css('opacity', 0);
        $(`[tab-name="${target}"]`).addClass('active');

        let tabHeight = $(`[tab-name="${target}"]`)[0].clientHeight;
        $(`[tab-name="${target}"]`).closest('.tab-viewer').css('height', `${tabHeight}px`)

        $(`[tab-name="${target}"]`).animate({
            opacity: 1
        }, 500)
    })
}
