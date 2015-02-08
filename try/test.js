
var login = function(ev) {

	var ele = $("<div/>")
			.addClass("grouplink")
			.attr("data-group", "juhu")
			.append("append-content");
	ele.appendTo("#grouplist");
	ele.click(handler);

	return false;
}

var handler = function(ev) {
	var txt = ev.target.dataset.group;
	alert("click:" + txt);
}

var init = function()
{
	$('.grouplink').click(handler)
}

$.ready = init;