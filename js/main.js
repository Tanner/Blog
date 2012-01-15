$(document).ready(function(){
    init();
})

function init() {
	$("#sidebar li").click(function() {		
		$(this).addClass("selected");
		$(this).siblings().removeClass("selected");
	});

	$(".post-excerpt").click(function() {
		$(this).addClass("selected");
		$(this).siblings().removeClass("selected");
	});
}