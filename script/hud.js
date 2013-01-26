"use strict";

var HUD_WIDTH = 640;
var HUD_HEIGHT = 64;
var HUD_Y = ROOM_HEIGHT;

var HUD = function() {

    this.bitmap = new createjs.Bitmap(imagePool["hud"]);
    this.bitmap.y = HUD_Y;

    return this;
};

HUD.prototype.draw = function(stage) {

    stage.addChild(this.bitmap);	
}

HUD.prototype.debugDraw = function(g, stage) {

}
