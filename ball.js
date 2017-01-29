function Ball() {
  this.x = 250;
  this.y = 250;
  this.dx = 0;
  this.dy = 0;
  this.radius = 30;

  this.update = function() {
    if (this.y + this.dy + this.radius > height || this.y + this.dy - this.radius < 0) {
      this.dy > 0 ? this.dy -= 0.1 : this.dy += 0.1;
      this.dy *= -1;
      song.setVolume(map(abs(this.dy), 0, 50, 0, 1));
      this.bum();
    } //if it goes off the screen

    if (this.x + this.dx + this.radius > width || this.x + this.dx - this.radius < 0) {
      this.dx *= -1;
      this.dx > 0 ? this.dx -= 0.1 : this.dx += 0.1;
      song.setVolume(map(abs(this.dx), 0, 50, 0, 1));
      this.bum();
    } //if it goes off the screen

    this.dy > 0 ? this.dy *= 0.98 : this.dy *= 0.98; //air resistance
    this.dx > 0 ? this.dx *= 0.98 : this.dx *= 0.98; //air resistance
    if (this.y + this.radius >= height && abs(this.dy) <= 0.2)
      this.dy = 0; //for not slightly jumping
    else
      this.dy += 1; //gravity 
    if (this.dx >= -0.2 && this.dx <= 0.2) this.dx = 0; //for not moving slow
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.radius > width) this.x = width - this.radius;
    if (this.x - this.radius < 0) this.x = this.radius;
    if (this.y + this.radius > height) this.y = height - this.radius;
    if (this.y - this.radius < 0) this.y = this.radius;
  };

  this.move = function(x, y) {
    if (x + this.radius > width) x = width - this.radius;
    if (x - this.radius < 0) x = this.radius;
    if (y + this.radius > height) y = height - this.radius;
    if (y - this.radius < 0) y = this.radius;
    this.x = x;
    this.y = y;
  };

  this.bum = function() {
    song.pan(map(this.x, 0, width, -1, 1));
    song.play();
    song.jump(0.07);
  }

  this.changeRad = function(rad) {
    this.radius = rad;
  }

  this.setdifference = function(dx, dy) {
    this.dx = 0.2 * dx;
    this.dy = 0.2 * dy;
	  
    this.dx = constrain(this.dx, -50, 50);
    this.dy = constrain(this.dy, -50, 50);
  }

  this.display = function() {
    fill(200, 0, 0);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2)
  };
}