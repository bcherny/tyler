
# Tyler

## _ (helpers)

	_ =

		extend: (obj, others...) ->

			if obj and others
				for other in others
					for key of other
						obj[key] = other[key]

			obj

## Tyler

	class Tyler

## default options

		options:

			classNames:

				cell: 'tile-cell'
				tile: 'tile'
				tileBig: 'tile-big'
				tileSmall: 'tile-small'

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

... And render it!

			@render layout, element

## setCSS

Tiles should be square, and exactly **two** big ones should fit side-by-side. That number can be overwritten in `options.columns`. See http://stackoverflow.com/a/707794/435124 for how CSS rule insertion works.

		setCSS: ->

Compute 

			size = window.innerWidth / @options.columns
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
					html += '<#{@options.tagName} class="#{@options.className}" style="height:#{item.height}px;width:#{item.width}px;left:#{item.left}px;top:#{item.top}px;"></#{@options.tagName}>'

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