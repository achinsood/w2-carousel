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
* Add the following code where you want to add the carousel.
```
<div w2-carousel>
	<div w2-carousel-main id="w2-carousel">
		<div w2-carousel-element>
			<div w2-carousel-content>Demo slide</div>
		</div>
	</div>
</div>
```
## Options
* w2-carousel - The viewport of the carousel which occupies the entire width and height of the container within which you embed it. So make sure that you set the width and height of the container element.
* w2-carousel-main - The container containing all the slides.
* w2-carousel-element - Defines a single slide and occupies the entire width and height of the viewport(w2-carousel).
* w2-carousel-content - The container of the content of a slide which remains in the center of the slide. If you do not require the content in the center, then you may emebed your slide content directly inside w2-carousel-element.
* w2-carousel-buttons - Defines an unordered list for carousel buttons which appear as an overlay over w2-carousel at its bottom.
* w2-carousel-pause-onhover - Set w2-carousel-pause-onhover="true" to pause the carousel when the user brings his mouse over the carousel viewport.
## Adding buttons to help you navigate the slides
Add w2-vertical-carousel="true" to w2-carousel and its done.
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
## Sliding it Vertically
Add w2-vertical-carousel="true" to w2-carousel and its done.
```
<div w2-carousel w2-vertical-carousel>
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
