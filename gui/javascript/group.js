

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var DomLoaded = function() {
	// set caption
	var group = getParameterByName('group');
	$("#groupcaption").text(group);

	fillRiffList(group);
}


var fillRiffList = function(group) {
	var lst = ["hallo", "toll", "bauen", "reisen"];

	lst.forEach( function(c) {
		var ele = $("<li/>")
					.append('<h3>' + c + '</h3>');
		ele.appendTo("#rifflist");

	})

	$("#rifflist").listview("refresh");

}

$(document).ready( function() {
	DomLoaded();
} );


