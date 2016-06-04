var Grid = {
	margin: 0, // Change this to your needs.
	itemHeight: 220, // Change this to your needs.

	init: function () {
		// Get body, grid and items
        var body = document.getElementsByTagName('body')[0];
		var grid = document.getElementById('grid');
		var items = grid.children;

		// Set all the items their height and margins
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			item.height = this.itemHeight;
			item.style.marginRight = this.margin + "px";
			item.style.marginBottom = this.margin + "px";
		}

		// Set the grids margins
		grid.setAttribute("style","margin: " + this.margin + "px 0 0 " + this.margin + "px;");

		// Build the grid
		this.build();

		// Build the grid again after a resize
		var timer = null;
		window.addEventListener('resize', function(){
			clearTimeout(timer);
		    timer = setTimeout(function() {
		        Grid.build();
		    }, 400);
		}, true);
    },


    build: function () {
    	// Set body and grid width
		var bodyWidth = window.innerWidth;
		var gridWidth = bodyWidth - this.margin;

		document.getElementsByTagName('body')[0].setAttribute("style","width: " + bodyWidth + "px");
		document.getElementById('grid').style.width = gridWidth + "px";

		// Declare variables
		var rowWidth = 0, rowItems = [], rowItemsWidth = [];

		// Loop trough all the items
		var items = grid.children;
		for (var i = 0; i < items.length; i++) {
			var item = items[i];

			// Add current item to the row
			rowItems.push(item);

			// Calculate current item width with the ratio
			itemWidth = Math.floor(this.itemHeight * item.dataset.ratio + this.margin); 

			// Add current item width to an array
			rowItemsWidth.push(itemWidth);

			console.log(item);

			// Set items its width
			item.style.width = itemWidth - this.margin + "px";

			// Add the item width to the row width
			rowWidth+= itemWidth;

			// if the rowWidth is higher then the gridWidth then we should resize the items in it.
			if (rowWidth > gridWidth) {
				// get the width difference between the row and grid
				widthDifference = rowWidth - gridWidth;

				// loop trough all items in the current row to change their width
				for (var t = 0; t < rowItems.length; t++) {
					var rowItem = rowItems[t];

					// calculate how much pixels should be substracted from each item in the row
					// the substract value of the last item may differ because of rounding
					if (rowItems.length - 1 !== t){
						subtract = Math.floor(widthDifference / rowItems.length);
					} else {
						subtract = widthDifference - ((rowItems.length - 1) * Math.floor(widthDifference / rowItems.length));
					}

					// Change the item width
					rowItems[t].style.width = rowItemsWidth[t] - subtract - this.margin + "px";
				}

				// Reset variables
				rowItems = [], rowItemsWidth = [], rowWidth = 0;
			}
		}
    }
}

Grid.init();