


var _createnewgroup = function() {
	var name = $("#groupname").val();

	if (name == "") {
		name = "new empty group";
	}
/*
	$("#grouplist").append('<li><a href="group2.html" onclick="changepage(id_' + name + ');"><h3>' + name + '</h3></a></li>');

	$("#grouplist").listview("refresh");
*/

	var ele = $("<li/>")
				.append('<a href="group2.html"><h3>name</h3></a>');

	ele.appendTo("#grouplist");



	$("#grouplist").listview("refresh");


//	<li><a href="group2.html"><h3>Paul</h3><p>3.4.2015</p></a></li>
/*

	var ele = $("<div/>")
				.addClass("grouplink")
				.attr("data-group", groupId)
				.append(group.name);
		ele.appendTo("#grouplist");
		ele.click({group: groupId}, showriif);
		*/
	return false;
}



var ajaxSuccessCreateGroup = function(data) {
	var ele = $("<li/>")
			.addClass("grouplink")
			.attr("href", data._id)
			.append(data.name);
	ele.appendTo("#grouplist");
}

var createnewgroup = function() {
	var author = $('#loginname').val();
	var groupname = $('#groupname').val();
	if (groupname.trim() == "") {
		return;
	}
	var dburl = 'http://localhost:8085/api/group';
	var cdate = new Date().toJSON();
	var data = {
		cdate: cdate,
		name:groupname,
		members:[author, groupname]
	};

	$.ajax( {
		type: 'POST',
		url: dburl,
		dataType: 'json',
		contentType: "application/json; charset=UTF-8",
		data: JSON.stringify(data),
		success: ajaxSuccessCreateGroup
	});
}