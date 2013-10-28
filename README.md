# tyler

Metro-style tiling UI implemented in CSS (Webkit only!)

## demo

http://performancejs.com/tyler/

## usage

```js
new tyler(data, element, options)
```

## basic example

Add `tyler.css` to your page's `<head>`:

```html
<html>
<head>
	<link rel="stylesheet" href="css/tyler.css" />
</head>
<body></body>
</html>
```

Add `tyler.js` and its dependency, `umodel`, to the bottom of your `<body>` (or load with any CommonJS or AMD-compatible module loader):

```html
<html>
<head>
	<link rel="stylesheet" href="css/tyler.css" />
</head>
<body>
	<script src="dependencies/umodel.js"></script>
	<script src="tyler.js"></script>
</body>
</html>
```

Then initialize Tyler with a final `<script>` (be sure to link to it *after* Tyler and its dependencies):

```html
<html>
<head>
	<link rel="stylesheet" href="css/tyler.css" />
</head>
<body>
	<script src="dependencies/umodel.js"></script>
	<script src="tyler.js"></script>
	<script>
		new tyler([
			{ name: 'Foo', weight: .9 },
			{ name: 'Bar', weight: .4 },
			{ name: 'Baz', weight: .7 }
		]);
	</script>
</body>
</html>
```

## options

```js
options = {

	/*
		{Number} how many tiles should fit side-by-side
	 */
	columns: 2,

	/*
		{Number} visual horizontal offset for tiles
	 */
	offsetX: 0,

	/*
		{Number} visual vertical offset for tiles
	 */
	offsetY: 0,

	/*
		{Boolean} whether or not tiles should be flippable
	 */
	flippable: true,

	/*
		{Function} a template that returns a string
		HTML template for the front of a tile, bound to any data from the `data` object passed when Tyler is instantiated
	 */
	templateFront: function(){
		return '<div class="tile-front">' + this.foo + '</div>'
	},

	/*
		{Function} a template that returns a string
		HTML template for the back of a tile, bound to any data from the `data` object passed when Tyler is instantiated
	 */
	templateBack: function(){
		return '<div class="tile-back">' + this.bar + '</div>'
	},

	classNames: {

		/*
			{String} class for each tile element
		 */
		tile: 'tile'

		/*
			{String} class appended to a tile element when it's flipped
		 */
		tileFlipped: 'flipped'

	},

	animation:

		/*
			{Number} Flip animation duration, in milliseconds
		 */
		duration: 500,

		/*
			{String} CSS transition timing function for flip animation, see http://www.w3.org/TR/css3-transitions/#single-transition-timing-function
		 */
		fn: 'ease-out'
}
```

## methods

```js
tyl = new tyler()
```

### .data
pass some data to tyler, overiding any existing data and forcing a re-render

```js
tyl.data({ ... })
```

### .on
call a function when a view event is triggered (currently only supports `click`)

```js
tyl.on('click', function (tileElement, event) {
	// this = tyler instance
});
```

## building it yourself

```bash
npm install
grunt
```