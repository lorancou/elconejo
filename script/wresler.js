var wresler = function(stage) {

    this.x = 320;
    this.y = 240;

    var ss = new createjs.SpriteSheet({
        "frames": {
            "width": 32,
            "height": 32
        },
        "animations": {
            "run": [0, 1]
        },
        "images": ["./assets/wresler.png"]
    });

    var bitmapAnimation = new createjs.BitmapAnimation(ss);
    bitmapAnimation.scaleY = bitmapAnimation.scaleX = 1;
    bitmapAnimation.gotoAndPlay("run");

    stage.addChild(bitmapAnimation);
                            
    return this;
};

wresler.prototype.update = function() {


}
