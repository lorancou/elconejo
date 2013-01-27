"use strict";

var imagePool = new Array();
var jsonPool = new Array();

var ROOM_WIDTH = 640;
var ROOM_HEIGHT = 480;
var ROOM_TILE_SIZE = 32;

var DIR_DW = 0;
var DIR_LF = 1;
var DIR_RT = 2;
var DIR_UP = 3;

var STATE_IDLE = 0;
var STATE_RUN = 1;
var STATE_PUNCH = 2;

var GAMESTATE_TITLE = 0;
var GAMESTATE_PLAYING = 1;
var GAMESTATE_VICTORY = 2;
var GAMESTATE_DEFEAT = 3;

function getDirSuffix(dir) {
	switch (dir) {
		case DIR_DW: return "_dw";
		case DIR_LF: return "_lf";
		case DIR_RT: return "_rt";
		case DIR_UP: return "_up";
	}
	assert(false);
}

// http://stackoverflow.com/a/901144/1005455
function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if(results == null)
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
}

// http://stackoverflow.com/a/1267338/1005455
function zeroFill(number, width) {
	width -= number.toString().length;
	if ( width > 0 )
	{
		return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
	}
	return number + ""; // always return a string
}

function getTileIndex(pos) {
	var col = Math.round(pos.x / ROOM_TILE_SIZE);
	var row = Math.round(pos.y / ROOM_TILE_SIZE);
	return row * (ROOM_WIDTH / ROOM_TILE_SIZE) + col;
}

function getTopLeft(entity) {
    return new Vec2(
    	entity.x,
    	entity.y
    	);
}
function getTopRight(entity) {
    return new Vec2(
    	entity.x + entity.width,
    	entity.y
    	);
}
function getBotLeft(entity) {
    return new Vec2(
    	entity.x,
    	entity.y + entity.height
    	);
}
function getBotRight(entity) {
    return new Vec2(
    	entity.x + entity.width,
    	entity.y + entity.height
    	);
}
function getLeft(entity) {
    return entity.x;
}
function getRight(entity) {
    return entity.x + entity.width;
}
function getTop(entity) {
    return entity.y;
}
function getBottom(entity) {
    return entity.y + entity.height;
}

function assert(cond) {
	if (!cond) {
		debugger;
		//window.alert(cond);
	}
}

var InteractionResult = function() {
	this.hp = 0;
	this.score = 0;
	this.hit = false;
	this.miss = false;
}

InteractionResult.prototype.apply = function(other) {
	this.hp += other.hp;
	this.score += other.score;
	this.hit = this.hit || other.hit;
	this.miss = this.miss || other.miss;
}

function clamp(value, min, max) {
	return Math.max(Math.min(value, max), min);
}