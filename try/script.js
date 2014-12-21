

var setText = function(text) {
	var label = document.getElementById("label");
	label.innerHTML = text;
    console.log(text);

}

var canvas = document.getElementById("cvp");
var options = {};
var hammer = new Hammer(canvas, options);
hammer.get('press').set({time:1});
hammer.get('pan').set({threshold:1});

hammer.on('press', function(ev) {
    setText('press');
});

hammer.on('pressup', function(ev) {
    setText('pressup');
});



hammer.on('pan', function(ev) {
    setText('pan'); // + ev.pointers[0].x + " - " + ev.pointers[1].y);
});
hammer.on('panstart', function(ev) {
    setText('panstart');
});

hammer.on('panmove', function(ev) {
    setText('panmove');
    var mp = ev.pointers[0]; 
    console.log(mp.x + " - " + mp.y);
});
hammer.on('pancancel', function(ev) {
    setText('pancancel');
});
hammer.on('panup', function(ev) {
    setText('panup');
});