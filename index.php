<?php

// get the images from the directory
// you could also get images from a database.
$directory = "images/thumbs/";
$images = glob($directory . "*.jpg");

// shuffle the images for this example.
// can be removed if you want to.
shuffle($images);

?>

<!DOCTYPE html>
<html>
<head>
	<title>Grid system</title>
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/grid.css">
	<script src="http://code.jquery.com/jquery-1.10.2.js"></script>
	<script src="js/grid.js"></script>
</head>
<body>
	<div class="grid">
		<?php

		// loop trough all the images
		foreach($images as $image)
		{
			// get the width and height of the image
			list($width, $height) = getimagesize($image);

			// get the ratio of the width and height of the image. 
			// we use this for fitting the image into the grid.
			$ratio = round($width / $height, 2);

			// the image is set as a background image
			$style = "background-image:url(" . $image . ");";
			?>
			<div class="item" data-ratio="<?= $ratio; ?>" style="<?= $style; ?>">&nbsp;</div>
			<?php
		}

		?>
	</div>
</body>
</html>