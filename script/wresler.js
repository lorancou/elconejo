"use strict";

var KEYCODE_LF = 37;
var KEYCODE_UP = 38;
var KEYCODE_RT = 39;
var KEYCODE_DW = 40;
var KEYCODE_PUNCH_1 = 87;
var KEYCODE_PUNCH_2 = 90;

var WRESLER_SIZE = 96; // 48*2

var Wresler = function() {

    this.x = 320;
    this.y = 240;

    this.dwHeld = false;
    this.lfHeld = false;
    this.rtHeld = false;
    this.upHeld = false;

    this.dir = DIR_DW;
    this.state = STATE_RUN;

    this.punchbox = null;

    var ss = new createjs.SpriteSheet({
        "frames": {
            "width": WRESLER_SIZE,
            "height": WRESLER_SIZE
        },
        "animations": WRESLER_ANIMS,
        "images": ["./assets/sprites/wresler.png"]
    });

    this.anim = new createjs.BitmapAnimation(ss);
    this.anim.scaleY = this.anim.scaleX = 1;
    this.anim.x = this.x - WRESLER_SIZE / 2;
    this.anim.y = this.y - WRESLER_SIZE / 2;
    this.anim.gotoAndPlay("run_dw");
                            
    return this;
};

Wresler.prototype.update = function(dt) {

    switch (this.state) {

    case STATE_IDLE: {
        // don't move when idle
    } break;

    case STATE_RUN: {
        // move
        if (this.dwHeld) {
            this.y += WRESLER_MOVE_SPEED * dt / 1000;
        }
        if (this.lfHeld) {
            this.x -= WRESLER_MOVE_SPEED * dt / 1000;
        }
        if (this.rtHeld) {
            this.x += WRESLER_MOVE_SPEED * dt / 1000;
        }
        if (this.upHeld) {
            this.y -= WRESLER_MOVE_SPEED * dt / 1000;
        }

    } break;

    case STATE_PUNCH: {

        if (this.anim.currentAnimationFrame < 3) {

            // detect hits
            this.punchbox = new createjs.Rectangle(
                this.anim.x + WRESLER_PUNCHBOX[this.dir].x,
                this.anim.y + WRESLER_PUNCHBOX[this.dir].y,
                WRESLER_PUNCHBOX[this.dir].width,
                WRESLER_PUNCHBOX[this.dir].height
                );

        } else {

            this.punchbox = null;

            // back to run when done punching
            this.setState(STATE_RUN);

        }
    } break;

    }

    this.anim.x = this.x - WRESLER_SIZE / 2;
    this.anim.y = this.y - WRESLER_SIZE / 2;
}

Wresler.prototype.handleKeyDown = function(e) {

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

Wresler.prototype.handleKeyUp = function(e) {

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

Wresler.prototype.setState = function(state) {

    this.state = state;
    switch (state) {

    case STATE_RUN: {
        var newAnim = "run" + getDirSuffix(this.dir);
        this.anim.gotoAndPlay(newAnim);
    } break;

    case STATE_PUNCH: {
        var newAnim = "punch" + getDirSuffix(this.dir);
        this.anim.gotoAndPlay(newAnim);
    } break;

    }

}
