var currentExcerpt = null;
var excerpts = null;
var allowExcerptKeys = false;

/* Post format escaped for jQuery */
var postURLFormat = "\\/blog\\/%s\\.html"

const MID_SCROLL_OFFSET = 100;
const TITLE_PREFIX = "Tanner's Blog - ";

$(document).ready(function() {
    if (window.navigator && window.navigator.loadPurpose === "preview") {
	    window.location.href = "http://www.tannersmith.me/blog/preview.html"
	}

    init();
})

function init() {
	$("nav li").click(function() {
		var page = $(this).find("a").attr("id");

		if (page != "avatar") {
			$.address.value("/page/" + page);

			showExcerpts(false);
		} else {
			if ($("#excerpts-bar").hasClass("expanded")) {
				$("#excerpts").animate({ scrollTop: 0}, 150);

				currentExcerpt = $(".post-excerpt:first");
			} else {
				showExcerpts(true);
			}
		}

		selectPage(page);
	});

	$("nav li").hover(
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

	currentExcerpt = $(".post-excerpt:first");

	// Disable selection - don't show selection cursor
	$("nav").bind("selectstart", function() {
		return false;
	});

	$("nav").bind("selectstart", function() {
		return false;
	});

	$("#excerpts").bind("scroll", function() {
		setExcerptsTopDate();
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

function setExcerptsTopDate() {
	var sections = $(".section");
	var edgeSection = null;
	for (var i = 0; i < sections.size(); i++) {
		if (sections.eq(i).position().top + sections.eq(i).outerHeight() > 0) {
			edgeSection = sections.eq(i);

			break;
		}
	}

	$("#excerpts-top-date").removeClass("hidden");
	edgeSection.addClass("edge").siblings().removeClass("edge");
	$("#excerpts-top-date").html(edgeSection.children(".date").clone());
}

function showExcerpts(show) {
	allowExcerptKeys = show;

	if (show) {
		$("#content").addClass("contracted");
		$("#excerpts-bar").addClass("expanded");
	} else {
		$("#content").removeClass("contracted");
		$("#excerpts-bar").removeClass("expanded");
	}

	setExcerptsTopDate();
}

function selectPage(page) {
	var navIcon = $("nav li").find("a#" + page).parents("li");
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
			$("#content").html(data);
			$.address.title(TITLE_PREFIX + $("#content article header h1").html());
		});

		$(".post-excerpt.selected").removeClass("selected");
	}

	$("#content").scrollTop(0);
}

function selectExcerpt(excerpt, scroll) {
	if (excerpt == null) {
		return;
	}

	currentExcerpt = excerpt;

	$(".post-excerpt").removeClass("selected");
	excerpt.addClass("selected");

	var postURL = excerpt.attr("id");

	$.address.value("/" + postURL.substring(6, postURL.length - 5));

	$.get(postURL, function(data) {
		$("#content").html(data);
		$.address.title(TITLE_PREFIX + $("#content article header h1").html());
	});

	// Scroll to excerpt
	if (scroll == true) {
		var excerptPosition = currentExcerpt.parent().position().top + currentExcerpt.position().top + currentExcerpt.height() / 2;
		var newPosition = currentExcerpt.parent().position().top + currentExcerpt.position().top + $("#excerpts").scrollTop() - $("#excerpts").height() / 2 + MID_SCROLL_OFFSET;

		if (excerptPosition > $("#excerpts").height() / 2 || excerptPosition <= 0) {
			$("#excerpts").animate({ scrollTop: newPosition}, 150);
		} else if (excerptPosition < $("#excerpts").height() / 2 || excerptPosition >= $("excerpts").height()) {
			$("#excerpts").animate({ scrollTop: newPosition}, 150);
		}
	}
	
	$("#content").scrollTop(0);

	$("nav li:first").addClass("selected").siblings().removeClass("selected");
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