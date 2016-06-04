$(document).ready(function(){

	// Define the items margin and height.
	// Change this to your needs.
	var margin = 0, itemHeight = 220;

	// initialize the grid
	initGrid();

	var timer;
	$(window).resize(function() {
	    clearTimeout(timer);
	    timer = setTimeout(function() {
	        buildGrid();
	    }, 400);
	});

	function initGrid(){
		$body = $('body'),
		$grid = $('.grid');

		// Set all the items their height and margins
		$(".item").each(function(){
			$(this).css({
				'height': itemHeight,
				'marginRight': margin,
				'marginBottom': margin
			});
		});

		// Set the grids margins
		$grid.css({
			'marginTop': margin,
			'marginLeft': margin
		});

		// build the grid
		buildGrid();
	}

	function buildGrid(){
		// set body and grid width
		var bodyWidth = $(window).width();
		var gridWidth = bodyWidth - margin;
		$body.width(bodyWidth);
		$grid.width(gridWidth);

		// Declare variables
		var rowWidth = 0, rowItems = [], rowItemsWidth = [];

		// Loop trough all the items
		$(".item").each(function(){
			// Add current item to the row
			rowItems.push($(this));

			// Calculate current item width with the ratio
			itemWidth = Math.floor((itemHeight * $(this).data('ratio')) + margin); 

			// Add current item width to an array
			rowItemsWidth.push(itemWidth);

			// Set items its width
			$(this).width(itemWidth - margin);

			// Add the item width to the row width
			rowWidth+= itemWidth;

			// if the rowWidth is higher then the gridWidth then we should resize the items in it.
			if (rowWidth > gridWidth) {
				// get the width difference between the row and grid
				widthDifference = rowWidth - gridWidth;

				// loop trough all items in the current row to change their width
				$.each(rowItems, function ( index ) {
					// calculate how much pixels should be substracted from each item in the row
					// the substract value of the last item may differ because of rounding
					if (rowItems.length - 1 !== index){
						subtract = Math.floor(widthDifference / rowItems.length);
					} else {
						subtract = widthDifference - ((rowItems.length - 1) * Math.floor(widthDifference / rowItems.length));
					}

					// Change the item width
					$(rowItems[index]).width(rowItemsWidth[index] - subtract - margin);
				});

				// Reset variables
				rowItems = [], rowItemsWidth = [], rowWidth = 0;
			}
		});
	}
});