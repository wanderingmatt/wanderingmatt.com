var LifeStream = {
	
	scroll_complete : false,
	
	init : function()
	{
		LifeStream.fadeOut();
		LifeStream.backToTop();
		LifeStream.styleSwitcher();
		LifeStream.infiniteScroll();
	},
	
	fadeOut : function()
	{
		$('body').append('<div id="fade-out"></div>');
	},
	
	backToTop : function()
	{
		$('h1 a').click(function(event) {
			$('html,body').animate({ scrollTop : 0 }, 1000);
			event.preventDefault();
		});
	},
	
	styleSwitcher : function()
	{
		LifeStream.applyInitialStyle();
		LifeStream.activeFirst();
		
		$("#header ul").hover(
			function () {
				$("#header ul li").addClass('js_show');
			}, 
			function () {
				$("#header ul li.js_show").removeClass('js_show');
			}
		);
		
		$("#header ul li a").click(function(event) {
			event.preventDefault();
			LifeStream.switchStyle(this);
		});
	},
	
	applyInitialStyle : function()
	{
		if (!$('body').hasClass('fixed')) {
			
			elements = $('#header ul li');
			random_value = Math.floor(Math.random() * elements.length);
			
			id = $(elements[random_value]).attr('id');
			LifeStream.switchStyle($('#'+id+' a'));
		}
	},
	
	activeFirst : function()
	{
		$("#header ul li.active").prependTo($("#header ul"));
	},
	
	switchStyle : function(element)
	{
		current_class = $('body').attr('class');
		new_class = $(element).attr('href');
		
		if (current_class != new_class) {
			$('body').removeClass().addClass(new_class);
			$('#'+current_class).removeClass('active');
			$('#'+new_class).addClass('active');
			LifeStream.activeFirst();
		}
	},
	
	infiniteScroll : function()
	{	
		$(window).scroll(function(){
			
			if (LifeStream.scroll_complete == false) {
				if ($(window).scrollTop() >= ($(document).height() - $(window).height()) - 100) {
					LifeStream.showHiddenItems();
					LifeStream.getItems();
				}
			}
		});
	},
	
	getItems : function()
	{
		var last_item_id = $('#lifestream li:last').attr('id');
		var offset = parseInt(last_item_id.replace('item-', '')) + 1;
		
		if (!isNaN(offset)) {
			$.get('/javascripts/items/'+offset+'.js', null, function(data) {
				$('#lifestream').append(data);
				if (data == '') {
					LifeStream.scroll_complete = true;
				}
			});
		} else {
			LifeStream.scroll_complete = true;
		}
	},
	
	showHiddenItems : function()
	{
		$('#lifestream .js_hide').removeClass('js_hide');
	}
};

$(document).ready(function() { LifeStream.init(); });