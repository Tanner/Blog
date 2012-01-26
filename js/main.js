var currentExcerpt = null;
var excerpts = null;
var allowExcerptKeys = false;

/* Post format escaped for jQuery */
var postURLFormat = "\\/blog\\/%s\\.html"

const MID_SCROLL_OFFSET = 100;

$(document).ready(function(){
    init();
})

function init() {
	$("#sidebar li").click(function() {
		var page = $(this).find("a").attr("id");

		if (page != "avatar") {
			$.address.value("/page/" + page);

			showExcerpts(false);
		} else {
			showExcerpts(true);
		}

		selectPage(page);
	});

	$("#sidebar li").hover(
		function() {
			$(this).find("span.tooltip").addClass("visible");
		},
		function() {
			$(this).find("span.tooltip").removeClass("visible");			
		}
	);

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
			// Remove leading '/'
			e.value = e.value.substring(1);

			if (e.value.indexOf("page/") != -1) {
				// We've got a static page from the navbar
				selectPage(e.value.substring(5));
			} else {
				// We've got a post from the excerpts bar
				var postURL = postURLFormat.replace(/%s/g, e.value).replace(/-/g, "\\-");

				selectExcerpt($(".post-excerpt#" + postURL), true);
				showExcerpts(true);
			}
		} else {
			selectExcerpt($(".post-excerpt:first"), true);
			showExcerpts(true);
		}
	});
}

function showExcerpts(show) {
	allowExcerptKeys = show;

	if (show) {
		$("#content").addClass("contracted");
		$("#excerpts").addClass("expanded");
	} else {
		$("#content").removeClass("contracted");
		$("#excerpts").removeClass("expanded");
	}
}

function selectPage(page) {
	var navIcon = $("#sidebar li").find("a#" + page).parents("li");
	navIcon.addClass("selected");
	navIcon.siblings().removeClass("selected");

	if (page == "avatar") {
		if (currentExcerpt.length == 0) {
			currentExcerpt = $(".post-excerpt:first");
		}

		selectExcerpt(currentExcerpt, true);
	} else {
		$.address.value("/page/" + page);

		var url = "pages/" + page + ".html";

		$.get(url, function(data) {
			$('#content').html(data);
		});

		$(".post-excerpt.selected").removeClass("selected");
	}
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

	$("#sidebar li:first").addClass("selected").siblings().removeClass("selected");
}

function next() {
	if (currentExcerpt == null || !allowExcerptKeys) {
		return;
	}

	var currentExcerptIndex = excerpts.index(currentExcerpt);
	if (currentExcerptIndex < excerpts.length - 1) {
		var nextExcerpt = excerpts.eq(currentExcerptIndex + 1);
		selectExcerpt(nextExcerpt, true);
	}
}

function previous() {
	if (currentExcerpt == null || !allowExcerptKeys) {
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