// Enemies our player must avoid
var Enemy = function(x, y, z) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = z;

    this.width = 505;
    this.height = 606;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < this.width) {
        this.x += this.speed * dt;
        allEnemies.forEach(function(enemy) {
            if (player.y === enemy.y && player.x > (enemy.x - 80) && player.x < (enemy.x + 90)) {
                player.x = playerInitX;
                player.y = playerInitY;

            };
        });
    } else {
        this.x = -distX;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player
var Player = function(x, y) {
    this.sprite = 'images/char-horn-girl.png'; // load player image
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
    if (player.y === water) {
        window.alert('Success!');
        player.x = playerInitX;
        player.y = playerInitY;
    };
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key === 'left' && player.x > 0) {
        player.x -= distX;
    } else {
        if (key === 'right' && player.x < distLastX) {
            player.x += distX;
        } else {
            if (key === 'up' && player.y > 0) {
                player.y -= distY;
            } else {
                if (key === 'down' && player.y < grassL2) {
                    player.y += distX;
                };
            };
        };
    };
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6'];

var distX = 101,
    distLastX = 404;
var distY = 80;
var water = -20;

var stoneL1 = 60,
    stoneL2 = 140,
    stoneL3 = 220,
    grassL1 = 300,
    grassL2 = 380;


var enemy1 = new Enemy(0, stoneL1, 100);
allEnemies[0] = enemy1;

var enemy2 = new Enemy(-101, stoneL2, 450);
allEnemies[1] = enemy2;

var enemy3 = new Enemy(-808, stoneL3, 200);
allEnemies[2] = enemy3;

var enemy4 = new Enemy(-505, stoneL1, 350);
allEnemies[3] = enemy4;

var enemy5 = new Enemy(-606, stoneL2, 300);
allEnemies[4] = enemy5;

var enemy6 = new Enemy(-303, stoneL3, 250);
allEnemies[5] = enemy6;

var playerInitX = 2 * distX;
var playerInitY = grassL2;
var player = new Player(playerInitX, playerInitY);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
