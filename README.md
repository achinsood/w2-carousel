# W2-Carousel
W2-Carousel is one of the best and the simplest Carousels built over JQuery and JQuery Touchswipe. Just include the files, add the required classes to your code and see your carousel working like a magic
## Usage
* Add dependencies(JQuery, JQuery Touchswipe) to your code if your application does not already depend on any of these.
```
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.9/jquery.touchSwipe.min.js"></script>
```
* Download the plugin and add w2-carousel.css, w2-carousel.js to your code.
```
<link href="w2-carousel.css" rel="stylesheet" type="text/css" />
<script src="w2-carousel.js"></script>
```
* Add the following code where you want to add the carousel
```
<div w2-carousel>
	<div w2-carousel-main id="w2-carousel">
		<div w2-carousel-element>
			<div w2-carousel-content>Demo slide</div>
		</div>
	</div>
	<ul w2-carousel-buttons>
		<li></li>
	</ul>
</div>
```
