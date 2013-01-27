"use strict";

var ROOM_TILE_EMPTY = 0;
var ROOM_TILE_WALL = 1;
var ROOM_TILE_SKULL = 2;

var ROOM_COL_COUNT = ROOM_WIDTH / ROOM_TILE_SIZE;
var ROOM_ROW_COUNT = ROOM_HEIGHT / ROOM_TILE_SIZE;

var Room = function(index) {

    this.index = index;

    // create the gameplay elements arrays
    this.skulls = new Array();

    this.walls = new Array();

    var zeroedId = zeroFill(this.index, 2);
    this.bitmap = new createjs.Bitmap(imagePool["bg" + zeroedId]);
    this.json = jsonPool["room" + zeroedId];

    assert(this.json.data.length == ROOM_COL_COUNT);
    this.wallsInAGrid = new Array(ROOM_COL_COUNT);

    for (var col=0; col<ROOM_COL_COUNT; ++col) {

        assert(this.json.data[col].length == ROOM_ROW_COUNT);
        this.wallsInAGrid[col] = new Array(ROOM_ROW_COUNT);

        for (var row=0; row<this.json.data[col].length; ++row) {

            switch (this.json.data[col][row][0]) {
            case ROOM_TILE_WALL:
            {
                var x = col * ROOM_TILE_SIZE;
                var y = row * ROOM_TILE_SIZE;
                var newWall = new Wall(x, y);
                this.walls.push(newWall);
                this.wallsInAGrid[col][row] = newWall;
            } break;
            case ROOM_TILE_SKULL:
            {
                var x = col * ROOM_TILE_SIZE + 16;
                var y = row * ROOM_TILE_SIZE + 0;
                this.skulls.push(new Skull(x, y)); break;
            } break;
            }
        }
    }

    return this;
};

Room.prototype.update = function(dt, wrestler) {

    for (var i = 0; i<this.skulls.length; ++i) {
        this.skulls[i].update(dt, wrestler);
    }
}

Room.prototype.handlePunch = function(punchBox) {

    var stats = new FrameStats(); 

    var i = this.skulls.length;
    while (i--) {

        var skullStats = this.skulls[i].handlePunch(punchBox);
        if (this.skulls[i].hp == 0) {
            this.skulls.splice(i, 1);
        }

        stats.apply(skullStats);
    }

    return stats;
}

Room.prototype.draw = function(stage) {

    stage.addChild(this.bitmap);

    for (var i = 0; i<this.skulls.length; ++i) {
        this.skulls[i].draw(stage);
    }
}

Room.prototype.debugDraw = function(g, stage) {

    for (var i = 0; i<this.skulls.length; ++i) {
        this.skulls[i].debugDraw(g, stage);
    }
    for (var i = 0; i<this.walls.length; ++i) {
        this.walls[i].debugDraw(g, stage);
    }
}

Room.prototype.getWallAt = function(pos) {
    var col = Math.floor(pos.x / ROOM_TILE_SIZE);
    var row = Math.floor(pos.y / ROOM_TILE_SIZE);
    if (col < 0 ||
        col >= ROOM_COL_COUNT ||
        row < 0 ||
        row >= ROOM_ROW_COUNT
        )
    {
        return null;
    }
    assert(this.wallsInAGrid[col] !== undefined);
    return this.wallsInAGrid[col][row];
}
