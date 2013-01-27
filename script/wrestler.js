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
    this.punchHit = false;

    this.invincibilityTimer = 0.0;

    this.sheet = new createjs.SpriteSheet({
        "frames": {
            "width": WRESTLER_SIZE,
            "height": WRESTLER_SIZE
        },
        "animations": WRESTLER_ANIMS,
        "images": ["./assets/sprites/wrestler.png"]
    });

    this.sprite = new createjs.BitmapAnimation(this.sheet);
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

    var wrestlerResult = new InteractionResult();

    switch (this.state) {

    case STATE_IDLE: {

        // don't move when idle

        var anim = "idle" + getDirSuffix(this.dir);
        if (this.sprite.currentAnimation != anim && this.invincibilityTimer == 0.0) {
            this.sprite.gotoAndPlay(anim);
        }

    } break;

    case STATE_RUN: {

        var newDir = -1;

        // move
        var somethingHeld = false;
        if (this.dwHeld) {
            newY = Math.round(this.sprite.y + WRESTLER_MOVE_SPEED * dt / 1000);
            somethingHeld = true;
            newDir = DIR_DW;
        }
        if (this.lfHeld) {
            newX = Math.round(this.sprite.x - WRESTLER_MOVE_SPEED * dt / 1000);
            somethingHeld = true;
            newDir = DIR_LF;
        }
        if (this.rtHeld) {
            newX = Math.round(this.sprite.x + WRESTLER_MOVE_SPEED * dt / 1000);
            somethingHeld = true;
            newDir = DIR_RT;
        }
        if (this.upHeld) {
            newY = Math.round(this.sprite.y - WRESTLER_MOVE_SPEED * dt / 1000);
            somethingHeld = true;
            newDir = DIR_UP;
        }

        if (newDir != -1) {
            this.dir = newDir;
        }

        //if (newDir != -1 && newDir != this.dir) {
        //this.setState(STATE_RUN);
        //}

        var anim = "run" + getDirSuffix(this.dir);
        if (this.sprite.currentAnimation != anim && this.invincibilityTimer == 0.0) {
            this.sprite.gotoAndPlay(anim);
        }



        if (!somethingHeld && this.invincibilityTimer == 0.0) {
            this.setState(STATE_IDLE);
        }

    } break;

    case STATE_PUNCH: {

        var frameCount = this.sheet.getNumFrames(this.sprite.currentAnimation);
        if (this.sprite.currentAnimationFrame < frameCount-1) {

            // detect hits & damage
            if (this.punchHit) {
                this.punchBox = null;
            } else {
                this.punchBox = new createjs.Rectangle(
                    this.sprite.x + WRESTLER_PUNCHBOX[this.dir].x,
                    this.sprite.y + WRESTLER_PUNCHBOX[this.dir].y,
                    WRESTLER_PUNCHBOX[this.dir].width,
                    WRESTLER_PUNCHBOX[this.dir].height
                    );
            }

        } else {

            this.punchBox = null;

            if (!this.punchHit) {
                InteractionResult.miss = true;
            }
            this.punchHit = false; 

            // back to run when done punching
            this.setState(STATE_RUN);

        }
    } break;

    }

    if (this.invincibilityTimer > 0.0) {
        wrestlerResult = room.handleInteractions(this.punchBox, null, this.punchCount);
    } else {
        wrestlerResult = room.handleInteractions(this.punchBox, this.hitBox, this.punchCount);        
    }


    if (this.state == STATE_PUNCH && wrestlerResult.hit) {
        this.punchHit = true; // no miss
    }

    // invincibility
    if (wrestlerResult.hp < 0) {
        this.invincibilityTimer = WRESTLER_INVICIBILITY_DURATION;
        this.sprite.gotoAndPlay("take_damage");
    } else {
        this.invincibilityTimer = Math.max(0.0, this.invincibilityTimer - dt);
    }


    this.hitBox = new createjs.Rectangle(
        this.sprite.x + WRESTLER_HITBOX.x,
        this.sprite.y + WRESTLER_HITBOX.y,
        WRESTLER_HITBOX.width,
        WRESTLER_HITBOX.height
        );

    uberResolve(room, this.hitBox, newX - this.sprite.x, newY - this.sprite.y);

    this.sprite.x = this.hitBox.x - WRESTLER_HITBOX.x;
    this.sprite.y = this.hitBox.y - WRESTLER_HITBOX.y;

    room.wrestlerRoot.x = this.hitBox.x + this.hitBox.width / 2;
    room.wrestlerRoot.y = this.hitBox.y + this.hitBox.height / 2; 

    return wrestlerResult;
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

    var newDir = -1;

    switch(e.keyCode) {
        case KEYCODE_DW: this.dwHeld = true; newDir = DIR_DW; break;
        case KEYCODE_LF: this.lfHeld = true; newDir = DIR_LF; break;
        case KEYCODE_RT: this.rtHeld = true; newDir = DIR_RT; break;
        case KEYCODE_UP: this.upHeld = true; newDir = DIR_UP; break;
    }

    if (this.state == STATE_IDLE && newDir != -1) {

        this.dir = newDir;

        this.setState(STATE_RUN);
    }

    //console.log("Unhandled key: " + e.keyCode);
    return false;
}

Wrestler.prototype.handleKeyUp = function(e) {

    switch(e.keyCode) {
        case KEYCODE_LF: this.lfHeld = false; return false;
        case KEYCODE_RT: this.rtHeld = false; return false;
        case KEYCODE_UP: this.upHeld = false; return false;
        case KEYCODE_DW: this.dwHeld = false; return false;

        // punch
        case KEYCODE_PUNCH_1:
        case KEYCODE_PUNCH_2: {
            if (this.invincibilityTimer == 0.0 &&
                (this.state == STATE_RUN || this.state == STATE_IDLE)) {
                this.setState(STATE_PUNCH);
            }
        }
    }

    return false;
}

Wrestler.prototype.setState = function(state) {

    this.state = state;
    switch (state) {

    case STATE_IDLE: {
        var newAnim = "idle" + getDirSuffix(this.dir);
        this.sprite.gotoAndPlay(newAnim);
    } break;

    case STATE_RUN: {
        if (this.invincibilityTimer == 0.0) {
            var newAnim = "run" + getDirSuffix(this.dir);
            this.sprite.gotoAndPlay(newAnim);
        }
    } break;

    case STATE_PUNCH: {
        ++this.punchCount;
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