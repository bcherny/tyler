# tyler

Metro-style tiling UI implemented in CSS (Webkit only!)

## usage

Add `tyler.css` to your page's `<head>`:

```html
<html>
<head>
	<link rel="stylesheet" href="css/tyler.css" />
</head>
<body></body>
</html>
```

Add `tyler.js` and its dependencies to the bottom of your `<body>` (or load with any CommonJS or AMD-compatible module loader):

```html
<html>
<head>
	<link rel="stylesheet" href="css/tyler.css" />
</head>
<body>
	<script src="dependencies/matrix-utilities.js"></script>
	<script src="dependencies/transform-to-matrix.js"></script>
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
	<script src="dependencies/matrix-utilities.js"></script>
	<script src="dependencies/transform-to-matrix.js"></script>
	<script src="dependencies/umodel.js"></script>
	<script src="tyler.js"></script>
	<script>
		var data = [
			{
				name: 'Foo',
				weight: .9
			},{
				name: 'Bar',
				weight: .4
			},{
				name: 'Baz',
				weight: .7
			}
		];

		// render Tyler UI into document.body
		new Tyler(data);
	</script>
</body>
</html>
```

