/*
Parallax
Version 2.0
Copyright (c) 2017 Dryane_
Parallax is released under the MIT License
http://www.danieljosephryan.com/projects/web-design/scrolling-parallax/
*/
var parallax = function(options) {

    var root = this;
    root.vars = {
        el  : null,
        css : "background-position",
        speed: 1,
        position: "center",
        moveBy: "percent",
        preventIfLarge: false
    };

    // Helper to resolve el whether it's a DOM element or a selector string
    root.getEl = function() {
        if (typeof root.vars.el === 'string') {
            return document.querySelector(root.vars.el);
        }
        return root.vars.el;
    };

    root.construct = function(options) {
        Object.assign(root.vars, options);
    };

    root.parallaxEffect = function() {
        var move = root.move();
        if (move == null) {
            return;
        }
        var elBackgrounPos = root.vars.position + " " + move;
        var el = root.getEl();
        el.style[root.vars.css.replace(/-([a-z])/g, function(_, c) { return c.toUpperCase(); })] = elBackgrounPos;
    };

    root.moveByPercent = function() {
        var el = root.getEl();
        var distanceFromCenter = root.centerFromCenter();
        var percentageMove = el.offsetHeight + ((window.innerHeight - el.offsetHeight) / 2);
        var pixelsToMove = distanceFromCenter / percentageMove * 100 * root.vars.speed;
        pixelsToMove = 50 + pixelsToMove + "%";
        return pixelsToMove;
    };

    root.moveByPixels = function() {
        var el = root.getEl();
        var distanceFromCenter = root.centerFromCenter();
        var percentageMove = el.offsetHeight + ((window.innerHeight - el.offsetHeight) / 2);
        var pixelsToMove = distanceFromCenter / percentageMove * 100 * root.vars.speed;
        pixelsToMove = pixelsToMove / 50;
        pixelsToMove = pixelsToMove * el.offsetHeight;
        pixelsToMove = Math.round(pixelsToMove);
        pixelsToMove = pixelsToMove * (-1);
        pixelsToMove = "calc(50% + " + pixelsToMove + "px)";
        return pixelsToMove;
    };

    root.move = function() {
        var el = root.getEl();
        if (root.vars.preventIfLarge) {
            if (el.offsetHeight > window.innerHeight) {
                return "50%";
            }
        }
        if (root.vars.moveBy.toLowerCase() == 'pixel') {
            return root.moveByPixels();
        } else if (root.vars.moveBy.toLowerCase() == 'percent') {
            return root.moveByPercent();
        }
        return null;
    };

    root.getSpeed = function() {
        var speed = .75;
        if (root.vars.speed > 1) {
            root.vars.speed = 1;
        } if (root.vars.speed <= 0) {
            root.vars.speed = .25;
        }
        speed = speed * root.vars.speed;
        speed = speed / 2;
        return speed;
    };

    root.centerFromCenter = function() {
        var el = root.getEl();
        var windowHeight = window.innerHeight;
        var windowYOffset = window.pageYOffset;
        var rect = el.getBoundingClientRect();
        var elementYOffset = rect.top + window.pageYOffset;
        var elementHeight = el.offsetHeight;
        var distanceFromCenter = elementYOffset - windowYOffset - (windowHeight / 2) + (elementHeight / 2);
        return distanceFromCenter;
    };

    root.applyCSS = function() {
        var el = root.getEl();
        var tagName = el.tagName.toLowerCase();
        if (root.vars.css == "background-position" || root.vars.css == "object-position") {
            if (tagName !== "img" && tagName !== "video") {
                if (getComputedStyle(el).backgroundSize.toLowerCase() == 'auto') {
                    el.style.backgroundSize = "cover";
                }
            } else {
                if (getComputedStyle(el).objectFit.toLowerCase() != 'cover') {
                    el.style.objectFit = "cover";
                }
                if (root.vars.css == "background-position") {
                    root.vars.css = "object-position";
                }
            }
        }
    };

    root.construct(options);
    root.applyCSS();
    root.vars.speed = root.getSpeed();
    root.parallaxEffect();
    window.addEventListener('scroll', root.parallaxEffect);
    window.addEventListener('resize', root.parallaxEffect);

};
