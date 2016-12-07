'use strict';

// Game character
var Character = function(x, y, z, sprite) {
    'use strict';
    this.x = x;
    this.y = y;
    this.speed = z;
    this.sprite = sprite;
};
Character.prototype.update = function(dt) {
    'use strict';
    // Update the Character's position, required method for game
    // Parameter: dt, a time delta between ticks
    if (this.x < canvasWidth) {
        this.x += this.speed * dt;
    } else {
        this.x = -distX;
    };
};
Character.prototype.render = function() {
    'use strict';
    // Draw the Character on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Enemy is a subclass of Character
// Enemies our player must avoid

var Enemy = function(x, y, z) {
    'use strict';
    Character.call(this, x, y, z);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;



// Player is a subclass of Character
// handleInput() method is specific to this subclass

// Player:
var Player = function(x, y, z) {
    'use strict';
    Character.call(this, x, y, z);
    this.sprite = 'images/char-horn-girl.png';
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.handleInput = function(key) {
    'use strict';
    if (key === 'left' && this.x > 0) {
        this.x -= distX;
    } else {
        if (key === 'right' && this.x < distLastX) {
            this.x += distX;
        } else {
            if (key === 'up' && this.y > 0) {
                this.y -= distY;
            } else {
                if (key === 'down' && this.y < grassL2) {
                    this.y += distX;
                };
            };
        };
    };
};


// Constants:
var canvasWidth = 505,  // game board width
    canvasHeight = 606; // game board height
var distX = 101,        // column width
    distLastX = 404;    // x-coordinate of Player on the last column
var distY = 80;         // row height
var water = -20;    // y-coordinate on the water row

var stoneL1 = 60,   // y-coordinate of Character on first pavement row from the top
    stoneL2 = 140,  // y-coordinate on second pavement row from the top
    stoneL3 = 220,  // y-coordinate on third and last pavement row
    grassL1 = 300,  // y-coordinate of Player on first grass row from the top
    grassL2 = 380;  // y-coordinate on second and last grass row

// Instantiating objects
// All enemy objects are in an array called allEnemies:
var allEnemies = ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'enemy6'];

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

// The player object is in a variable called player:
var playerInitX = 2 * distX;
var playerInitY = grassL2;
var player = new Player(playerInitX, playerInitY, 0);


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
