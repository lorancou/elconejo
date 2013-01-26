"use strict";

var HUD_WIDTH = 640;
var HUD_HEIGHT = 64;
var HUD_Y = ROOM_HEIGHT;

var HUD = function() {

    this.bitmap = new createjs.Bitmap(imagePool["hud"]);
    this.bitmap.y = HUD_Y;

	this.heartText = new createjs.Text("-", "bold 24px Arial", "#000000");
	this.heartText.maxWidth = HUD_WIDTH;
	this.heartText.textAlign = "center";
	this.heartText.x = 50;
	this.heartText.y = HUD_Y + HUD_HEIGHT / 2 - 20;

	this.scoreText = new createjs.Text("-", "bold 24px Arial", "#000000");
	this.scoreText.maxWidth = HUD_WIDTH;
	this.scoreText.textAlign = "center";
	this.scoreText.x = 320;
	this.scoreText.y = HUD_Y + HUD_HEIGHT / 2 - 20;

	this.multiplierText = new createjs.Text("-", "bold 24px Arial", "#000000");
	this.multiplierText.maxWidth = HUD_WIDTH;
	this.multiplierText.textAlign = "center";
	this.multiplierText.x = 590;
	this.multiplierText.y = HUD_Y + HUD_HEIGHT / 2 - 20;

    return this;
};

HUD.prototype.update = function(dt, heart) {

	this.heartText.text = heart.beat ? "BEAT" : "-";

	this.scoreText.text = "score";

	this.multiplierText.text = "mult";
}

HUD.prototype.draw = function(stage) {

    stage.addChild(this.bitmap);
    stage.addChild(this.heartText);	
    stage.addChild(this.scoreText);	
    stage.addChild(this.multiplierText);	
}

HUD.prototype.debugDraw = function(g, stage) {

}
