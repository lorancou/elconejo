"use strict";

var HUD_WIDTH = 640;
var HUD_HEIGHT = 96;
var HUD_Y = ROOM_HEIGHT;

var HUD = function() {

    this.bitmap = new createjs.Bitmap(imagePool["hud"]);
    this.bitmap.y = HUD_Y;

	this.beatText = new createjs.Text("-", "24px m04_fatal_furyregular", "#000000");
	this.beatText.maxWidth = HUD_WIDTH;
	this.beatText.textAlign = "center";
	this.beatText.x = 50;
	this.beatText.y = HUD_Y + HUD_HEIGHT / 2 - 30;

    this.beatSheet = new createjs.SpriteSheet({
        "frames": {
            "width": 96,
            "height": 96
        },
        "animations": HEART_ANIMS,
        "images": [imagePool["heart"]]
    });

    this.beatSprite = new createjs.BitmapAnimation(this.beatSheet);
    this.beatSprite.scaleY = this.beatSprite.scaleX = 1;
    this.beatSprite.x = 30;
    this.beatSprite.y = 465;
    this.beatSprite.gotoAndPlay("delay");

	this.hpText = new createjs.Text("-", "24px m04_fatal_furyregular", "#FFFFFF");
	this.hpText.maxWidth = HUD_WIDTH;
	this.hpText.textAlign = "right";
	this.hpText.x = 170;
	this.hpText.y = HUD_Y + HUD_HEIGHT / 2 - 30;

	this.scoreText = new createjs.Text("-", "24px m04_fatal_furyregular", "#FFFFFF");
	this.scoreText.maxWidth = HUD_WIDTH;
	this.scoreText.textAlign = "center";
	this.scoreText.x = 320;
	this.scoreText.y = HUD_Y + HUD_HEIGHT / 2 - 10;

	this.multiplierText = new createjs.Text("-", "24px m04_fatal_furyregular", "#FFFFFF");
	this.multiplierText.maxWidth = HUD_WIDTH;
	this.multiplierText.textAlign = "right";
	this.multiplierText.x = 580;
	this.multiplierText.y = HUD_Y + HUD_HEIGHT / 2 - 30;

    return this;
};

HUD.prototype.update = function(dt, heart, score, multiplier) {

	//this.beatText.text = heart.beat ? "BEAT" : "-";

	if (heart.beat) {
		if (this.beatSprite.currentAnimation != "beat") {
		    this.beatSprite.gotoAndPlay("beat");

		    // SFX
			createjs.SoundJS.play("heartbeat" + heart.level);
		}
	} else {
		this.beatSprite.gotoAndPlay("delay");
	}

	this.hpText.text = heart.hp;

	this.scoreText.text = score;

	this.multiplierText.text = "x" + multiplier;
}

HUD.prototype.draw = function(stage) {

    stage.addChild(this.bitmap);
    //stage.addChild(this.beatText);	
    stage.addChild(this.beatSprite);	
    stage.addChild(this.hpText);	
    stage.addChild(this.scoreText);	
    stage.addChild(this.multiplierText);	
}

HUD.prototype.debugDraw = function(g, stage) {

}
