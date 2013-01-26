"use strict";

var SKULL_SIZE = 32; // 16*2

var Skull = function(x, y) {

    this.x = x;
    this.y = y;

    this.dir = DIR_DW;
    this.state = STATE_RUN;

    var ss = new createjs.SpriteSheet({
        "frames": {
            "width": SKULL_SIZE,
            "height": SKULL_SIZE
        },
        "animations": SKULL_ANIMS,
        "images": ["./assets/sprites/skull.png"]
    });

    this.anim = new createjs.BitmapAnimation(ss);
    this.anim.scaleY = this.anim.scaleX = 1;
    this.anim.x = this.x - SKULL_SIZE / 2;
    this.anim.y = this.y - SKULL_SIZE / 2;
    this.anim.gotoAndPlay("run_dw");
                            
    return this;
};

Skull.prototype.update = function(dt) {

    switch (this.state) {

    case STATE_IDLE: {
        // don't move when idle
    } break;

    case STATE_RUN: {

    } break;

    }

    this.anim.x = this.x - SKULL_SIZE / 2;
    this.anim.y = this.y - SKULL_SIZE / 2;
}

Skull.prototype.setState = function(state) {

    this.state = state;
    switch (state) {

    case STATE_RUN: {
        var newAnim = "run" + getDirSuffix(this.dir);
        this.anim.gotoAndPlay(newAnim);
    } break;

    }

}
