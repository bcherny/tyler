
# Tyler

## requires

	ColorScheme = require 'ColorScheme'
	#TextWidth = require 'textwidth'

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

			_alpha = (property) ->
				(a, b) -> a[property].localeCompare b[property]
			_numeric = (property) ->
				(a, b) -> a[property] < b[property]

			fn = (if number then _numeric else _alpha) property

			array.sort fn

		rand: (array) ->

			index = Math.floor Math.random() * array.length
			array[index]

		template: (template, data = {}) ->

			template.call data

## Template for tiles

	template = ->

		"""
			<div class="tile tile-#{@size}" style="left:#{@x}px;top:#{@y}px" data-tyler-id="#{@id}">
				<div class="tile-inner">
					<div class="tile-front sex-#{@sex}" style="background-color:##{@color};background-image:url(#{@pic})"><span class="name">#{@name}</span>
					</div>
					<div class="tile-back"></div>
				</div>
			</div>
		"""

## Tyler

	class Tyler

## default options

		options:

Number of big tiles that should fit side-by-side 

			columns: 2

Frequency (in ms) to check for resize, in order to properly adjust fullscreen size

			checkForResizeEvery: 400

### Classes for DOM elements

			classNames:

				cellFocused: 'focus'
				tile: 'tile'
				tileBig: 'tile-big'
				tileSmall: 'tile-small'
				tileFlipped: 'flipped'
				tileInner: 'tile-inner'

### Animation options

			animation:

Duration, in milliseconds

				duration: 500

CSS transition timing function, see http://www.w3.org/TR/css3-transitions/#single-transition-timing-function

				fn: 'ease-out'

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
			document.addEventListener 'touchend', @click
			document.addEventListener 'touchmove', @move

## Click

Triggered when a tile is clicked/tapped

		click: (event) =>

			if @moving

				event.preventDefault()
				@moving = false

			else

				tile = @getTile event

				if tile

					style = tile.querySelector('.tile-inner').style

					tile.classList.toggle @options.classNames.tileFlipped

					if tile.classList.contains @options.classNames.tileFlipped

Align it with the top left of the viewport

						left = tile.offsetLeft - document.body.scrollLeft
						top = tile.offsetTop - document.body.scrollTop

						style.webkitTransform = "rotateX(180deg) translate3d(#{left}px,#{top}px,0)"

Or reset if previously aligned

					else

						style.webkitTransform = 'rotateX(0) translate3d(0,0,0)'

## Move

		move: (event) =>

			@moving = true

## getTile

A helper for click events. Gets a tile DOMElement from the event's target.

		getTile: (event) ->

			target = event.target

			while target isnt document

				return target if @isTile target

				target = target.parentNode

## isTile

Checks if a DOMElement is a tile.

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

Define CSS transition based on `options`

				"""
					.#{@options.classNames.tile},
					.#{@options.classNames.tileInner} {
						-webkit-transition: all #{@options.animation.duration}ms #{@options.animation.fn}
					}
				"""

Define big tile size

				"""
					.#{@options.classNames.tileBig} {
						height: #{size}px;
						width: #{size}px;
					}
				"""

Define small tile size

				"""
					.#{@options.classNames.tileSmall} {
						height: #{size / 2}px;
						width: #{size / 2}px;
					}
				"""

Define flipped (expanded) tile size

				"""
					.#{@options.classNames.tileFlipped} {
						height: 100%;
						width: 100%;
					}
				"""
			]

Append rules to stylesheet
			
			for rule in rules
				sheet.insertRule rule, sheet.cssRules.length

## layout
Compute layout according to our parameters, filtered through a bayesian distribution.

		layout: (data) ->

			_.sortBy data, 'weight'

			for tile, n in data

				datum =
					id: n
					x: @sizes.tile * (n % 2)
					y: @sizes.tile * Math.floor(n / @options.columns)

				_.extend tile, datum

## render

Render tiles in the DOM

		render: (layout, element) ->

			if layout.length

Generate colors for tiles

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