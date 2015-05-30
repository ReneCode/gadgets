

$(document).ready(function() {
	$('.colexp-btn').click(function(event) {
		$(this).children().filter('div:nth-child(2)').toggleClass("hide");
		$(this).children().filter('div:nth-child(1)').children().filter('span').toggleClass("arrow-expand");
		event.stopPropagation();
	});


});
