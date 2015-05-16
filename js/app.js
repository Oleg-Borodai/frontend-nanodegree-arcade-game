// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = -101;
  this.y = 60 + Math.floor(Math.random()*3) * 80;
  this.speed = Math.random() * 100 + 20;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += dt * this.speed;

  // Repositioning the enemy when he has left the screen
  if(this.x >= ctx.canvas.width + 101)
    this.constructor();

  // Identify collisions
  if((this.x >= player.x - 90) && (this.x <= (player.x + 90)) &&
  (this.y == player.y)){
    player.constructor();
  }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.x = 2 * 101;
  this.y = 60 + 3 * 80;
  this.sprites = ["images/char-boy.png",
    "images/char-cat-girl.png",
    "images/char-horn-girl.png",
    "images/char-pink-girl.png",
    "images/char-princess-girl.png"]
  this.sprite = 0;
}

Player.prototype.render = function(dt){
  ctx.drawImage(Resources.get(this.sprites[this.sprite]), this.x, this.y);
};

Player.prototype.update = function(){
  // Identify Player reached water
  if(this.y < 60)
    this.constructor();
};

Player.prototype.handleInput = function(keycode) {
  var newx = this.x, newy = this.y;
  switch(keycode){
    case "left":
      newx = this.x - 101;
      break;
    case "up":
      newy = this.y - 80;
      break;
    case "right":
      newx = this.x + 101;
      break;
    case "down":
      newy = this.y + 80;
      break;
    case "char":
      if(this.sprite == this.sprites.length-1)
        this.sprite = 0;
      else
        this.sprite++;
    break;
  }
  if((newx <= ctx.canvas.width - 101) && newx >= 0)
    this.x = newx;
  if((newy <= ctx.canvas.height-171) && newy >= -20)
    this.y = newy;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    67: "char"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
