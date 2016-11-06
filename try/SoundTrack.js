"use strict"

function SoundTrack() {
	this.ok = false;
}

SoundTrack.prototype.start = function() {
	
	this.ok = true;
	return "AB"
};

module.exports = SoundTrack;