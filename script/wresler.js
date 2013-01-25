var KEYCODE_LEFT = 37;
var KEYCODE_UP = 38;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;

var wresler = function(stage) {

    this.x = 320;
    this.y = 240;

    this.lfHeld = false;
    this.rtHeld = false;
    this.upHeld = false;
    this.dwHeld = false;

    var ss = new createjs.SpriteSheet({
        "frames": {
            "width": 32,
            "height": 32
        },
        "animations": {
            "run": [0, 1]
        },
        "images": ["./assets/wresler.png"]
    });

    this.bitmapAnimation = new createjs.BitmapAnimation(ss);
    this.bitmapAnimation.scaleY = this.bitmapAnimation.scaleX = 1;
    this.bitmapAnimation.x = 320;
    this.bitmapAnimation.y = 240;
    this.bitmapAnimation.gotoAndPlay("run");

    stage.addChild(this.bitmapAnimation);
                            
    return this;
};

wresler.prototype.update = function(dt) {

    var move = WRESLER_MOVE_SPEED * dt / 1000;
    if (this.lfHeld) {
        this.bitmapAnimation.x -= move;
    }
    if (this.rtHeld) {
        this.bitmapAnimation.x += move;
    }
    if (this.upHeld) {
        this.bitmapAnimation.y -= move;
    }
    if (this.dwHeld) {
        this.bitmapAnimation.y += move;
    }
}

wresler.prototype.handleKeyDown = function(e) {

    switch(e.keyCode) {
        case KEYCODE_LEFT:  this.lfHeld = true; return false;
        case KEYCODE_RIGHT: this.rtHeld = true; return false;
        case KEYCODE_UP:    this.upHeld = true; return false;
        case KEYCODE_DOWN:  this.dwHeld = true; return false;
    }

    return true;
}

wresler.prototype.handleKeyUp = function(e) {

    switch(e.keyCode) {
        case KEYCODE_LEFT:  this.lfHeld = false; return false;
        case KEYCODE_RIGHT: this.rtHeld = false; return false;
        case KEYCODE_UP:    this.upHeld = false; return false;
        case KEYCODE_DOWN:  this.dwHeld = false; return false;
    }

    return true;
}
