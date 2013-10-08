




	class Tyler

		options:

			className: 'tile'
			tagName: 'div'

		constructor: (data, element, @options) ->

			layout = @layout data

			@render layout, element

		layout: (data) ->

		render: (layout, element) ->

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