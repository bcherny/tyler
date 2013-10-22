# Tyler

## helpers

	_ =

		extend: (obj, others...) ->

			if obj and others
				for other in others
					for own key of other
						obj[key] = other[key]

			obj

		sortBy: (array, property) ->

			# default to no sort order
			if not array[0][property]?
				array[0][property] = 1

			number = typeof array[0][property] is 'number'
			_alpha = (property) -> (a, b) -> a[property].localeCompare b[property]
			_numeric = (property) -> (a, b) -> a[property] < b[property]
			fn = (if number then _numeric else _alpha) property

			array.sort fn

		template: (template, data = {}) ->

			template.call data

return the first key in an object (order not guaranteed, as objects are automatically sorted by key in some browsers)

		one: (collection) ->

			return id for id of collection

## Tyler

	class tyler

## default options

		options:

Number of big tiles that should fit side-by-side 

			columns: 2

Template for tiles

			templateWrap: ->

				"""
					<div class="#{@classNames.tile}" style="left:#{@x}px;top:#{@y}px">
						<div class="tile-inner">
							#{@front}
							#{@back}
						</div>
					</div>
				"""

			templateFront: ->

				"""
					<div class="tile-front" style="background-image:url(#{@pic})">
						<span class="name">#{@name}</span>
					</div>
				"""

			templateBack: ->

				"""
					<div class="tile-back"></div>
				"""

### Classes for DOM elements

			classNames:

				tile: 'tile'
				tileFlipped: 'flipped'

### Animation options

			animation:

Duration, in milliseconds

				duration: 500

CSS transition timing function, see http://www.w3.org/TR/css3-transitions/#single-transition-timing-function

				fn: 'ease-out'

## initialize

		constructor: (data, @element = document.body, options) ->

Set options

			_.extend @options, options

Initialize model

			@model = new umodel
				moving: false	# prevents click from being fired when user is scrolling
				size: 0			# cache tile size

Create a CSS rue to properly size tiles

			@setCSS()

Set data?

			if data
				@data data

Attach DOM events

			@addEventListeners()

		addEventListeners: ->

			document.addEventListener 'click', @click
			document.addEventListener 'touchend', @click
			document.addEventListener 'touchmove', @move

## Data

Set data (triggers layout)

		data: (data) ->

Compute the layout

			layout = @layout data

Render it

			@render layout

## Click

Triggered when a tile is clicked/tapped

		click: (event) =>

			if @model.get 'moving'

				event.preventDefault()
				@model.set 'moving', false

			else

				tile = @getTile event

				if tile

					tile.classList.toggle @options.classNames.tileFlipped

## Move

		move: (event) =>

			@model.set 'moving', true

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

Tiles should be square, and exactly **two** should fit side-by-side. That number can be overwritten in `options.columns`.

		setCSS: ->

Compute 
			
			height = @element.offsetHeight
			width = @element.offsetWidth
			size = width / @options.columns

Define CSS transition based on `options`, tile size based on window dimensions

			rule =
				"""
					.#{@options.classNames.tile} {
						height: #{size}px;
						width: #{size}px;
						-webkit-transition: all #{@options.animation.duration}ms #{@options.animation.fn}
					}
				"""

Append to the DOM. See http://stackoverflow.com/a/707794/435124 for how CSS rule insertion works
			
			sheet = document.styleSheets[0]
			sheet.insertRule rule, sheet.cssRules.length

Store tile size for `@layout` computations

			@model.set 'size', size

## layout
Compute layout according to our parameters, filtered through a bayesian distribution.

		layout: (data) ->

			if not data or typeof _.one(data) is 'undefined'
				return

			_.sortBy data, 'weight'

			size = @model.get 'size'

			for tile, n in data

				datum =
					x: size * (n % 2)
					y: size * Math.floor(n / @options.columns)

				_.extend tile, datum

## render

Render tiles in the DOM

		render: (layout) ->

			if layout.length

Generate tile HTML

				html = ''

				for item in layout
					front = _.template @options.templateFront, item
					back = _.template @options.templateBack, item
					html += _.template @options.templateWrap, _.extend item, @options,
						front: front
						back: back

Render!

				@element.innerHTML = html