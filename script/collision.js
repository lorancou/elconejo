"use strict";

// http://stackoverflow.com/a/306332/1005455
function rectIntersect(rectA, rectB) {
    var ax1 = rectA.x;
    var ax2 = rectA.x + rectA.width;
    var ay1 = rectA.y;
    var ay2 = rectA.y + rectA.height;
    var bx1 = rectB.x;
    var bx2 = rectB.x + rectB.width;
    var by1 = rectB.y;
    var by2 = rectB.y + rectB.height;
    return  ax1 < bx2 &&
            ax2 > bx1 &&
            ay1 < by2 &&
            ay2 > by1; 
}

function uberResolve(room, hitBox, dx, dy) {

    // resolve along x

    hitBox.x += dx;

    if (dx < 0) {
        resolveLeft(room, hitBox);
    } else if (dx > 0) {
        resolveRight(room, hitBox);
    }

    // resolve along y

    hitBox.y += dy;

    if (dy < 0) {
        resolveUp(room, hitBox);
    } else if (dy > 0) {
        resolveDown(room, hitBox);
    }

}

function resolveLeft(room, hitBox) {

    var topLeft = getTopLeft(hitBox);
    var botLeft = getBotLeft(hitBox);

    var wallTopLeft = room.getWallAt(topLeft);
    var wallBotLeft = room.getWallAt(botLeft);

    if (wallTopLeft) {
        wallTopLeft.touched = true;
        hitBox.x = getRight(wallTopLeft);
    } else if (wallBotLeft) {
        wallBotLeft.touched = true;
        hitBox.x = getRight(wallBotLeft);
    }
}

function resolveRight(room, hitBox) {

    var topRight = getTopRight(hitBox);
    var botRight = getBotRight(hitBox);

    var wallTopRight = room.getWallAt(topRight);
    var wallBotRight = room.getWallAt(botRight);

    if (wallTopRight) {
        wallTopRight.touched = true;
        hitBox.x = getLeft(wallTopRight) - ROOM_TILE_SIZE - 1; // hack
    } else if (wallBotRight) {
        wallBotRight.touched = true;
        hitBox.x = getLeft(wallBotRight) - ROOM_TILE_SIZE - 1; // hack
    }
}

function resolveUp(room, hitBox) {

    var topLeft = getTopLeft(hitBox);
    var topRight = getTopRight(hitBox);

    var wallTopLeft = room.getWallAt(topLeft);
    var wallTopRight = room.getWallAt(topRight);

    if (wallTopLeft) {
        wallTopLeft.touched = true;
        hitBox.y = getBottom(wallTopLeft);
    } else if (wallTopRight) {
        wallTopRight.touched = true;
        hitBox.y = getBottom(wallTopRight);
    }
}

function resolveDown(room, hitBox) {

    var botLeft = getBotLeft(hitBox);
    var botRight = getBotRight(hitBox);

    var wallBotLeft = room.getWallAt(botLeft);
    var wallBotRight = room.getWallAt(botRight);

    if (wallBotLeft) {
        wallBotLeft.touched = true;
        hitBox.y = getTop(wallBotLeft) - ROOM_TILE_SIZE - 1; // hack
    } else if (wallBotRight) {
        wallBotRight.touched = true;
        hitBox.y = getTop(wallBotRight) - ROOM_TILE_SIZE - 1; // hack
    }
}
