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

	// Disable selection - don't show selection cursor
	$("#sidebar").bind("selectstart", function() {
		return false;
	});
	
	$("#excerpts").bind("selectstart", function() {
		return false;
	});
}