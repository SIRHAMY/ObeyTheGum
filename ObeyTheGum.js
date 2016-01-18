"use strict";

//**P5-built Function Code**

//Images
var obeyFace
var logo;

//Sketch vars
var fr = 30;
var timeAllot = 4;

//Sketch state
var duration;
var counter;

//Bubble vars
var gumType;
var bubblePt1;
var bubblePt2;

function preload() {
  obeyFace = loadImage("images/ObeyFace2.png");
  logo = loadImage("images/LogoFat.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(windowWidth, windowHeight, WEBGL);
  
  //Sketch
  gumType = 0;
  duration = timeAllot * fr;
  counter = 1;
  stroke("#000000");
  
  //P5
  frameRate(fr);
  
  //Bubble
  bubblePt1 = new Pt(windowWidth/2, windowHeight/2);
}

class Pt{
  constructor(xVal, yVal) {
    this.x = xVal;
    this.y = yVal;
  }
};

function draw() {
  
  background("#000000");
  image(obeyFace, (windowWidth/2) - (((windowHeight/obeyFace.height) * obeyFace.width)/2), 0, (windowHeight/obeyFace.height) * obeyFace.width, windowHeight);
  
  stroke("#000000");
  fill('#ff8491');
  
  if(gumType == 0) {
    drawBubble(counter, duration);

    if(counter == duration) {
      gumType = 1;
      counter = 1;
    }
    
    /*
    else if(counter > duration) {
      //popBubble();
      drawTeardrop(windowWidth/2, 3 * windowHeight/16, windowHeight/8, 270);
      drawTeardrop(windowWidth/2, 13 * windowHeight/16, windowHeight/8, 90);
    }
    */
  } else if(gumType == 1) {
    drawSpiral(counter, duration);
    
    if(counter == 3 * duration) {
      gumType = 0;
      counter = 1;
    }
  }
  
  counter++;
}

//This function is called whenever the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//**Bubble Code**

var logoBubble = function(counter, duration, bubbleSize) {
  var logoWidth = ( (3/4) * 1.5 * bubbleSize)
  var logoHeight = (logoWidth/logo.width) * logo.height;
  image(logo, windowWidth/2 - logoWidth/2, windowHeight/2 - logoHeight/2, logoWidth, logoHeight);
  /*var logoShape = beginShape();
  texture(logo);
  vertex(windowWidth/2 - logoWidth/2, windowHeight/2 - logoHeight/2);
  vertex(windowWidth/2 + logoWidth/2, windowHeight/2 - logoHeight/2);
  vertex(windowWidth/2 + logoWidth/2, windowHeight/2 + logoHeight/2);
  vertex(windowWidth/2 - logoWidth/2, windowHeight/2 + logoHeight/2);
  endShape(CLOSE);
  */
  
}

/** drawBubble
 * Main code to create the bubble
 **/
var drawBubble = function(counter, duration) {
  var maxSize = windowHeight/2;
  var bubbleSize = maxSize * Math.pow((counter/duration), .6);
  
  //drawShine(bubbleSize);
  
  ellipse(windowWidth/2, windowHeight/2, 1.5*bubbleSize, bubbleSize);
  
  logoBubble(counter, duration, bubbleSize);
}

/* drawTeardrop
xVal - x coordinate to draw tearDrop point
yVal - y coordinate to draw tearDrop point
height - Desired length of teardrop from point to end of bulb
orientation - Initial orientation is to the right with point to the left (at origin). Orientation
refers to angle of rotation from point. Moves clockwise.
-Bottom of teardrop is 30 deg
*/
var drawTeardrop = function(xVal, yVal, height, orientation) {
  console.log("drawTeardrop");
  
  var lDeg = orientation + 15;
  lDeg = lDeg % 360;
  
  var rDeg = orientation - 15;
  if(rDeg < 0) rDeg *= -1;
  rDeg % 360;
  
  var angle = radians(orientation);
  var lCtrlAngle = radians(lDeg);
  var rCtrlAngle = radians(rDeg);
  
  var bulbX = xVal + cos(angle) * height;
  var bulbY = yVal + sin(angle) * height;
  
  var lCtrlX = xVal + cos(lCtrlAngle) * ( (3/4) * height );
  var lCtrlY = yVal + sin(lCtrlAngle) * ( (3/4) * height );
  
  var rCtrlX = xVal + cos(rCtrlAngle) * ( (3/4) * height );
  var rCtrlY = yVal + sin(rCtrlAngle) * ( (3/4) * height );
  
  beginShape();
  vertex(xVal, yVal)
  bezierVertex(lCtrlX, lCtrlY, bulbX, bulbY, rCtrlX, rCtrlY);
  vertex(xVal, yVal);
  endShape();
}

var drawShine = new function(bubbleSize) {
  /*
  fill('#FFFFFF');
  beginShape();
  vertex(windowWidth/2, windowHeight/2);
  bezierVertex(windowWidth/2 - ( (3/4) * 1.5 * bubbleSize ) , windowHeight/2, , , windowWidth/2, windowHeight/2 - ( (3/4) * bubbleSize ));
  endShape();
  */
}

var popBubble = function() {
  console.log("pop bubble");
  fill('#FFFFFF');
  
  var originX = windowWidth/2;
  var originY = windowHeight/2;
  var xOffset = 3 * windowWidth/4;
  var yOffset = 3 * windowHeight/4;
  var teardropHeight = windowHeight/8;
  
  //Top, right, bot, left
  drawTeardrop(originX, originY + yOffset, teardropHeight, 270);
  //drawTeardrop(originX + xOffset, originY, teardropHeight);
  drawTeardrop(originX, originY - yOffset, teardropHeight, 90);
  //drawTeardrop(originX - xOffset, originY, teardropHeight);
}

//**Spiral Code**

var drawSpiral = function(counter, duration) {
  var maxCirRadius = logo.height;
  
  var radius = 0;
  var radiusInc = maxCirRadius / duration;
  
  var theta = 0.0;
  var thetaInc = (3.84 * PI ) / duration;
  
  for(var i = 0; i<counter; i++) {
    var x = cos(theta) * radius + windowWidth/2;
    var y = sin(theta) * radius + windowHeight/2;
    ellipse(x, y, 50, 50);
    theta += thetaInc;
    radius += radiusInc;
  }
}

//**Despiral Code**

//**Helper Code**

/*
pt1 - Origin point
pt2 - destination point
counter - Progress to destination
duration - Total amount of time for travel
Returns interpolated point
*/
var interpolateOnLine = function(pt1, pt2, counter, duration) {
  var xChange = pt2.x - pt1.x;
  xChange = xChange * (counter/duration);
  
  var yChange = pt2.y - pt1.y;
  yChange = yChange * (counter/duration);
  
  var result = new Pt(pt1.x + xChange, pt1.y + yChange);
  
  return result;
}
