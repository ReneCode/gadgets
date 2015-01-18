

var drawcomposing = function() {

	var eleText = document.getElementById('text');
	var eleCanvas = document.getElementById('showCanvas');
	var text = eleText.value;

	var drawNotePattern = new DrawNotePattern(eleCanvas);
	drawNotePattern.draw(text);

	return false;
}




var entercomposing = function() {

	var eleCanvas = document.getElementById('enterCanvas');
	var enterNoteComposing = new EnterNoteComposition(eleCanvas);

	enterNoteComposing.showKeyboard();
	enterNoteComposing.start();

}
