# tyler

*pre-alpha* - not feature complete

Metro-style tiling UI implemented in CSS

## usage

	Tyler = require 'Tyler'
	element = document.body
	data = [
		{
			name: 'John B'
			sex: 'm'
			weight: .9
		}
		{
			name: 'Mary J'
			sex: 'f'
			weight: .6
		}
		{
			name: 'Elmer F'
			sex: 'm'
			weight: .8
		}
	]

	new Tyler data, element