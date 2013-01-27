"use strict";

var SKULL_SIZE = 64; // 32*2

var Skull = function(x, y) {

    this.x = x;
    this.y = y;

    this.dir = DIR_DW;
    this.state = STATE_RUN;

    this.hp = SKULL_HP;

    this.hitBox = null;

    var ss = new createjs.SpriteSheet({
        "frames": {
            "width": SKULL_SIZE,
            "height": SKULL_SIZE
        },
        "animations": SKULL_ANIMS,
        "images": ["./assets/sprites/skull.png"]
    });

    this.sprite = new createjs.BitmapAnimation(ss);
    this.sprite.scaleY = this.sprite.scaleX = 1;
    this.sprite.x = this.x - SKULL_SIZE / 2;
    this.sprite.y = this.y - SKULL_SIZE / 2;
    this.sprite.gotoAndPlay("run_dw");
                            
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

    this.sprite.x = this.x - SKULL_SIZE / 2;
    this.sprite.y = this.y - SKULL_SIZE / 2;

    this.hitBox = new createjs.Rectangle(
        this.sprite.x + SKULL_HITBOX.x,
        this.sprite.y + SKULL_HITBOX.y,
        SKULL_HITBOX.width,
        SKULL_HITBOX.height
        );    
}

Skull.prototype.setState = function(state) {

    this.state = state;
    switch (state) {

    case STATE_RUN: {
        var newAnim = "run" + getDirSuffix(this.dir);
        this.sprite.gotoAndPlay(newAnim);
    } break;

    }
}

Skull.prototype.handlePunch = function(punchBox) {

    var punchStats = new FrameStats();

    if (rectIntersect(this.hitBox, punchBox)) {

        punchStats.hit = true;
        --this.hp;

        if (this.hp == 0) { // R.I.P.
            punchStats.hp += SKULL_HEAL;
            punchStats.score += SKULL_VALUE;
        }
    }

    return punchStats;
}

Skull.prototype.draw = function(stage) {

    stage.addChild(this.sprite);
}

Skull.prototype.debugDraw = function(g, stage) {

    g.setStrokeStyle(1);
    g.beginStroke(createjs.Graphics.getRGB(0,255,0));
    g.drawRect(
        this.hitBox.x,
        this.hitBox.y,
        this.hitBox.width,
        this.hitBox.width
        );
    var s = new createjs.Shape(g);
    stage.addChild(s);
}