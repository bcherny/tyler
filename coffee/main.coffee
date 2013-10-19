
data = [
	{ name: 'Messages', icon: 'iconmonstr-speech-bubble-13-icon.svg' },
	{ name: 'Internet Explorer', icon: 'internet-explorer-icon.svg' },
	{ name: 'Mail', icon: 'iconmonstr-inbox-6-icon.svg' },
	{ name: 'Twitter', icon: 'iconmonstr-twitter-icon.svg' },
	{ name: 'Facebook', icon: 'iconmonstr-facebook-2-icon.svg' },
	{ name: 'Skype', icon: 'iconmonstr-skype-icon.svg' },
	{ name: 'Chrome', icon: 'iconmonstr-chrome-icon.svg' },
	{ name: 'Tools', icon: 'iconmonstr-css-code-icon.svg' },
	{ name: 'Favorites', icon: 'iconmonstr-favorite-icon.svg' },
	{ name: 'Internet', icon: 'iconmonstr-globe-3-icon.svg' },
	{ name: 'Home', icon: 'iconmonstr-home-4-icon.svg' },
	{ name: 'RSS', icon: 'iconmonstr-rss-icon.svg' },
]

options =

	templateFront: ->

		"""
			<div class="tile-front" style="background-image:url(img/#{@icon})">
				<span class="name">#{@name}</span>
			</div>
		"""

# init!
tyler = new Tyler data, document.body, options