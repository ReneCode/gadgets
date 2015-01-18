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
    lastTime: 0
  };
  this.move = {
    sumElapsedTime: 0,
    vector: {x:0, y:0}
  };

  this.lastAnimationTime = (new Date()).getTime();
};

Item.prototype.startMove = function(targetX, targetY) {
  var dx = targetX - this.x;
  var dy = targetY - this.y;
  var len = Math.sqrt(dx*dx + dy*dy);
  this.move.vector.x = dx / len;
  this.move.vector.y = dy / len;
};

Item.prototype.updateMove = function(elapsedTime, canvas) {
  this.move.sumElapsedTime += elapsedTime;

  var linearSpeed = 30;
  
  linearSpeed = (linearSpeed * this.move.sumElapsedTime) / 1000;
  // pixels / second
  var newX = linearSpeed * this.move.vector.x;
  var newY = linearSpeed * this.move.vector.y;

  if (newX < canvas.width  &&  newY < canvas.height) {
    this.x = newX;
    this.y = newY;
  }

  return true;
  
  var newX = Math.round(linearSpeed * this.move.sumElapsedTime / 1000);
//  var newX = linearSpeed * this.move.sumElapsedTime / 1000;
  if (this.x == newX) {
    return false;
  }

  if(newX < canvas.width - this.width - this.borderWidth / 2) {
    this.x = newX;
    return true;
  }
  else {
    return false;
  }
  
};



Item.prototype.updateFlash = function(elapsedTime) {
  var interval = 1000;

  this.flash.lastTime += elapsedTime;
  if (this.flash.lastTime < interval) {
    return false;
  }
  this.flash.lastTime -= interval;
  if (this.fillColor == 'blue') {
    this.fillColor = 'red';
  }
  else {
    this.fillColor = 'blue';
  }
  return true;
};


Item.prototype.getElapsedTime = function() {

  var currentTime = (new Date()).getTime();
  var elapsedTime = currentTime - this.lastAnimationTime;
  this.lastAnimationTime = currentTime;
  return elapsedTime;
};

Item.prototype.updateAnimation = function(startTime, canvas) {
  
  var elapsedTime = this.getElapsedTime();

  var bMove = this.updateMove(elapsedTime, canvas);
  var bFlash = this.updateFlash(elapsedTime);
  // return true, if anything is changed
  return bMove || bFlash;
}



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
myRectangle.startMove(300, 300);

function animate(myRectangle, canvas, context, startTime) {
  if (myRectangle.updateAnimation(startTime, canvas)) {
    // redraw
    // clear
    context.clearRect(0, 0, canvas.width, canvas.height);
    myRectangle.draw(context);

  }

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


