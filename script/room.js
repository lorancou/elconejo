"use strict";

var ROOM_TILE_EMPTY = 0;
var ROOM_TILE_WALL = 1;
var ROOM_TILE_SKULL = 2;

var ROOM_COL_COUNT = ROOM_WIDTH / ROOM_TILE_SIZE;
var ROOM_ROW_COUNT = ROOM_HEIGHT / ROOM_TILE_SIZE;

var Room = function(roomInfo) {

    this.index = roomInfo.index;
    this.cleared = roomInfo.cleared;

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
                this.addWall(col, row, null);
            } break;
            case ROOM_TILE_SKULL:
            {
                if (!roomInfo.cleared) {
                    var x = col * ROOM_TILE_SIZE + 16;
                    var y = row * ROOM_TILE_SIZE + 0;
                    this.skulls.push(new Skull(x, y)); break;
                }
            } break;
            }
        }
    }

    // left entrance
    var wallSpriteLf = null;
    if (!roomInfo.hasLf) {
       wallSpriteLf = "wall";
    } else if (!roomInfo.cleared) {
       wallSpriteLf = "rope_lf";
    }
    if (wallSpriteLf)
    {
        this.addWall(0, 6, wallSpriteLf);
        this.addWall(0, 7, wallSpriteLf);
        this.addWall(0, 8, wallSpriteLf);
    }

    // right entrance
    var wallSpriteRt = null;
    if (!roomInfo.hasRt) {
       wallSpriteRt = "wall";
    } else if (!roomInfo.cleared) {
       wallSpriteRt = "rope_rt";
    }
    if (wallSpriteRt)
    {
        this.addWall(19, 6, wallSpriteRt);
        this.addWall(19, 7, wallSpriteRt);
        this.addWall(19, 8, wallSpriteRt);
    }

    // top entrance
    var wallSpriteUp = null;
    if (!roomInfo.hasUp) {
       wallSpriteUp = "wall";
    } else if (!roomInfo.cleared) {
       wallSpriteUp = "rope_up";
    }
    if (wallSpriteUp)
    {
        this.addWall(9, 0, wallSpriteUp);
        this.addWall(10, 0, wallSpriteUp);
    }

    // bottom entrance
    var wallSpriteBt = null;
    if (!roomInfo.hasDw) {
       wallSpriteBt = "wall";
    } else if (!roomInfo.cleared) {
       wallSpriteBt = "rope_dw";
    }
    if (wallSpriteBt)
    {
        this.addWall(9, 14, wallSpriteBt);
        this.addWall(10, 14, wallSpriteBt);
    }

    this.wrestlerRoot = new Vec2(0, 0);

    return this;
};

Room.prototype.addWall = function(col, row, sprite) {

    var x = col * ROOM_TILE_SIZE;
    var y = row * ROOM_TILE_SIZE;
    var newWall = new Wall(x, y, sprite);
    this.walls.push(newWall);
    this.wallsInAGrid[col][row] = newWall;    
}

Room.prototype.update = function(dt) {

    for (var i = 0; i<this.skulls.length; ++i) {
        this.skulls[i].update(dt, this.wrestlerRoot);
    }

    // true when cleared
    if (this.skulls.length == 0 && !this.cleared)
    {
        this.clearRopes();
        this.cleared = true;
    }
}

Room.prototype.clearRopes = function() {

    var i = this.walls.length;
    while (i--) {
        if (this.walls[i].isRope)
        {
            this.walls.splice(i, 1);
        }
    }

    i = ROOM_COL_COUNT;
    while (i--) {
        var j = ROOM_ROW_COUNT;
        while (j--) {
            if (this.wallsInAGrid[i][j] &&
                this.wallsInAGrid[i][j].isRope)
            {
                this.wallsInAGrid[i][j] = null;
            }
        }
    }
}

Room.prototype.handleInteractions = function(punchBox, hitBox) {

    var result = new InteractionResult(); 

    var i = this.skulls.length;
    while (i--) {

        var skullResult = this.skulls[i].handleInteractions(punchBox, hitBox);
        result.apply(skullResult);

        if (this.skulls[i].hp == 0) {
            this.skulls.splice(i, 1);
        }

        if (skullResult.hit) {
            break;
        }
    }

    return result;
}

Room.prototype.draw = function(stage) {

    stage.addChild(this.bitmap);

    for (var i = 0; i<this.walls.length; ++i) {
        this.walls[i].draw(stage);
    }
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
