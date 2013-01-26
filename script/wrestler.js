"use strict";

var KEYCODE_LF = 37;
var KEYCODE_UP = 38;
var KEYCODE_RT = 39;
var KEYCODE_DW = 40;
var KEYCODE_PUNCH_1 = 87;
var KEYCODE_PUNCH_2 = 90;

var WRESTLER_SIZE = 96; // 48*2

var Wrestler = function() {

    this.dwHeld = false;
    this.lfHeld = false;
    this.rtHeld = false;
    this.upHeld = false;

    this.dir = DIR_DW;
    this.state = STATE_RUN;

    this.punchBox = null;

    var ss = new createjs.SpriteSheet({
        "frames": {
            "width": WRESTLER_SIZE,
            "height": WRESTLER_SIZE
        },
        "animations": WRESTLER_ANIMS,
        "images": ["./assets/sprites/wrestler.png"]
    });

    this.sprite = new createjs.BitmapAnimation(ss);
    this.sprite.scaleY = this.sprite.scaleX = 1;
    this.sprite.x = 320;
    this.sprite.y = 240;
    this.sprite.width = WRESTLER_SIZE;
    this.sprite.height = WRESTLER_SIZE;
    this.sprite.gotoAndPlay("run_dw");

    return this;
};

Wrestler.prototype.update = function(dt, room) {

    var newX = this.sprite.x;
    var newY = this.sprite.y;

    switch (this.state) {

    case STATE_IDLE: {
        // don't move when idle
    } break;

    case STATE_RUN: {
        // move
        if (this.dwHeld) {
            newY = Math.round(this.sprite.y + WRESTLER_MOVE_SPEED * dt / 1000);
        }
        if (this.lfHeld) {
            newX = Math.round(this.sprite.x - WRESTLER_MOVE_SPEED * dt / 1000);
        }
        if (this.rtHeld) {
            newX = Math.round(this.sprite.x + WRESTLER_MOVE_SPEED * dt / 1000);
        }
        if (this.upHeld) {
            newY = Math.round(this.sprite.y - WRESTLER_MOVE_SPEED * dt / 1000);
        }

    } break;

    case STATE_PUNCH: {

        if (this.sprite.currentAnimationFrame < 3) {

            // detect hits
            this.punchBox = new createjs.Rectangle(
                this.sprite.x + WRESTLER_PUNCHBOX[this.dir].x,
                this.sprite.y + WRESTLER_PUNCHBOX[this.dir].y,
                WRESTLER_PUNCHBOX[this.dir].width,
                WRESTLER_PUNCHBOX[this.dir].height
                );

        } else {

            this.punchBox = null;

            // back to run when done punching
            this.setState(STATE_RUN);

        }
    } break;

    }

    this.hitBox = new createjs.Rectangle(
        newX + WRESTLER_HITBOX.x,
        newY + WRESTLER_HITBOX.y,
        WRESTLER_HITBOX.width,
        WRESTLER_HITBOX.height
        );

    var topLeft = getTopLeft(this.hitBox);
    var botLeft = getBotLeft(this.hitBox);
    var topRight = getTopRight(this.hitBox);
    var botRight = getBotRight(this.hitBox);

    var wallTopLeft = room.getWallAt(topLeft);
    var wallBotLeft = room.getWallAt(botLeft);
    var wallTopRight = room.getWallAt(topRight);
    var wallBotRight = room.getWallAt(botRight);

    if (newX < this.sprite.x) {
        if (wallTopLeft) {
            wallTopLeft.touched = true;
            this.hitBox.x = getRight(wallTopLeft);
        } else if (wallBotLeft) {
            wallBotLeft.touched = true;
            this.hitBox.x = getRight(wallBotLeft);
        }
    } else if (newX > this.sprite.x) {
        if (wallTopRight) {
            wallTopRight.touched = true;
            this.hitBox.x = getLeft(wallTopRight) - ROOM_TILE_SIZE - 1; // hack
        } else if (wallBotRight) {
            wallBotRight.touched = true;
            this.hitBox.x = getLeft(wallBotRight) - ROOM_TILE_SIZE - 1; // hack
        }
    }

    if (newY < this.sprite.y) {
        if (wallTopLeft) {
            wallTopLeft.touched = true;
            this.hitBox.y = getBottom(wallTopLeft);
        } else if (wallTopRight) {
            wallTopRight.touched = true;
            this.hitBox.y = getBottom(wallTopRight);
        }
    } else if (newY > this.sprite.y) {
        if (wallBotLeft) {
            wallBotLeft.touched = true;
            this.hitBox.y = getTop(wallBotLeft) - ROOM_TILE_SIZE - 1; // hack
        } else if (wallBotRight) {
            wallBotRight.touched = true;
            this.hitBox.y = getTop(wallBotRight) - ROOM_TILE_SIZE - 1; // hack
        }
    }

    this.sprite.x = this.hitBox.x - WRESTLER_HITBOX.x;
    this.sprite.y = this.hitBox.y - WRESTLER_HITBOX.y;
}

Wrestler.prototype.draw = function(stage) {

    stage.addChild(this.sprite);
}

Wrestler.prototype.debugDraw = function(g, stage) {

    g.setStrokeStyle(1);

    if (this.punchBox) {
        g.beginStroke(createjs.Graphics.getRGB(255,0,0));
        g.drawRect(
            this.punchBox.x,
            this.punchBox.y,
            this.punchBox.width,
            this.punchBox.height
            );
    }

    g.beginStroke(createjs.Graphics.getRGB(0,255,0));
    g.drawRect(
        this.hitBox.x,
        this.hitBox.y,
        this.hitBox.width,
        this.hitBox.height
        );

    var s = new createjs.Shape(g);
    stage.addChild(s);        
}

Wrestler.prototype.handleKeyDown = function(e) {

    var newDir = null;

    switch(e.keyCode) {
        case KEYCODE_DW: this.dwHeld = true; newDir = DIR_DW; break;
        case KEYCODE_LF: this.lfHeld = true; newDir = DIR_LF; break;
        case KEYCODE_RT: this.rtHeld = true; newDir = DIR_RT; break;
        case KEYCODE_UP: this.upHeld = true; newDir = DIR_UP; break;
    }

    if (newDir != null && newDir != this.dir) {
        this.dir = newDir;
        if (this.state == STATE_RUN) {
            this.setState(STATE_RUN);
        }
        return false;
    }
    //console.log("Unhandled key: " + e.keyCode);
    return true;
}

Wrestler.prototype.handleKeyUp = function(e) {

    switch(e.keyCode) {
        case KEYCODE_LF: this.lfHeld = false; return false;
        case KEYCODE_RT: this.rtHeld = false; return false;
        case KEYCODE_UP: this.upHeld = false; return false;
        case KEYCODE_DW: this.dwHeld = false; return false;

        // punch
        case KEYCODE_PUNCH_1:
        case KEYCODE_PUNCH_2: this.setState(STATE_PUNCH); return false;
    }

    return true;
}

Wrestler.prototype.setState = function(state) {

    this.state = state;
    switch (state) {

    case STATE_RUN: {
        var newAnim = "run" + getDirSuffix(this.dir);
        this.sprite.gotoAndPlay(newAnim);
    } break;

    case STATE_PUNCH: {
        var newAnim = "punch" + getDirSuffix(this.dir);
        this.sprite.gotoAndPlay(newAnim);
    } break;

    }

}

Wrestler.prototype.changeRoom = function(dir) {

    switch (dir) {

    case DIR_DW: {
        this.sprite.y = 0;
    } break;

    case DIR_LF: {
        this.sprite.x = ROOM_WIDTH - WRESTLER_SIZE;
    } break;

    case DIR_RT: {
        this.sprite.x = 0;
    } break;

    case DIR_UP: {
        this.sprite.y = ROOM_HEIGHT - WRESTLER_SIZE;
    } break;

    }
}