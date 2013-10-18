
# params
data = [
	{
		name: 'John B'
		sex: 'm'
		weight: .9
		pic: 'img/C4iGo.jpg'
	}
	{
		name: 'Mary J'
		sex: 'f'
		weight: .6
		pic: 'img/20.jpg'
	}
	{
		name: 'Elmer F'
		sex: 'm'
		weight: .8
		pic: 'img/self_pic___jun___12_by_ceilingdan-d55q9ww.jpg'
	}
	{
		name: 'Stacy J'
		sex: 'f'
		weight: .2
		pic: 'img/duckface-4.jpg'
	}
	{
		name: 'Becky B'
		sex: 'f'
		weight: .7
		pic: 'img/self_pic.4.jpg'
	}
	{
		name: 'Frankie A'
		sex: 'm'
		weight: .3
		pic: 'img/self_pic_by_nascar181-d5vhoez.jpg'
	}
	{
		name: 'Mark P'
		sex: 'm'
		weight: 1
		pic: 'img/selfpic-1.jpg'
	}
	{
		name: 'Stephanie X'
		sex: 'f'
		weight: .3
		pic: 'img/SelfPic.jpg'
	}
	{
		name: 'Monica I'
		sex: 'f'
		weight: .4
		pic: 'img/tara self pic.jpg'
	}
]
# options =

# 	# careful when overriding!!!
# 	template: ->

# 		"""
# 			<div class="tile tile-#{@size}" style="left:#{@x}px;top:#{@y}px" data-tyler-id="#{@id}">
# 				<div class="tile-inner">
# 					<div class="tile-front sex-#{@sex}" style="background-image:url(#{@pic})"><span class="name">#{@name}</span>
# 					</div>
# 					<div class="tile-back"></div>
# 				</div>
# 			</div>
# 		"""

# init!
tyler = new Tyler data, document.body