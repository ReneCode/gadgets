
var MAX_ROW = 3;
var MAX_NR = 16;
var MAX_STORAGE = 5;

var NO_CARD = -1;
var NO_DIFF = -1;



function StorageRow() {
	this.cards = [];

	this.toString = function() {
		console.log(JSON.stringify(this.cards));
	}
	this.length = function() {
		return this.cards.length;
	}
	this.push = function(card) {
		this.cards.push(card);
	} 
	this.pop = function() {
		this.cards.pop();
	}
	this.top = function() {
		cnt = this.length();
		if (cnt > 0) {
			return this.cards[cnt-1];
		}
		else {
			return NO_CARD;
		}
	}

	this.diff = function(card) {
		if (this.top() == NO_CARD) {
			return NO_DIFF;
		}
		else {
			return this.top() - card;
		}
	}

	this.empty = function() {
		return this.cards.length == 0;
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
	for (i=0; i< 7*cnt; i++) {
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


function getStorageIndexNoCard(tmpStorage) {
	var freeIdx = -1;
	for (var i=0; i<MAX_STORAGE; i++) {
		if (tmpStorage[i].empty()) {
			if (freeIdx < 0) {
				freeIdx = i;
			}
		}
	}
	return freeIdx;
}


function getStorageIndexMinDiff(tmpStorage, card) {
	var idx = -1;
	var minDiff = 999;
	for (var i=0; i<MAX_STORAGE; i++) {
		var diff = tmpStorage[i].diff(card);
		if (diff > 0  &&  diff < minDiff) {
			idx = i;
			minDiff = diff;
		}
	}
	return idx;
}

function getStorageIndexSameCard(tmpStorage, card) {
	var idx = -1;
	for (var i=0; i<MAX_STORAGE; i++) {
		var top = tmpStorage[i].top();
		if (top === card  &&  idx < 0) {
			idx = i;
		}
	}
	return idx;
}

function getStorageToPlaceCard(tmpStorage, card) {
	// try first: min diff to last card
	var minDiffIdx = getStorageIndexMinDiff(tmpStorage, card)
	if (minDiffIdx >= 0) {
		return minDiffIdx;
	}
	var sameCardIndex = getStorageIndexSameCard(tmpStorage, card);
	if (sameCardIndex >= 0) {
		return sameCardIndex;
	}
	var noCardIdx = getStorageIndexNoCard(tmpStorage);
	if (noCardIdx >= 0) {
		return noCardIdx;
	} 
	console.log("no fitting storage");
	return 0;
}

function outTmpStorage(tmpStorage) {
	for (var i=0; i<MAX_STORAGE; i++) {
		console.log(i+1 + " = " + tmpStorage[i].cards);
	}
}


function emptyDestinationCards(destinationCards) {
	for (r=0; r<=MAX_ROW; r++) {
		destinationCards.push([]);
	}	
}




function clearupCardsFromStorage(tmpStorage, destinationCards) {
	do {
		var cardMoved = false;
		for (r=0; r<MAX_ROW; r++) {
			var searchCard = 1;
			var len = destinationCards[r].length;
			if (len > 0) {
				searchCard = 1 + destinationCards[r][len-1];
			}
			var idx = getStorageIndexSameCard(tmpStorage, searchCard);
	 		if (idx >= 0) {
	 			tmpStorage[idx].pop();
	 			destinationCards[r].push(searchCard);
	 			cardMoved = true;
	 		}
		}
	} while (cardMoved);
}

function main() {
	var remainingCards = [];
	var destinationCards = [];

	emptyDestinationCards(destinationCards);
	console.log("3 x 16");
	fillCards(remainingCards);
	var picList = getPickList();
//	var saveList = picList.copy;
	var tmpStorage = getTempStorage();

	var cnt = picList.length;

	for (var i=0; i<cnt; i++) {
		var card = picList.pop();
		removeCard(remainingCards, card);


		var idx = getStorageToPlaceCard(tmpStorage, card);

		tmpStorage[idx].push(card);

		clearupCardsFromStorage(tmpStorage, destinationCards);

		console.log("----------------------- set:" + card + " to:" + idx);
		console.log(remainingCards);
		outTmpStorage(tmpStorage);

		console.log(destinationCards);
//		console.log(tmpStorage);

	}
//	console.log(saveList);
}

main();



