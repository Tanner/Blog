var currentExcerpt = null;
var excerpts = null;

const MID_SCROLL_OFFSET = 100;

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

	$.get(excerpt.attr("id"), function(data) {
		$('#content').html(data);
	});
}

function next() {
	if (currentExcerpt == null) {
		return;
	}

	var currentExcerptIndex = excerpts.index(currentExcerpt);
	if (currentExcerptIndex < excerpts.length - 1) {
		var nextExcerpt = excerpts.eq(currentExcerptIndex + 1);
		selectExcerpt(nextExcerpt);

		if (nextExcerpt.position().top + nextExcerpt.height() / 2 > $("#excerpts").height() / 2) {
			$("#excerpts").scrollTop(nextExcerpt.position().top + $("#excerpts").scrollTop() - $("#excerpts").height() / 2 + MID_SCROLL_OFFSET, 0);
		}
	}
}

function previous() {
	if (currentExcerpt == null) {
		return;
	}

	var currentExcerptIndex = excerpts.index(currentExcerpt);
	if (currentExcerptIndex > 0) {
		var prevExcerpt = excerpts.eq(currentExcerptIndex - 1);
		selectExcerpt(prevExcerpt);

		if (prevExcerpt.position().top + prevExcerpt.height() / 2 < $("#excerpts").height() / 2) {
			$("#excerpts").scrollTop(prevExcerpt.position().top + $("#excerpts").scrollTop() - $("#excerpts").height() / 2 + MID_SCROLL_OFFSET, 0);
		}
	}
}

key('j, down', function() {
	next();
});

key('k, up', function() {
	previous();
});