window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || 
      window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame || 
      window.oRequestAnimationFrame || 
      window.msRequestAnimationFrame ||
      function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();




var Item = function() {
  this.x = 0;
  this.y = 100;
  this.width = 40;
  this.height = 40;
  this.borderWidth = 8;
  this.fillColor = "white";
  this.borderColor = "black";
  this.flash = {
    pattern: "100",
    current: 0
  };
};


Item.prototype.updateMove = function(startTime, canvas) {
  // update
  var time = (new Date()).getTime() - startTime;

  var linearSpeed = 40;
  // pixels / second
  var newX = linearSpeed * time / 1000;

  console.log("NewX: " + newX);

  if(newX < canvas.width - this.width - this.borderWidth / 2) {
    this.x = newX;
  }
};

Item.prototype.updateFlash = function() {
  if (this.fillColor == 'blue') {
    this.fillColor = 'red';
  }
  else {
    this.fillColor = 'blue';
  }
};

Item.prototype.draw = function(context) {
  context.beginPath();
  context.rect(this.x, this.y, this.width, this.height);
  context.fillStyle = this.fillColor;
  context.fill();
  context.lineWidth = this.borderWidth;
  context.strokeStyle = this.borderColor;
  context.stroke();
}


var myRectangle = new Item();

function animate(myRectangle, canvas, context, startTime) {


  /*
  // update
  var time = (new Date()).getTime() - startTime;

  var linearSpeed = 40;
  // pixels / second
  var newX = linearSpeed * time / 1000;

  console.log("NewX: " + newX);

  if(newX < canvas.width - myRectangle.width - myRectangle.borderWidth / 2) {
    myRectangle.x = newX;
  }
  else
  {
    return;
  }
*/

  myRectangle.updateMove(startTime, canvas);

  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);


  myRectangle.draw(context);

  // request new frame
  requestAnimFrame(function() {
    animate(myRectangle, canvas, context, startTime);
  });
}


var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

//drawRectangle(myRectangle, context);

// wait one second before starting animation
setTimeout(function() {
  var startTime = (new Date()).getTime();
  animate(myRectangle, canvas, context, startTime);
}, 1000);


var flashInterval = setInterval( function() {
  myRectangle.updateFlash();
/*
  if (myRectangle.fillColor == 'blue') {
    myRectangle.fillColor = 'red';
  }
  else {
    myRectangle.fillColor = 'blue';
  }
  
  var newSize = myRectangle.width+3;
  if (newSize > 70) {
    newSize = 40;
  }
  myRectangle.height = newSize;
  myRectangle.width = newSize;
  */
}, 500);

