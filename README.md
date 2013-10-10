# tyler

*pre-alpha* - not feature complete

Metro-style tiling UI implemented in CSS

## usage

```js
var Tyler = require('Tyler'),
	element = document.body,
	data = [
		{
			name: 'John B',
			sex: 'm',
			weight: .9
		},{
			name: 'Mary J',
			sex: 'f',
			weight: .6
		},{
			name: 'Elmer F',
			sex: 'm',
			weight: .8
		}
	];

// render Tyler UI into the `body`
new Tyler(data, element);
```