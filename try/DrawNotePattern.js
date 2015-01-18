
var DrawNotePattern = function(can) {
	var canvas = can;

	// var patternLength = 4; 		// second
	// var bpm = 120;				// bpm
	// var minNote = 32;			// 1/32 note
	// var minNoteLengthMs = undefined; // in ms
	// var minNoteLengthPixel = undefined;

	// minNoteLength = 60 * 1000 * 4 / (bpm * minNote);



	var getColor = function(colNr) {
		switch (colNr) {
			case 1: return 'red';
			case 2: return 'blue';
			case 3: return 'yellow';
			case 4: return 'brown';
			case 5: return '#00ff00';
			default: return 'white';
		}
	};


	var makeBlocks = function(oPattern) {
		// sort the notes
		oPattern.notes.sort( function(a,b) {
			return a.start - b.start;
		});

		// group notes into blocks if they overlap
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
		return aBlocks;
	};

	var drawAll = function(canvas, oPattern) {
	    var context = canvas.getContext('2d');
	    var maxHeight = canvas.height;

	    //120 bpm
	    // min note 1/32
	    // 4 second length
	    // => 64 * 1/32 note in 4 sec
	    var minNoteWidth = canvas.width / 64;

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
			    context.fillRect(x*minNoteWidth, height*idx, len*minNoteWidth, height);
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
	};

	return  {
		draw: function(text) {
			var oPattern = parsePattern(text);
			drawAll(canvas, oPattern);
		}
	};
};

