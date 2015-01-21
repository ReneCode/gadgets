
var EnterNoteComposition = function(can) {
	var canvas = can;


	var cntXField = 4;
	var cntYField = 2;


	var enterPatternTimeout = undefined;

	var aEnterNotes = [];
	var startEnterTime = undefined;

	var lastMouseDownTime = undefined;
	var lastNoteValue = undefined;

	// 120 bpm
	// 1/32 = min note
	// =>  1/4 note = 0.5 sec / 500 ms
	//     1/8 note = 500 ms / 2 = 250 ms
	//     1/32 note = 500 ms / 8 = 62.5 ms
	//var timeQuant = 62.5;
	var timeQuant = 62.5;



	var componentToHex = function(c) {
	    var hex = c.toString(16);
	    return hex.length == 1 ? "0" + hex : hex;
	}

	var rgbToHex = function (r, g, b) {
	    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}

	var showEnterKeyboard = function() {
		var context = canvas.getContext('2d');
		var maxHeight = canvas.height;

		// clear
		context.fillStyle = '#eeeeee';
		context.fillRect(0, 0, canvas.width, canvas.height);

		var xSize = canvas.width / cntXField;
		var ySize = canvas.height / cntYField;

		var colNumber = 1;
		for (var x=0; x<cntXField; x++) {
			for (var y=0; y<cntYField; y++) {
				context.fillStyle = getColorFromNumber(1+ x + y*cntXField);
				colNumber++;
				context.fillRect(x*xSize, y*ySize, xSize, ySize);
			}
		}

	}



	var getNoteValueFromTapPoint = function(pt) {
		var xSize = canvas.width / cntXField;
		var ySize = canvas.height / cntYField;

		var xTile = Math.floor(pt.x / xSize);
		var yTile = Math.floor(pt.y / ySize);
		var noteValue = 1 + (cntXField * yTile + xTile);
		return noteValue;
	}

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


	var getMousePosition = function(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		if (event.type == 'mousedown'  ||  event.type == 'mousemove') {
			return {
				x: parseInt(evt.clientX - rect.left),
				y: parseInt(evt.clientY - rect.top)
			};
		}
		else {
			var pt = evt.targetTouches[0];

			if (!pt) {
				return null; 
			}
			return {
				x: parseInt(evt.targetTouches[0].clientX - rect.left),
				y: parseInt(evt.targetTouches[0].clientY - rect.top)
			};
		}
	}

	var doMouseDown = function(event) {
		event.preventDefault();

		lastMouseDownTime = getTimeNow();

		var pt = getMousePosition(canvas, event);
		lastNoteValue = getNoteValueFromTapPoint(pt);

/*		var noteStart = getTimeNow() - startEnterTime;
		noteStart = Math.floor(noteStart / timeQuant);

		var pt = getMousePosition(canvas, event);
		var noteValue = getNoteValueFromTapPoint(pt);

		var note = [noteValue,noteStart,1];
		aEnterNotes.push(note);
		*/
	}

	var doMouseUp = function(event) {
		event.preventDefault();

		var noteLength = getTimeNow() - lastMouseDownTime;
		noteLength = Math.floor(noteLength / timeQuant);
		// minimal 1 length
		noteLength = Math.max(noteLength, 1);

		var noteStart = lastMouseDownTime - startEnterTime;
		noteStart = Math.floor(noteStart / timeQuant);

		var note = [lastNoteValue,noteStart,noteLength];
		aEnterNotes.push(note);
	}


	var enterPattern = function() {
		enterPatternTimeout = setTimeout(finishEnterPattern, 4*1000);

		canvas.addEventListener('touchstart', doMouseDown, false);
		canvas.addEventListener('touchend', doMouseUp, false);
		// canvas.addEventListener('touchmove', doMouseMove, false);

		canvas.addEventListener('mousedown', doMouseDown, false);
		canvas.addEventListener('mouseup', doMouseUp, false);
		// canvas.addEventListener('mousemove', doMouseMove, false);

		startEnterTime = getTimeNow();
	}


	var startComposition = function() {
		aEnterNotes = [];
		enterPattern();
	}


	return {
		showKeyboard: function() {
			showEnterKeyboard();
		},

		start: function() {
			startComposition();
		}
	};

}