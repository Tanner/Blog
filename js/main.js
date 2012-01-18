var currentExcerpt = null;
var excerpts = null;

/* Post format escaped for jQuery */
var postURLFormat = "\\/blog\\/%s\\.html"

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

	// Permalink stuff
	$.address.strict(false);
	$.address.crawlable(true);
	$.address.externalChange(function(e) {
		var postURL = postURLFormat.replace(/%s/g, e.value).replace(/-/g, "\\-");

		selectExcerpt($(".post-excerpt#" + postURL));
	});
}

function selectExcerpt(excerpt) {
	if (excerpt == null) {
		return;
	}

	currentExcerpt = excerpt;

	excerpt.addClass("selected");
	excerpt.siblings().removeClass("selected");

	var postURL = excerpt.attr("id");

	$.address.value(postURL.substring(6, postURL.length - 5));

	$.get(postURL, function(data) {
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

		if (nextExcerpt.position().top + nextExcerpt.height() / 2 > $("#excerpts").height() / 2
			|| nextExcerpt.position().top + nextExcerpt.height() / 2 <= 0) {
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

		if (prevExcerpt.position().top + prevExcerpt.height() / 2 < $("#excerpts").height() / 2
			|| prevExcerpt.position().top + prevExcerpt.height() / 2 >= $("excerpts").height()) {
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