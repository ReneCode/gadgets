



var drawcomposing = function() {

	var eleText = document.getElementById('text');
	var eleCanvas = document.getElementById('myCanvas');
	var text = eleText.value;

	var drawNotePattern = new DrawNotePattern(eleCanvas);
	drawNotePattern.draw(text);

	return false;
}