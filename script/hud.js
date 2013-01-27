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
	this.beatText.y = HUD_Y + HUD_HEIGHT / 2 - 20;

	this.hpText = new createjs.Text("-", "24px m04_fatal_furyregular", "#000000");
	this.hpText.maxWidth = HUD_WIDTH;
	this.hpText.textAlign = "center";
	this.hpText.x = 120;
	this.hpText.y = HUD_Y + HUD_HEIGHT / 2 - 20;

	this.scoreText = new createjs.Text("-", "24px m04_fatal_furyregular", "#000000");
	this.scoreText.maxWidth = HUD_WIDTH;
	this.scoreText.textAlign = "center";
	this.scoreText.x = 320;
	this.scoreText.y = HUD_Y + HUD_HEIGHT / 2 - 20;

	this.multiplierText = new createjs.Text("-", "24px m04_fatal_furyregular", "#000000");
	this.multiplierText.maxWidth = HUD_WIDTH;
	this.multiplierText.textAlign = "center";
	this.multiplierText.x = 590;
	this.multiplierText.y = HUD_Y + HUD_HEIGHT / 2 - 20;

    return this;
};

HUD.prototype.update = function(dt, heart, score, multiplier) {

	this.beatText.text = heart.beat ? "BEAT" : "-";
	this.hpText.text = heart.hp;

	this.scoreText.text = score;

	this.multiplierText.text = multiplier;
}

HUD.prototype.draw = function(stage) {

    stage.addChild(this.bitmap);
    stage.addChild(this.beatText);	
    stage.addChild(this.hpText);	
    stage.addChild(this.scoreText);	
    stage.addChild(this.multiplierText);	
}

HUD.prototype.debugDraw = function(g, stage) {

}
