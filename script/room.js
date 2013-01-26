"use strict";

var Room = function(index) {

    this.index = index;

    /*this.bitmaps = [
        new createjs.Bitmap("./assets/room01.png"),
        new createjs.Bitmap("./assets/room02.png"),
        new createjs.Bitmap("./assets/room03.png"),
        new createjs.Bitmap("./assets/room04.png"),
    ];*/

    var zeroedId = zeroFill(this.index, 2);
    this.bitmap = new createjs.Bitmap(imagePool["bg" + zeroedId]);
    this.json = jsonPool["room" + zeroedId];

    return this;
};

Room.prototype.update = function(dt) {

}
