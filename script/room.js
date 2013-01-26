"use strict";

var ROOM_TILE_SIZE = 32;

var ROOM_TILE_EMPTY = 0;
var ROOM_TILE_WALL = 1;
var ROOM_TILE_SKULL = 2;

var Room = function(index) {

    this.index = index;

    // create the gameplay elements arrays
    this.skulls = new Array();
    this.walls = new Array();

    var zeroedId = zeroFill(this.index, 2);
    this.bitmap = new createjs.Bitmap(imagePool["bg" + zeroedId]);
    this.json = jsonPool["room" + zeroedId];

    for (var col=0; col<this.json.data.length; ++col) {    
        for (var row=0; row<this.json.data[col].length; ++row) {
            var x = col * ROOM_TILE_SIZE;
            var y = row * ROOM_TILE_SIZE;
            switch (this.json.data[col][row][0]) {
            case ROOM_TILE_WALL: this.walls.push(new Wall(x, y)); break;
            case ROOM_TILE_SKULL: this.skulls.push(new Skull(x, y)); break;
            }
        }
    }

    return this;
};

Room.prototype.update = function(dt, wresler) {

    for (var i = 0; i<this.skulls.length; ++i) {
        if (!this.skulls[i]) {
            continue;
        }

        this.skulls[i].update(dt);

        // hits
        if (wresler.punchBox) {
            var hitBox = new createjs.Rectangle(
                this.skulls[i].anim.x + SKULL_HITBOX.x,
                this.skulls[i].anim.y + SKULL_HITBOX.y,
                SKULL_HITBOX.width,
                SKULL_HITBOX.height
                );
            if (rectIntersect(hitBox, wresler.punchBox)) {
                this.skulls[i] = null;
                //score += 1;
                //scoreDiv.innerHTML = score;
            }
        }
    }
}

Room.prototype.draw = function(stage) {

    stage.addChild(this.bitmap);

    for (var i = 0; i<this.skulls.length; ++i) {
        if (!this.skulls[i]) {
            continue;
        }
        stage.addChild(this.skulls[i].anim);
    }
}

Room.prototype.debugDraw = function(g, stage) {

    for (var i = 0; i<this.walls.length; ++i) {
        this.walls[i].debugDraw(g, stage);
    }
}
