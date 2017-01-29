var mem = [];
var dx, dy;
var onBall = false;
var song;
p5.disableFriendlyErrors = true;
function preload(){
  song = loadSound("bum.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight-50);
  ball = new Ball();
  slider = createSlider(10,50,25);
  slider.input(loga);
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight-50);
}

function loga(){
	ball.changeRad(slider.value());
}

function mousePressed(){
	if(dist(ball.x,ball.y,mouseX,mouseY)<=ball.radius)
	{
		onBall=true;
		dx = mouseX - ball.x; 
		dy = mouseY - ball.y;
	}
}

function pressed(){
	ball.move(mouseX - dx, mouseY - dy);
  if(mem.length > 5) mem.splice(0,1);
  mem.push([mouseX - dx, mouseY - dy]);
}

function mouseReleased(){
	if(mem.length)	ball.setdifference(mem[mem.length-1][0] - mem[0][0], mem[mem.length-1][1] - mem[0][1]);
  onBall = false;
  mem = [];
}

function draw() {
  background(100);
  if(onBall) 
  	pressed();
  else
  	ball.update();
  ball.display();
}