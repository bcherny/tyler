
# Tyler

## _ (helpers)

	_ =

		extend: (obj, others...) ->

			if obj and others
				for other in others
					for key of other
						obj[key] = other[key]

			obj

	template = (data) ->

		"""
			<div class="tile-cell">
				<div class="tile tile-#{data.size}">
					<div class="tile-inner">
						<div class="tile-front sex-#{data.sex}"></div>
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

				tile.classList.toggle @options.classNames.tileFlipped

		getTile: (event) ->

			target = event.target

			if @isTile target

				return target

			else

				while (target = target.parentNode) and target isnt document

					if @isTile target

						return target

			undefined

		isTile: (element) ->

			element.classList.contains @options.classNames.tile

## setCSS

Tiles should be square, and exactly **two** big ones should fit side-by-side. That number can be overwritten in `options.columns`.

		setCSS: ->

Compute 

			size = window.innerWidth / @options.columns

Append to the DOM. See http://stackoverflow.com/a/707794/435124 for how CSS rule insertion works.

			sheet = document.styleSheets[0]
			rule = """
				.#{@options.classNames.cell} {
					height: #{size}px;
					width: #{size}px;
				}
			"""
			
			sheet.insertRule rule, sheet.cssRules.length

## layout
Compute layout according to our parameters, filtered through a bayesian distribution.

		layout: (data) ->

			[]

## render
Render tiles in the DOM

		render: (layout, element) ->

			if layout.length

				html = ''

				for item in layout
					html += template _.extend item,
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