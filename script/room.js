var Room = function(stage) {

    this.index = 0;

    /*this.bitmaps = [
        new createjs.Bitmap("./assets/room01.png"),
        new createjs.Bitmap("./assets/room02.png"),
        new createjs.Bitmap("./assets/room03.png"),
        new createjs.Bitmap("./assets/room04.png"),
    ];*/
    this.bitmap = new createjs.Bitmap("./assets/room0" + (this.index+1) + ".png");

    //stage.addChildAt(this.bitmaps[this.index],0);
    stage.addChildAt(this.bitmap,0);
                            
    return this;
};

Room.prototype.update = function(dt) {

}

Room.prototype.change = function(newIndex) {

    stage.removeChildAt(0);
    this.index = newIndex;
    var number = this.index + 1;
    this.bitmap = new createjs.Bitmap("./assets/room0" + number + ".png");
    stage.addChildAt(this.bitmap, 0);
}
