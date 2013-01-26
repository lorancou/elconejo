var KEYCODE_LEFT = 37;
var KEYCODE_UP = 38;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;
var MOVE_SPEED = 256;

var wresler = function(stage) {

    this.x = 320;
    this.y = 240;

    this.lfHeld = false;
    this.rtHeld = false;
    this.upHeld = false;
    this.dwHeld = false;

    var ss = new createjs.SpriteSheet({
        "frames": {
            "width": 64,
            "height": 64
        },
        "animations": WRESLER_ANIMS,
        "images": ["./assets/wresler.png"]
    });

    this.bitmapAnimation = new createjs.BitmapAnimation(ss);
    this.bitmapAnimation.scaleY = this.bitmapAnimation.scaleX = 1;
    this.bitmapAnimation.x = this.x - 32;
    this.bitmapAnimation.y = this.y - 32;
    this.bitmapAnimation.gotoAndPlay("run");

    stage.addChild(this.bitmapAnimation);
                            
    return this;
};

wresler.prototype.update = function(dt) {

    if (this.lfHeld) {
        this.x -= MOVE_SPEED * dt / 1000;
    }
    if (this.rtHeld) {
        this.x += MOVE_SPEED * dt / 1000;
    }
    if (this.upHeld) {
        this.y -= MOVE_SPEED * dt / 1000;
    }
    if (this.dwHeld) {
        this.y += MOVE_SPEED * dt / 1000;
    }
    this.bitmapAnimation.x = this.x - 32;
    this.bitmapAnimation.y = this.y - 32;
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
