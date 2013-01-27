"use strict";

var Dungeon = function() {

    this.data = new Array(DUNGEON_SIZE);
    for (var i = 0; i<DUNGEON_SIZE; ++i) {
        this.data[i] = new Array(DUNGEON_SIZE);
        for (var j = 0; j<DUNGEON_SIZE; ++j) {
            this.data[i][j] = -1;
        }
    }

    var roomsLeft = DUNGEON_ROOM_COUNT_MIN +
                    Math.floor(Math.random() *
                    (DUNGEON_ROOM_COUNT_MAX - DUNGEON_ROOM_COUNT_MIN));

    var nextRoomIndex = 0; // always start with room 0
    var x = Math.floor(Math.random() * DUNGEON_SIZE);
    var y = Math.floor(Math.random() * DUNGEON_SIZE);

    this.currentX = x;
    this.currentY = y;

    var iteration = 0;

    while (roomsLeft > 0 && iteration++<200) {

        if (this.data[x][y] == -1) {
            this.data[x][y] = nextRoomIndex;
            --roomsLeft;
        }

        var nextSpots = new Array();
        if (x > 0) {
            nextSpots.push({ x: x-1, y: y});
        }
        if (x < DUNGEON_SIZE-1) {
            nextSpots.push({ x: x+1, y: y});
        }
        if (y > 0) {
            nextSpots.push({ x: x, y: y-1});
        }
        if (y < DUNGEON_SIZE-1) {
            nextSpots.push({ x: x, y: y+1});
        }
        var randomPick = Math.floor(Math.random() * nextSpots.length);
        var spot = nextSpots[randomPick];
        x = spot.x;
        y = spot.y;

        nextRoomIndex = 1 + Math.floor(Math.random() * (ROOM_COUNT-1)); // ignore room 0
    }

    return this;
};

Dungeon.prototype.getRoomIndex = function(x, y) {

    return this.data[x,y];
}

Dungeon.prototype.getCurrentRoomIndex = function() {

    return this.data[this.currentX][this.currentY];
}

Dungeon.prototype.getLeftRoomIndex = function() {

    return this.data[this.currentX-1][this.currentY];
}

Dungeon.prototype.goLeft = function() {

    this.currentX--;
}

Dungeon.prototype.getRightRoomIndex = function() {

    return this.data[this.currentX+1][this.currentY];
}

Dungeon.prototype.goRight = function() {

    this.currentX++;
}

Dungeon.prototype.getUpRoomIndex = function() {

    return this.data[this.currentX][this.currentY-1];
}

Dungeon.prototype.goUp = function() {

    this.currentY--;
}

Dungeon.prototype.getDownRoomIndex = function() {

    return this.data[this.currentX][this.currentY+1];
}

Dungeon.prototype.goDown = function() {

    this.currentY++;
}
