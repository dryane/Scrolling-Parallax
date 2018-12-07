/*
Parallax
Version 2.0
Copyright (c) 2017 Dryane_
Parallax is released under the MIT License
http://www.danieljosephryan.com/projects/web-design/scrolling-parallax/
*/
var parallax = function(options){
 
    var root = this;

    root.vars = {
        el  : null,
        css : "background-position",
        speed: 1,
        position: "center",
        moveBy: "percent",
        preventIfLarge: false
    };

    root.construct = function(options){
        jQuery.extend(root.vars , options);
    };
 
    root.parallaxEffect = function() {
        var move = root.move();
        if (move == null) {
            return;
        }
        var elBackgrounPos = root.vars.position + " " + move;
        jQuery(root.vars.el).css(root.vars.css, elBackgrounPos);
    }

    root.moveByPercent = function() {
        var distanceFromCenter = root.centerFromCenter();
        var percentageMove = jQuery(root.vars.el).height() + ( (jQuery(window).height() - jQuery(root.vars.el).height()) / 2);
        var pixelsToMove = distanceFromCenter / percentageMove * 100 * root.vars.speed;
        pixelsToMove = 50 + pixelsToMove + "%";
        return pixelsToMove;
    }

    root.moveByPixels = function() {
        var distanceFromCenter = root.centerFromCenter();
        var percentageMove = jQuery(root.vars.el).height() + ( (jQuery(window).height() - jQuery(root.vars.el).height()) / 2);
        var pixelsToMove = distanceFromCenter / percentageMove * 100 * root.vars.speed;
        pixelsToMove = pixelsToMove / 50;
        pixelsToMove = pixelsToMove * jQuery(root.vars.el).height();
        pixelsToMove = Math.round(pixelsToMove);
        pixelsToMove = pixelsToMove * (-1);
        pixelsToMove = "calc(50% + " + pixelsToMove + "px)";
        return pixelsToMove;
    }

    root.move = function() {

        if(root.vars.preventIfLarge) {
            if ( jQuery(root.vars.el).height() > jQuery(window).height() ) {
                return "50%";
            }
        }

        if ( root.vars.moveBy.toLowerCase() == 'pixel' ) {
            return root.moveByPixels();
        } else if ( root.vars.moveBy.toLowerCase() == 'percent' ) {
            return root.moveByPercent();
        }
        return null;
    }

    root.getSpeed = function() {
        var speed = .75;
        if (root.vars.speed > 1) {
            root.vars.speed = 1;
        } if (root.vars.speed <= 0) {
            root.vars.speed = .25;
        }
        speed = speed * root.vars.speed;
        speed = speed / 2; // 0 < s > .5
        return speed; 
    }

    root.centerFromCenter = function() {
        var windowHeight = jQuery(window).height();
        var windowYOffset = window.pageYOffset;
        var elementYOffset = jQuery(root.vars.el).offset().top;
        var elementHeight = jQuery(root.vars.el).outerHeight();
        var distanceFromCenter = elementYOffset - windowYOffset - (windowHeight / 2) + (elementHeight / 2);
        return distanceFromCenter;
    }

    root.applyCSS = function() {
        if (root.vars.css == "background-position" || root.vars.css == "object-position") {
            if ( !jQuery(root.vars.el).is("img") && !jQuery(root.vars.el).is("video")) {
                if( jQuery(root.vars.el).css('background-size').toLowerCase() == 'auto') {
                    jQuery(root.vars.el).css("background-size", "cover");
                }
            }  
            else {
                if( jQuery(root.vars.el).css('object-fit').toLowerCase() != 'cover') {
                    jQuery(root.vars.el).css("object-fit", "cover");
                }
                if (root.vars.css == "background-position") {
                    root.vars.css = "object-position";
                }
            }
        }
    }
 
    root.construct(options);
    root.applyCSS();
    root.vars.speed = root.getSpeed();

    root.parallaxEffect();

    window.addEventListener('scroll', root.parallaxEffect);
    window.addEventListener('resize', root.parallaxEffect);
 
};
