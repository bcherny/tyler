
# requires
Tyler = require 'Tyler'

# params
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
	{
		name: 'Stacy J'
		sex: 'f'
		weight: .2
	}
	{
		name: 'Becky B'
		sex: 'f'
		weight: .7
	}
	{
		name: 'Frankie A'
		sex: 'm'
		weight: .3
	}
	{
		name: 'Mark P'
		sex: 'm'
		weight: 1
	}
	{
		name: 'Stephanie X'
		sex: 'f'
		weight: .3
	}
	{
		name: 'Albert I'
		sex: 'm'
		weight: .4
	}
]
options =

	back:

		className: (data) ->
			''

		template: (data) ->
			"""
			"""

	front:

		className: (data) ->
			'sex-' + data.sex

		template: (data) ->
			"""
				#{data.name}
			"""

# init!
tyler = new Tyler data, element, options