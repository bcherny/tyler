
Tyler = (@data, @element, @options) ->

	


# UMD (play nice with AMD, CommonJS, globals)
umd = (name, factory) ->
	if typeof exports is 'object'
		module.exports = factory
	else if typeof define is 'function' and define.amd
		define name, factory
	else
		@[name] = factory

# export!
umd 'Tyler', Tyler