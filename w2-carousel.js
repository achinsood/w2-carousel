var w2_carousel_plugin = {
	carousel : {
		containers : {},
		slideit : function(container)
		{
			var obj = this;
			$("#"+container).parents("[w2-carousel]").find("[w2-carousel-buttons]").find("li").removeClass("active");
			if(obj.containers[container].slide_no == obj.containers[container].slides - 2)
			{
				$("#"+container).parents("[w2-carousel]").find("[w2-carousel-buttons]").find("li:nth-child(1)").addClass("active");
			}
			else
			{
				$("#"+container).parents("[w2-carousel]").find("[w2-carousel-buttons]").find("li:nth-child("+(obj.containers[container].slide_no+1)+")").addClass("active");
			}
			if($("#"+container).parents("[w2-carousel]").attr("w2-vertical-carousel") == "true" || $("#"+container).parents("[w2-carousel]").attr("w2-vertical-carousel") == true)
			{
				var height = $("#"+container).find("[w2-carousel-element]").outerHeight(),
				w2_carousel_height = 0;
				if($("#"+container.id).find("[w2-carousel-element]").find("[w2-carousel-element-child]").length)
				{
					var w2_carousel_child = $("#"+container).find("[w2-carousel-element]").find("[w2-carousel-element-child]");
					w2_carousel_height = w2_carousel_child.outerHeight()+parseFloat(w2_carousel_child.css("margin-top").replace("px", ""))+parseFloat(w2_carousel_child.css("margin-bottom").replace("px", ""));
				}
				shift = obj.containers[container].next_child?((height*(obj.containers[container].slide_no+1))+(w2_carousel_height*obj.containers[container].child_no)):(height*(obj.containers[container].slide_no+1));
				$("#"+container).animate({'bottom':shift+"px"}, "slow");

				if((obj.containers[container].slide_no == obj.containers[container].slides - 2 && obj.containers[container].next_child && obj.containers[container].child_no == -1) || (obj.containers[container].slide_no == obj.containers[container].slides - 3 && obj.containers[container].child_no > 0 && obj.containers[container].child_no == $("[w2-carousel-element]:nth-child("+(obj.containers[container].slide_no+2)+")").find("[w2-carousel-element-child]").length))
				{
					$("#"+container).animate({bottom: (height)+"px", right:"0%"}, 1);
				}
				else if(obj.containers[container].slide_no == -1)
				{
					$("#"+container).animate({bottom: (height + (w2_carousel_height * obj.containers[container].slides))+"px", right:"0%"}, 1);
				}
			}
			else
			{
				var width = $("#"+container).find("[w2-carousel-element]").outerWidth(),
				w2_carousel_width = 0;
				if($("#"+container).find("[w2-carousel-element]").find("[w2-carousel-element-child]").length)
				{
					var w2_carousel_child = $("#"+container).find("[w2-carousel-element]").find("[w2-carousel-element-child]");
					w2_carousel_width = w2_carousel_child.outerWidth()+parseFloat(w2_carousel_child.css("margin-left").replace("px", ""))+parseFloat(w2_carousel_child.css("margin-right").replace("px", ""));
				}
				shift = obj.containers[container].next_child?((width*(obj.containers[container].slide_no+1))+(w2_carousel_width*obj.containers[container].child_no)):(width*(obj.containers[container].slide_no+1));
				$("#"+container).animate({'right':shift+"px"}, "slow");
				if((obj.containers[container].slide_no == obj.containers[container].slides - 2 && obj.containers[container].next_child && obj.containers[container].child_no == -1) || (obj.containers[container].slide_no == obj.containers[container].slides - 3 && obj.containers[container].child_no > 0 && obj.containers[container].child_no == $("[w2-carousel-element]:nth-child("+(obj.containers[container].slide_no+2)+")").find("[w2-carousel-element-child]").length))
				{
					$("#"+container).animate({'right' : (width)+"px", bottom:"0%"}, 1);
				}
				else if(obj.containers[container].slide_no == -1)
				{
					$("#"+container).animate({'right' : (width + (w2_carousel_width * obj.containers[container].slides))+"px", bottom:"0%"}, 1);
				}
			}
		},
		start_interval : function(container)
		{
			var obj = this;
			obj.containers[container].carousel = setInterval(function(){
				obj.slideit(container);
				current_w2_carousel_children = $("#"+container).find("[w2-carousel-element]:nth-child("+(obj.containers[container].slide_no+2)+")").find("[w2-carousel-element-child]");
				if(obj.containers[container].w2_carousel_children.length && ((obj.containers[container].w2_carousel_children.length == current_w2_carousel_children.length && obj.containers[container].child_no+1 < obj.containers[container].w2_carousel_children.length) || (obj.containers[container].w2_carousel_children.length > current_w2_carousel_children.length && obj.containers[container].child_no < current_w2_carousel_children.length)))
				{
					obj.containers[container].next_child = true; obj.containers[container].child_no++;
					/*if(child_no == $("[w2-carousel-element]:nth-child("+(obj.slide_no+2)+")").find("[w2-carousel-element-child]").length)*/
				}
				else
				{
					if(obj.containers[container].w2_carousel_children.length)
					{
						obj.containers[container].child_no = 0; obj.containers[container].slide_no++;
						obj.containers[container].next_child = false;
						if(obj.containers[container].slide_no == obj.containers[container].slides-2)
						{
							obj.containers[container].child_no = 1;
							obj.containers[container].slide_no = 0;
							obj.containers[container].next_child = true;
						}
					}
					else if(!obj.containers[container].w2_carousel_children.length)
					{
						obj.containers[container].child_no = -1; obj.containers[container].slide_no++;
						obj.containers[container].next_child = false;
						if(obj.containers[container].slide_no == obj.containers[container].slides-2)
						{
							obj.containers[container].next_child = true;
						}
						if(obj.containers[container].slide_no == obj.containers[container].slides-1)
						{
							obj.containers[container].slide_no = 1;
							obj.containers[container].next_child = false;
						}
					}
				}
			}, 4000);
		},
		carousel_start : function(container, slides)
		{
			var obj = this;
			obj.containers[container.id].slides = parseInt(slides);
			var width = $("#"+container.id).find("[w2-carousel-element]").width()/$("#"+container.id).width()*100;
			if($("#"+container.id).parents("[w2-carousel]").attr("w2-vertical-carousel") == "true" || $("#"+container.id).parents("[w2-carousel]").attr("w2-vertical-carousel") == true)
			{
				$("#"+container.id).css({height:(100*obj.containers[container.id].slides)+"%"});
				$("#"+container.id).find("[w2-carousel-element]").css({height:(100/obj.containers[container.id].slides)+"%"});
			}
			else
			{
				if(width == 90)
				{
					$("#"+container.id).css({width:(100*obj.containers[container.id].slides)*$("#"+container.id).find("[w2-carousel-element]:last-child").find("[w2-carousel-element-child]").length+"%"});
					$("#"+container.id).find("[w2-carousel-element]").css({width:(100/obj.containers[container.id].slides)+"%"});					
				}
				else
				{
					$("#"+container.id).css({width:(100*obj.containers[container.id].slides)+"%"});
					$("#"+container.id).find("[w2-carousel-element]").css({width:(100/obj.containers[container.id].slides)+"%"});
				}
			}
			obj.containers[container.id].w2_carousel_children = $("#"+container.id).find("[w2-carousel-element]:nth-child(2)").find("[w2-carousel-element-child]"),
			obj.containers[container.id].child_no = obj.containers[container.id].w2_carousel_children.length?1:-1,
			obj.containers[container.id].next_child = obj.containers[container.id].w2_carousel_children.length?true:false,
			obj.containers[container.id].slide_no = obj.containers[container.id].w2_carousel_children.length?0:1;
			obj.start_interval(container.id);

			$("#"+container.id).parents("[w2-carousel]").find("[w2-carousel-buttons]").find("li").click(function(){
				obj.containers[container.id].slide_no = $(this).index();
				obj.slideit(container.id);
/*				obj.containers[container.id].slide_no++;
				if(obj.containers[container.id].slide_no == obj.containers[container.id].slides){obj.containers[container.id].slide_no = 2;}
*/				clearInterval(obj.containers[container.id].carousel);
/*				obj.containers[container.id].slide_no = $(this).index() + 1;
*/
				obj.start_interval(container.id);
			});


			$("#"+container.id).find("#w2-carousel-left-arrow").click(function(){
			clearInterval(obj.containers[container.id].carousel);
			obj.containers[container.id].slide_no = obj.containers[container.id].slide_no-2; if(obj.containers[container.id].slide_no == -1){obj.containers[container.id].slide_no = obj.containers[container.id].slides;}
			obj.slideit(container.id);
			obj.containers[container.id].slide_no++; if(obj.containers[container.id].slide_no == obj.containers[container.id].slides){obj.containers[container.id].slide_no = 0;}
			obj.start_interval(container.id);
			});

			$("#"+container.id).find("#w2-carousel-right-arrow").click(function(){
			clearInterval(obj.containers[container.id].carousel);
			if(obj.containers[container.id].slide_no == obj.containers[container.id].slides){obj.containers[container.id].slide_no = 2;}
			obj.slideit(container.id);
			obj.containers[container.id].slide_no++; if(obj.containers[container.id].slide_no == obj.containers[container.id].slides){obj.containers[container.id].slide_no = 2;}
			obj.start_interval(container.id);
			});
		},
		onkeydown : function(evt)
		{
			var obj = this;
			evt = (evt) ? evt : document.event;
			var charcode = (evt.which) ? evt.which : evt.keyCode;
			var container = $("[w2-carousel-main]").attr("id");
			clearTimeout(obj.containers[container].timer);
			if(charcode == 40)
			{
				obj.containers[container].timer = setTimeout(function(){
					clearInterval(obj.containers[container].carousel);
					if(obj.containers[container].hasOwnProperty("event") && obj.containers[container].event == "prev")
					{
						obj.containers[container].slide_no++;
					}
					if(obj.containers[container].slide_no == 0)
					{
						obj.containers[container].slide_no = 1;
					}
					else if(obj.containers[container].slide_no >= obj.containers[container].slides - 2)
					{
						obj.containers[container].slide_no = obj.containers[container].slides - 3;
					}
					obj.slideit(container);
					obj.containers[container].slide_no++;
					if(obj.containers[container].slide_no >= (obj.containers[container].slides - 2)){obj.containers[container].slide_no = obj.containers[container].slides - 2;}
					obj.start_interval(container);
					obj.containers[container].event = "next";
				}, 200);
			}
			if(charcode == 38)
			{
				obj.containers[container].timer = setTimeout(function(){
					if(obj.containers[container].hasOwnProperty("event") && obj.containers[container].event == "next")
					{
						obj.containers[container].slide_no-=2;
					}
					else
					{
						obj.containers[container].slide_no--;
					}
					if(obj.containers[container].slide_no < 1){obj.containers[container].slide_no = 0;}
					clearInterval(obj.containers[container].carousel);
					obj.slideit(container);
					obj.containers[container].event = "prev";
					obj.start_interval(container);
				}, 200);
			}
		},
		onready : function()
		{
			var obj = this;
			$("[w2-carousel-main]").each(function(){
				container = $(this).attr("id");
				obj.containers[container] = {id : container};
				clearInterval(obj.containers[container].carousel);
				var slides = $(this).find("[w2-carousel-element]").length,
				w2_carousel_child = $(this).find("[w2-carousel-element]:last-child").find("[w2-carousel-element-child]"),
				w2_carousel_last_child = $(this).find("[w2-carousel-element]:last-child").find("[w2-carousel-element-child]");
				var append_w2_carousel_content = "<div w2-carousel-element wp-carousel-last-element>"+$(this).find("[w2-carousel-element]:last-child").html()+"</div>";
				var prepend_w2_carousel_content = "<div w2-carousel-element wp-carousel-first-element>"+$(this).find("[w2-carousel-element]:last-child").html()+"</div>";
				var last_element_length = $(this).find("[last_element]").length;
				if(!last_element_length)
				{
					$(this).append(append_w2_carousel_content);
				}
				if(!$(this).find("[wp-carousel-first-element]").length)
				{
					$(this).prepend(prepend_w2_carousel_content);
				}
				slides = slides + 2;
				$(this).parents("[w2-carousel]").find("[w2-carousel-buttons]").find("li:nth-child(1)").addClass("active");
				obj.carousel_start(obj.containers[container], slides);
				if(w2_carousel_child.length && !last_element_length)
				{
					if($("#"+container).parents("[w2-carousel]").attr("w2-vertical-carousel") == "true" || $("#"+container).parents("[w2-carousel]").attr("w2-vertical-carousel") == true)
					{
						$(this).find("[wp-carousel-last-element]").prev().css({"marginTop":-(($(this).find("[w2-carousel-element]").outerHeight()-$(this).find("[w2-carousel-element-child]").css("margin-bottom").replace("px", ""))*((w2_carousel_child.length-w2_carousel_last_child.length)/w2_carousel_child.length))+"px"});
					}
					else
					{
						console.log($(this).find("[wp-carousel-last-element]").prev());
						$(this).find("[wp-carousel-last-element]").prev().css({"marginRight":-(($(this).find("[w2-carousel-element]").outerWidth()-$(this).find("[w2-carousel-element-child]").css("margin-right").replace("px", ""))*((w2_carousel_child.length-w2_carousel_last_child.length)/w2_carousel_child.length))+"px"});
					}
				}
				if($(this).attr("w2-carousel-pause-onhover") == "true" || $(this).attr("w2-carousel-pause-onhover") == true)
				{
	                $(this).mouseover(function() {
	                    clearInterval(obj.containers[$(this).attr("id")].carousel);
	                });
	                $(this).mouseout(function() {
	                    clearInterval(obj.containers[$(this).attr("id")].carousel);
	                    obj.start_interval($(this).attr("id"));
	                });
	            }
			});
/*			$("[w2-carousel]").swipe( {
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					var container = $(this).parents("[w2-carousel-main]").attr("id");
					clearTimeout(obj.containers[container].timer);
					if (direction == "right") {
						obj.containers[container].timer = setTimeout(function(){
							if(obj.containers[container].hasOwnProperty("event") && obj.containers[container].event == "next")
							{
								obj.containers[container].slide_no-=2;
							}
							else
							{
								obj.containers[container].slide_no--;
							}
							if(obj.containers[container].slide_no < 1){obj.containers[container].slide_no = 0;}
							clearInterval(obj.containers[container].carousel);
							obj.slideit(container);
							obj.containers[container].event = "prev";
						}, 200);
					}
					else{
						obj.containers[container].timer = setTimeout(function(){
							if(obj.containers[container].hasOwnProperty("event") && obj.containers[container].event == "prev")
							{
								obj.containers[container].slide_no++;
							}
							if(obj.containers[container].slide_no == 0)
							{
								obj.containers[container].slide_no = 1;
							}
							else if(obj.containers[container].slide_no >= obj.containers[container].slides - 2)
							{
								obj.containers[container].slide_no = obj.containers[container].slides - 3;
							}
						obj.slideit(container);
						obj.containers[container].slide_no++;
						if(obj.containers[container].slide_no >= (obj.containers[container].slides - 2)){obj.containers[container].slide_no = obj.containers[container].slides - 2;}
						obj.containers[container].event = "next";
						}, 200);
					}
				}
			});
			$(window).bind('mousewheel', function(event) {
				var container = $("[w2-carousel-main]").attr("id");
				clearTimeout(obj.containers[container].timer);
				if (event.originalEvent.wheelDelta/120 >= 0) {
					obj.containers[container].timer = setTimeout(function(){
						if(obj.containers[container].hasOwnProperty("event") && obj.containers[container].event == "next")
						{
							obj.containers[container].slide_no-=2;
						}
						else
						{
							obj.containers[container].slide_no--;
						}
						if(obj.containers[container].slide_no < 1){obj.containers[container].slide_no = 0;}
						clearInterval(obj.containers[container].carousel);
						obj.slideit(container);
						obj.containers[container].event = "prev";
					}, 200);
				}
				else{
					obj.containers[container].timer = setTimeout(function(){
						if(obj.containers[container].hasOwnProperty("event") && obj.containers[container].event == "prev")
						{
							obj.containers[container].slide_no++;
						}
						if(obj.containers[container].slide_no == 0)
						{
							obj.containers[container].slide_no = 1;
						}
						else if(obj.containers[container].slide_no >= obj.containers[container].slides - 2)
						{
							obj.containers[container].slide_no = obj.containers[container].slides - 3;
						}
					obj.slideit(container);
					obj.containers[container].slide_no++;
					if(obj.containers[container].slide_no >= (obj.containers[container].slides - 2)){obj.containers[container].slide_no = obj.containers[container].slides - 2;}
					obj.containers[container].event = "next";
					}, 200);
				}
			});
*/		},
		readyOrAjaxComplete : function()
		{
			$.each(w2_carousel_plugin, function(key, func){
				if($.isFunction(func.onready))
				{
					func.onready();
				}
			});
/*			$(document).unbind("keydown").keydown(function(evt){
				$.each(w2_carousel_plugin, function(key, func){
					if($.isFunction(func.onkeydown))
					{
						func.onkeydown(evt);
					}
				});
			});
			$(window).scroll(function(){
				$.each(w2_carousel_plugin, function(key, func){
					if($.isFunction(func.onscroll))
					{
						func.onscroll();
					}
				});
			});			
*/		}
	},
};


$(document).ready(function(){
	w2_carousel_plugin.carousel.readyOrAjaxComplete();
});
