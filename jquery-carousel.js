var plugins = {
	slider : {
		containers : {},
		slideit : function(container)
		{
			var obj = this;
			$("#"+container).parents(".slide").siblings(".slide_buttons").find("li").removeClass("active");
			if(obj.containers[container].slide_no == obj.containers[container].slides - 2)
			{
				$("#"+container).parents(".slide").siblings(".slide_buttons").find("li:nth-child(1)").addClass("active");
			}
			else
			{
				$("#"+container).parents(".slide").siblings(".slide_buttons").find("li:nth-child("+(obj.containers[container].slide_no+1)+")").addClass("active");
			}
			if($("#"+container).parents(".slide").hasClass("vertical"))
			{
				var height = $("#"+container).find(".slide_element").outerHeight(),
				slide_height = 0;
				if($("#"+container.id).find(".slide_element").find(".slide_element_child").length)
				{
					var slide_child = $("#"+container).find(".slide_element").find(".slide_element_child");
					slide_height = slide_child.outerHeight()+parseFloat(slide_child.css("margin-top").replace("px", ""))+parseFloat(slide_child.css("margin-bottom").replace("px", ""));
				}
				shift = obj.containers[container].next_child?((height*(obj.containers[container].slide_no+1))+(slide_height*obj.containers[container].child_no)):(height*(obj.containers[container].slide_no+1));
				$("#"+container).animate({'bottom':shift+"px"}, "slow");

				if((obj.containers[container].slide_no == obj.containers[container].slides - 2 && obj.containers[container].next_child && obj.containers[container].child_no == -1) || (obj.containers[container].slide_no == obj.containers[container].slides - 3 && obj.containers[container].child_no > 0 && obj.containers[container].child_no == $(".slide_element:nth-child("+(obj.containers[container].slide_no+2)+")").find(".slide_element_child").length))
				{
					$("#"+container).animate({bottom: (height)+"px", right:"0%"}, 1);
				}
				else if(obj.containers[container].slide_no == -1)
				{
					$("#"+container).animate({bottom: (height + (slide_height * obj.containers[container].slides))+"px", right:"0%"}, 1);
				}
			}
			else
			{
				var width = $("#"+container).find(".slide_element").outerWidth(),
				slide_width = 0;
				if($("#"+container).find(".slide_element").find(".slide_element_child").length)
				{
					var slide_child = $("#"+container).find(".slide_element").find(".slide_element_child");
					slide_width = slide_child.outerWidth()+parseFloat(slide_child.css("margin-left").replace("px", ""))+parseFloat(slide_child.css("margin-right").replace("px", ""));
				}
				shift = obj.containers[container].next_child?((width*(obj.containers[container].slide_no+1))+(slide_width*obj.containers[container].child_no)):(width*(obj.containers[container].slide_no+1));
				$("#"+container).animate({'right':shift+"px"}, "slow");
				if((obj.containers[container].slide_no == obj.containers[container].slides - 2 && obj.containers[container].next_child && obj.containers[container].child_no == -1) || (obj.containers[container].slide_no == obj.containers[container].slides - 3 && obj.containers[container].child_no > 0 && obj.containers[container].child_no == $(".slide_element:nth-child("+(obj.containers[container].slide_no+2)+")").find(".slide_element_child").length))
				{
					$("#"+container).animate({'right' : (width)+"px", bottom:"0%"}, 1);
				}
				else if(obj.containers[container].slide_no == -1)
				{
					$("#"+container).animate({'right' : (width + (slide_width * obj.containers[container].slides))+"px", bottom:"0%"}, 1);
				}
			}
		},
		start_interval : function(container)
		{
			var obj = this;
			obj.containers[container].slider = setInterval(function(){
				obj.slideit(container);
				current_slide_children = $("#"+container).find(".slide_element:nth-child("+(obj.containers[container].slide_no+2)+")").find(".slide_element_child");
				if(obj.containers[container].slide_children.length && ((obj.containers[container].slide_children.length == current_slide_children.length && obj.containers[container].child_no+1 < obj.containers[container].slide_children.length) || (obj.containers[container].slide_children.length > current_slide_children.length && obj.containers[container].child_no < current_slide_children.length)))
				{
					obj.containers[container].next_child = true; obj.containers[container].child_no++;
					/*if(child_no == $(".slide_element:nth-child("+(obj.slide_no+2)+")").find(".slide_element_child").length)*/
				}
				else
				{
					if(obj.containers[container].slide_children.length)
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
					else if(!obj.containers[container].slide_children.length)
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
		slide_start : function(container, slides)
		{
			var obj = this;
			obj.containers[container.id].slides = parseInt(slides);
			var width = $("#"+container.id).find(".slide_element").width()/$("#"+container.id).width()*100;
			if($("#"+container.id).parents(".slide").hasClass("vertical"))
			{
				$("#"+container.id).css({height:(100*obj.containers[container.id].slides)+"%"});
				$("#"+container.id).find(".slide_element").css({height:(100/obj.containers[container.id].slides)+"%"});
			}
			else
			{
				if(width == 90)
				{
					$("#"+container.id).css({width:(100*obj.containers[container.id].slides)*$("#"+container.id).find(".slide_element:first-child").find(".slide_element_child").length+"%"});
					$("#"+container.id).find(".slide_element").css({width:(100/obj.containers[container.id].slides)+"%"});					
				}
				else
				{
					$("#"+container.id).css({width:(100*obj.containers[container.id].slides)+"%"});
					$("#"+container.id).find(".slide_element").css({width:(100/obj.containers[container.id].slides)+"%"});
				}
			}
			obj.containers[container.id].slide_children = $("#"+container.id).find(".slide_element:nth-child(2)").find(".slide_element_child"),
			obj.containers[container.id].child_no = obj.containers[container.id].slide_children.length?1:-1,
			obj.containers[container.id].next_child = obj.containers[container.id].slide_children.length?true:false,
			obj.containers[container.id].slide_no = obj.containers[container.id].slide_children.length?0:1;
			obj.start_interval(container.id);

			$("#"+container.id).parents(".slide").siblings(".slide_buttons").find("li").click(function(){
				obj.containers[container.id].slide_no = $(this).index();
				obj.slideit(container.id);
/*				obj.containers[container.id].slide_no++;
				if(obj.containers[container.id].slide_no == obj.containers[container.id].slides){obj.containers[container.id].slide_no = 2;}
*/				clearInterval(obj.containers[container.id].slider);
/*				obj.containers[container.id].slide_no = $(this).index() + 1;
*/
				obj.start_interval(container.id);
			});


			$("#"+container.id).find("#slide_left_arrow").click(function(){
			clearInterval(obj.containers[container.id].slider);
			obj.containers[container.id].slide_no = obj.containers[container.id].slide_no-2; if(obj.containers[container.id].slide_no == -1){obj.containers[container.id].slide_no = obj.containers[container.id].slides;}
			obj.slideit(container.id);
			obj.containers[container.id].slide_no++; if(obj.containers[container.id].slide_no == obj.containers[container.id].slides){obj.containers[container.id].slide_no = 0;}
			obj.start_interval(container.id);
			});

			$("#"+container.id).find("#slide_right_arrow").click(function(){
			clearInterval(obj.containers[container.id].slider);
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
			var container = $(".slide_main").attr("id");
			clearTimeout(obj.containers[container].timer);
			if(charcode == 40)
			{
				obj.containers[container].timer = setTimeout(function(){
					clearInterval(obj.containers[container].slider);
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
					clearInterval(obj.containers[container].slider);
					obj.slideit(container);
					obj.containers[container].event = "prev";
					obj.start_interval(container);
				}, 200);
			}
		},
		onready : function()
		{
			var obj = this;
			$(".slide_main").each(function(){
				container = $(this).attr("id");
				obj.containers[container] = {id : container};
				clearInterval(obj.containers[container].slider);
				var slides = $(this).find(".slide_element").length,
				slide_child = $(this).find(".slide_element:first-child").find(".slide_element_child"),
				slide_last_child = $(this).find(".slide_element:last-child").find(".slide_element_child");
				var append_slide_content = "<div class='slide_element last_element'>"+$(this).find(".slide_element:first-child").html()+"</div>";
				var prepend_slide_content = "<div class='slide_element first_element'>"+$(this).find(".slide_element:last-child").html()+"</div>";
				var last_element_length = $(this).find(".last_element").length;
				if(!last_element_length)
				{
					$(this).append(append_slide_content);
				}
				if(!$(this).find(".first_element").length)
				{
					$(this).prepend(prepend_slide_content);
				}
				slides = slides + 2;
				$(this).parents(".slide").siblings(".slide_buttons").find("li:nth-child(1)").addClass("active");
				obj.slide_start(obj.containers[container], slides);
				if(slide_child.length && !last_element_length)
				{
					if($(this).parents(".slide").hasClass("vertical"))
					{
						$(this).find(".slide_element.last_element").prev().css({"marginTop":-(($(this).find(".slide_element").outerHeight()-$(this).find(".slide_element_child").css("margin-bottom").replace("px", ""))*((slide_child.length-slide_last_child.length)/slide_child.length))+"px"});
					}
					else
					{
						$(this).find(".slide_element.last_element").prev().css({"marginRight":-(($(this).find(".slide_element").outerWidth()-$(this).find(".slide_element_child").css("margin-right").replace("px", ""))*((slide_child.length-slide_last_child.length)/slide_child.length))+"px"});
					}
				}
			});
			$(".slide").swipe( {
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
					var container = $(this).parents(".slide_main").attr("id");
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
							clearInterval(obj.containers[container].slider);
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
				var container = $(".slide_main").attr("id");
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
						clearInterval(obj.containers[container].slider);
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
		}
	},
};

$(document).ready(function(){
	$.each(plugins, function(key, func){
		if($.isFunction(func.onready))
		{
			func.onready();
		}
	});
	$(document).unbind("keydown").keydown(function(evt){
		$.each(plugins, function(key, func){
			if($.isFunction(func.onkeydown))
			{
				func.onkeydown(evt);
			}
		});
	});
	$(window).scroll(function(){
		$.each(plugins, function(key, func){
			if($.isFunction(func.onscroll))
			{
				func.onscroll();
			}
		});
	});
});
