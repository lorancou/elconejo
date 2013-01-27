"use strict";

var WALL_SIZE = 32; // 16*2

var Wall = function(x, y, sprite) {

    this.x = x;
    this.y = y;
    this.width = ROOM_TILE_SIZE;
    this.height = ROOM_TILE_SIZE;

    this.touched = false;

    this.bitmap = null;
    this.isRope = (sprite == "rope_dw" || sprite == "rope_lf" || sprite == "rope_rt" || sprite == "rope_up");
    if (sprite) {
        this.bitmap = new createjs.Bitmap(imagePool[sprite]);
        this.bitmap.x = x;
        this.bitmap.y = y;
    }

    return this;
};

Wall.prototype.draw = function(stage) {

    if (this.bitmap) {
        stage.addChild(this.bitmap);
    }
}

Wall.prototype.debugDraw = function(g, stage) {

    g.setStrokeStyle(1);
    g.beginStroke(createjs.Graphics.getRGB(255,0,this.touched?0:255));
    g.drawRect(
        this.x,
        this.y,
        WALL_SIZE,
        WALL_SIZE
        );
    var s = new createjs.Shape(g);
    stage.addChild(s);
}
