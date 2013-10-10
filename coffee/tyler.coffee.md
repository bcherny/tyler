
# Tyler

## requires

	ColorScheme = require 'ColorScheme'

## helpers

	_ =

		extend: (obj, others...) ->

			if obj and others
				for other in others
					for own key of other
						obj[key] = other[key]

			obj

		sortBy: (array, property) ->

			number = typeof array[0][property] is 'number'

			_sortAlpha = (property) ->
				(a, b) -> a[property].localeCompare b[property]
			_sortNumeric = (property) ->
				(a, b) -> a[property] < b[property]

			fn = (if number then _sortNumeric else _sortAlpha) property

			array.sort fn

		rand: (array) ->

			index = Math.floor Math.random() * array.length
			array[index]

		template: (template, data = {}) ->

			template.call data

	template = ->

		"""
			<div class="tile-cell" style="left:#{@x}px;top:#{@y}px">
				<div class="tile tile-#{@size}">
					<div class="tile-inner">
						<div class="tile-front sex-#{@sex}" style="background:##{@color}">#{@name}</div>
						<div class="tile-back"></div>
					</div>
				</div>
			</div>
		"""

## Tyler

	class Tyler

## default options

		options:

			classNames:

				cell: 'tile-cell'
				cellFocused: 'focus'
				tile: 'tile'
				tileBig: 'tile-big'
				tileSmall: 'tile-small'
				tileFlipped: 'flipped'

			tagName: 'div'
			columns: 2

## initialize

		constructor: (data, element, options) ->

Set options

			_.extend @options, options

Create a CSS rue to properly size tiles

			@setCSS()

Compute the layout

			layout = @layout data

Render it

			@render layout, element

Attach DOM events

			@addEventListeners()

		addEventListeners: ->

			document.addEventListener 'click', @click
			document.addEventListener 'touchstart', @click

		click: (event) =>

			tile = @getTile event

			if tile

				cell = @getCell tile

				tile.classList.toggle @options.classNames.tileFlipped
				cell.classList.toggle @options.classNames.cellFocused


		getCell: (tile) ->

			while tile = tile.parentNode

				if @isCell tile

					return tile

		getTile: (event) ->

			target = event.target

			if @isTile target

				return target

			else

				while (target = target.parentNode) and target isnt document

					if @isTile target

						return target

		isCell: (element) ->

			element.classList.contains @options.classNames.cell

		isTile: (element) ->

			element.classList.contains @options.classNames.tile

## setCSS

Tiles should be square, and exactly **two** big ones should fit side-by-side. That number can be overwritten in `options.columns`.

		setCSS: ->

Compute 
			
			height = window.innerHeight
			width = window.innerWidth
			size = width / @options.columns

Store sizes for `@layout` computations

			@sizes =
				tile: size
				window:
					height: height
					width: width

Append to the DOM. See http://stackoverflow.com/a/707794/435124 for how CSS rule insertion works.

			sheet = document.styleSheets[0]
			rules = [
				"""
					.#{@options.classNames.cell} {
						height: #{size}px;
						width: #{size}px;
					}
				""",
				"""
					@-webkit-keyframes Enlarge {
						from {
							height: #{size}px;
							width: #{size}px;
						}
						to {
							height: #{height}px;
							width: #{width}px;
						}
					}
				""",
				"""
					@-webkit-keyframes Reduce {
						from {
							height: #{height}px;
							width: #{width}px;
						}
						to {
							height: #{size}px;
							width: #{size}px;
						}
					}
				"""
			]
			
			for rule in rules
				sheet.insertRule rule, sheet.cssRules.length

## layout
Compute layout according to our parameters, filtered through a bayesian distribution.

		layout: (data) ->

			_.sortBy data, 'weight'

			for tile, n in data

				_.extend tile,
					x: @sizes.tile * (n % 2)
					y: @sizes.tile * Math.floor(n / @options.columns)

## render
Render tiles in the DOM

		render: (layout, element) ->

			if layout.length

				color = new ColorScheme
				colors = color
					.from_hue(230)
					.scheme('mono')
					.variation('hard')
					.colors()
				html = ''

				for item in layout

					rand = Math.rand

					if rand > .7
						html += _.template template, _.extend item,
							color: _.rand colors
							size: 'big'

					else
						html += _.template template, _.extend item,
							color: _.rand colors
							size: 'big'

				element.innerHTML = html

Wrap with UMD (play nice with AMD, CommonJS, Node, and globals)

	umd = (name, factory) ->
		if typeof exports is 'object'
			module.exports = factory
		else if typeof define is 'function' and define.amd
			define name, -> factory
		else
			@[name] = factory

	umd 'Tyler', Tyler