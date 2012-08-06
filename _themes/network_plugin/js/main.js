$(document).ready(function() {
    init();
})

function init() {
	drawCanvas();
	
    $(window).resize(drawCanvas);
}

function drawCanvas() {
	$("#network").attr("width", $(window).width());	
	
	drawNetwork();
}