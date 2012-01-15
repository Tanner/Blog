var currentExcerpt = null;
var excerpts = null;

$(document).ready(function(){
    init();
})

function init() {
	$("#sidebar li").click(function() {		
		$(this).addClass("selected");
		$(this).siblings().removeClass("selected");
	});

	excerpts = $(".post-excerpt");

	excerpts.click(function() {
		selectExcerpt($(this));
	});

	currentExcerpt = $(".post-exceprt:first");

	// Disable selection - don't show selection cursor
	$("#sidebar").bind("selectstart", function() {
		return false;
	});

	$("#excerpts").bind("selectstart", function() {
		return false;
	});
}

function selectExcerpt(excerpt) {
	if (excerpt == null) {
		return;
	}

	currentExcerpt = excerpt;

	excerpt.addClass("selected");
	excerpt.siblings().removeClass("selected");

	console.log("URL: "+excerpt.attr("id"));
	$.get(excerpt.attr("id"), function(data) {
		$('#content').html(data);
	});
}

key('j, down', function() {
	if (currentExcerpt == null) {
		return;
	}

	var currentExcerptIndex = excerpts.index(currentExcerpt);
	if (currentExcerptIndex < excerpts.length - 1) {
		var nextExcerpt = excerpts.eq(currentExcerptIndex + 1);
		selectExcerpt(nextExcerpt);
	}
});

key('k, up', function() {
	if (currentExcerpt == null) {
		return;
	}

	var currentExcerptIndex = excerpts.index(currentExcerpt);
	if (currentExcerptIndex > 0) {
		var prevExcerpt = excerpts.eq(currentExcerptIndex - 1);
		selectExcerpt(prevExcerpt);
	}
});