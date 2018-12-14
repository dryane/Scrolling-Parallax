# Scrolling-Parallax

A jQuery based parallax effect that scrolls the background image along with the scroll of the user. The center of image will be at the center of the element, when the element is vertically centered within the screen. You can see the affect in the image above, the lake line is in the center of the image, but scrolls at a slower pace then the browser moves.

I have found that it works best with an element that is wider than the ratio of the photo used. For an example of what I mean, as you shrink the screen, the above image will scroll less the closer the element gets to the ratio of 2:1.

	$(document).ready(function(){
		$('.parallax').each(function() {
			new parallax({ el : this, css:"object-position", moveBy:"pixel", preventIfLarge:true });
		});
	});

This plugin has 6 options: “el”, “css”, “speed”, “position”, “moveBy”, “preventIfLarge”, with “el” being the only option that needs to be set.

Here are the default option settings

el : null
css : “background-position”
speed: 1
position: “center”
moveBy: “percent”
preventIfLarge: false
Options
El
This option is required. The javascript object you want the effect attached to

CSS
This variable has two options, “background-position” & “object-position”. background-position will apply the effect to a background image while object-position will apply the effect to an “img” tag.

Speed
Effects how much the parallax affects the image

Position
This will affect the background-position “left” or “right” position.

moveBy
This variable has two options, “percent” & “px”. This will move the image either by percents or pixels.

preventIfLarge
This is a boolean variable. If the image element is larger than the the viewport, it may not scroll correctly. If the image itself is still large enough, than sometimes it works, but if its set to false, it will default the position to “50%”, or essentially center.
