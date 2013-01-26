"use strict";

var WALL_SIZE = 32; // 16*2

var Wall = function(x, y) {

    this.x = x;
    this.y = y;

    return this;
};

Wall.prototype.debugDraw = function(g, stage) {

    g.setStrokeStyle(1);
    g.beginStroke(createjs.Graphics.getRGB(255,0,255));
    g.drawRect(
        this.x,
        this.y,
        WALL_SIZE,
        WALL_SIZE
        );
    var s = new createjs.Shape(g);
    stage.addChild(s);
}
