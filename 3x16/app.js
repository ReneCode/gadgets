
var MAX_ROW = 3;
var MAX_NR = 16;
var MAX_STORAGE = 5;

// cards = [];


function StorageRow() {
	var cards = [];

	this.toString = function() {
		console.log(JSON.stringify(this.cards));
	}
	this.length = function() {
		return this.cards.length;
	}
	this.push = function(card) {
		console.log(this.cards);
//		this.cards.push(card);
	} 
	this.top = function() {
		cnt = this.length();
		if (cnt > 0) {
			return this.cards[cnt-1];
		}
		else {
			return undefined;
		}
	}
}


function fillCards(cards) {
	for (r=0; r<MAX_ROW; r++) {
		var row = [];
		for (var i=1; i<=MAX_NR; i++) {
			row.push(i);
		}
		cards.push(row);
	}
}

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function shuffleArray(arr) {
	var cnt = arr.length;
	for (i=0; i<cnt; i++) {
		var idx1 = getRandomInt(0,cnt-1);
		var idx2 = getRandomInt(0,cnt-1);
		// swap
		var tmp = arr[idx1];
		arr[idx1] = arr[idx2];
		arr[idx2] = tmp;
	}
}

function getPickList() {
	var pickList = [];
	for (r=0; r<MAX_ROW; r++) {
		for (i=1; i<=MAX_NR; i++) {
			pickList.push(i);
		}
	}
	shuffleArray(pickList);

	return pickList;
}

function removeCard(cards, card) {
	for (r=0; r<MAX_ROW; r++) {
		for (i=0; i<MAX_NR; i++) {
			if (cards[r][i] === card) {
				cards[r][i] = 0;
				return true;
			}
		}
	}
	console.log("can't remove card:" + card);
}


function getTempStorage() {
	var tmpStorage = [];
	for (i=0; i<MAX_STORAGE; i++) {
		tmpStorage.push( new StorageRow() );
	}
	return tmpStorage;
}

function getStorageToPlaceCard(card) {
}


function main() {
	var remainintCards = [];
	console.log("3 x 16");
	fillCards(remainintCards);
	console.log(remainintCards);
	var picList = getPickList();
	var tmpStorage = getTempStorage();
//	console.log(JSON.stringify(picList));

	var cnt = picList.length;
	for (var i=0; i<4; i++) {
		var card = picList.pop();
		removeCard(remainintCards, card);
		tmpStorage[3].push(card);

		console.log("-----------------------")
		console.log(card);
		console.log(remainintCards);
//		console.log(tmpStorage);

	}
}

main();



