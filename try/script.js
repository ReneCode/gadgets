

var setText = function(text) {
	var label = document.getElementById("label");
	label.innerHTML = text;
 //   console.log(text);

}

var myElement = document.getElementById('cvp');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
mc.get('press').set({ time: 1 });

// listen to events...
mc.on("tap press pressup panmove", function(ev) {
    setText( ev.type + " " + ev.pointers[0].clientX + " / " + ev.pointers[0].clientY);
});