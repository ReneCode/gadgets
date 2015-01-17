



var getColor = function(colNr) {
	switch (colNr) {
		case 1: return 'red';
		case 2: return 'blue';
		case 3: return 'yellow';
		case 4: return 'brown';
		case 5: return '#00ff00';
		default: return 'white';
	}
}


var makeBlocks = function(oPattern) {
	// sortieren
	oPattern.notes.sort( function(a,b) {
		return a.start - b.start;
	});

	var maxEnd = -1;
	var aBlocks = [];
	var currentBlock = undefined;
	oPattern.notes.forEach( function(note) {
		if (note.start >= maxEnd) {
			currentBlock = [note];
			aBlocks.push(currentBlock);
		}
		else {
			currentBlock.push(note);
		}
		maxEnd = Math.max(maxEnd, note.start + note.length);
	});
	console.log(aBlocks);
	return aBlocks;
}

var drawAll = function(canvas, oPattern) {
    var context = canvas.getContext('2d');
    var maxHeight = canvas.height;

    // clear
    context.fillStyle = '#eeeeee';
    context.fillRect(0, 0, canvas.width, canvas.height);

    var aBlock = makeBlocks(oPattern);

    aBlock.forEach( function(block) {
    	var height = maxHeight / block.length;
    	var idx = 0;
    	block.forEach(function(note) {
		    context.fillStyle = note.color;
		    var x = note.start;
		    var len = note.length;
		    context.fillRect(x*10, height*idx, len*10, height);
		    idx++;
    	} );
    });


}

var parsePattern = function(text) {
	var aPattern = JSON.parse(text);

	var oPattern = { notes:[] };
	aPattern.forEach( function(tone) {
		var oNote = {color: getColor(tone[0]), 
					 start: tone[1],
					 length: tone[2]};
		oPattern.notes.push(oNote);
	});
	return oPattern;
}

var drawcomposing = function() {

	var eleText = document.getElementById('text');
	var eleCanvas = document.getElementById('myCanvas');
	var text = eleText.value;

	var oPattern = parsePattern(text);

	drawAll(eleCanvas, oPattern);

	return false;
}