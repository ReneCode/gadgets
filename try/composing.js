

var drawcomposing = function() {

	var eleText = document.getElementById('text');
	var eleCanvas = document.getElementById('showCanvas');
	var text = eleText.value;

	var drawNotePattern = new DrawNotePattern(eleCanvas);
	drawNotePattern.draw(text);

	return false;
}


var cntXField = 4;
var cntYField = 1;

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

var showEnterKeyboard = function(canvas) {
	var context = canvas.getContext('2d');
	var maxHeight = canvas.height;

	// clear
	context.fillStyle = '#eeeeee';
	context.fillRect(0, 0, canvas.width, canvas.height);

	var xSize = canvas.width / cntXField;
	var ySize = canvas.height / cntYField;

	var x = 0
	for (var x=0; x<cntXField; x++) {
		for (var y=0; y<cntYField; y++) {
			context.fillStyle = rgbToHex(x*50, y*80, 255-x*50);
			context.fillRect(x*xSize, y*ySize, xSize, ySize);
		}
	}

}

var enterPatternTimeout = undefined;

var aEnterNotes = [];
var startEnterTime = undefined;





var finishEnterPattern = function() {
	var eleText = document.getElementById('text');

	var txt = "";
	aEnterNotes.forEach( function(note) {
		if (txt) {
			txt += ",";
		}
		txt += "[" + note[0] + "," + note[1] + "," + note[2] + "]";
	});
	txt = "[" + txt + "]";
	eleText.value = txt;
}



var getTimeNow = function() {
	var now = new Date().valueOf();
	return now;	
}



var doMouseDown = function(event) {
	event.preventDefault();

	var noteStart = getTimeNow() - startEnterTime;
	noteStart = Math.floor(noteStart / 10);

	var note = [1,noteStart,1];
	aEnterNotes.push(note);
}



var enterPattern = function(canvas) {
	enterPatternTimeout = setTimeout(finishEnterPattern, 4*1000);

	canvas.addEventListener('touchstart', doMouseDown, false);
	// canvas.addEventListener('touchend', doMouseUp, false);
	// canvas.addEventListener('touchmove', doMouseMove, false);

	canvas.addEventListener('mousedown', doMouseDown, false);
	// canvas.addEventListener('mouseup', doMouseUp, false);
	// canvas.addEventListener('mousemove', doMouseMove, false);

	startEnterTime = getTimeNow();
}


var entercomposing = function() {

	aEnterNotes = [];
	var eleCanvas = document.getElementById('enterCanvas');

	showEnterKeyboard(eleCanvas);

	enterPattern(eleCanvas);

}
