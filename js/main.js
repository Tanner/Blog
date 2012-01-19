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
		selectExcerpt($(this), false);
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
		if (e.value != "") {
			e.value = e.value.substring(1);
			var postURL = postURLFormat.replace(/%s/g, e.value).replace(/-/g, "\\-");

			selectExcerpt($(".post-excerpt#" + postURL), true);
		} else {
			selectExcerpt($(".post-excerpt:first"), true);
		}
	});
}

function selectExcerpt(excerpt, scroll) {
	if (excerpt == null) {
		return;
	}

	currentExcerpt = excerpt;

	excerpt.addClass("selected");
	excerpt.siblings().removeClass("selected");

	var postURL = excerpt.attr("id");

	$.address.value("/" + postURL.substring(6, postURL.length - 5));

	$.get(postURL, function(data) {
		$('#content').html(data);
	});

	// Scroll to excerpt
	if (scroll == true) {
		if (currentExcerpt.position().top + currentExcerpt.height() / 2 > $("#excerpts").height() / 2
			|| currentExcerpt.position().top + currentExcerpt.height() / 2 <= 0) {
			$("#excerpts").scrollTop(currentExcerpt.position().top + $("#excerpts").scrollTop() - $("#excerpts").height() / 2 + MID_SCROLL_OFFSET, 0);
		} else if (currentExcerpt.position().top + currentExcerpt.height() / 2 < $("#excerpts").height() / 2
			|| currentExcerpt.position().top + currentExcerpt.height() / 2 >= $("excerpts").height()) {
			$("#excerpts").scrollTop(currentExcerpt.position().top + $("#excerpts").scrollTop() - $("#excerpts").height() / 2 + MID_SCROLL_OFFSET, 0);
		}
	}
}

function next() {
	if (currentExcerpt == null) {
		return;
	}

	var currentExcerptIndex = excerpts.index(currentExcerpt);
	if (currentExcerptIndex < excerpts.length - 1) {
		var nextExcerpt = excerpts.eq(currentExcerptIndex + 1);
		selectExcerpt(nextExcerpt, true);
	}
}

function previous() {
	if (currentExcerpt == null) {
		return;
	}

	var currentExcerptIndex = excerpts.index(currentExcerpt);
	if (currentExcerptIndex > 0) {
		var prevExcerpt = excerpts.eq(currentExcerptIndex - 1);
		selectExcerpt(prevExcerpt, true);
	}
}

key('j, down', function() {
	next();
});

key('k, up', function() {
	previous();
});