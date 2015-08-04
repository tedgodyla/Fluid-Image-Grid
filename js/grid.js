
$(document).ready(function(){

	var m = 8, bh = 200, timer;

	setGridSettings();

	$(window).resize(function() {
	    clearTimeout(timer);
	    timer = setTimeout(function() {
	        makeGrid();
	    }, 400);
	});

	function setGridSettings(){
		$body = $('body'),
		$grid = $('.grid');

		$(".block").each(function(){
			$(this).css({
				'height': bh,
				'marginRight': m,
				'marginBottom': m
			});
		});

		$grid.css({
			'marginTop': m,
			'marginLeft': m
		});

		makeGrid();
	}

	function makeGrid(){
		var ww = $(window).width(),
			g = ww - m;

		$body.width(ww);
		$grid.width(g);

		var t = 0, b = [], wa = [], d = 0, s = 0, w = 0;

		$(".block").each(function(){
			w = Math.floor((bh * $(this).data('width')) + m);
			b.push($(this));
			$(this).width(w - m);
			wa.push(w);
			t+= w;

			if (t > g){
				d = t - g;
				$.each(b, function( i ) {
					if (b.length - 1 !== i){
						s = Math.floor(d / b.length);
					} else {
						s = d - ((b.length - 1) * Math.floor(d / b.length));
					}

					$(b[i]).width(wa[i] - s - m);
				});
				wa = [], b = [], t = 0;
			}
		});
	}
});