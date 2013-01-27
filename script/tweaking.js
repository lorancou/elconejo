"use strict";

//**** Heart beat & scoring control ******************************************

// ms
var HEARTBEAT_LEVELS = [
	{ hpStart:  0, hpEnd:  40, delay: 1500, beat:  1000 }, 
	{ hpStart: 41, hpEnd:  80, delay: 1250, beat:  750 },
	{ hpStart: 81, hpEnd: 120, delay: 1000, beat:  500 },
];

var SKULL_HP = 3;
var SKULL_VALUE = 1;
var SKULL_HEAL = 1;
var SKULL_DAMAGE = 1;
var SKULL_MOVE_SPEED = 96; //Vitesse en pixels par seconde.

//**** Room control **********************************************************

var DUNGEON_SIZE = 8; // 8x8 = 64
var DUNGEON_ROOM_COUNT_MIN = 20;
var DUNGEON_ROOM_COUNT_MAX = 30;
var ROOM_COUNT = 17;

//**** El Conejo the Wrestler *************************************************

var WRESTLER_MOVE_SPEED = 176; //Vitesse en pixels par seconde.

var WRESTLER_ANIMS = {
	// start, end, next, frequency

	run_dw: [ 0,  3, "run_dw", 4],
	run_lf: [ 4,  7, "run_lf", 4],
	run_rt: [ 8, 11, "run_rt", 4],
	run_up: [12, 15, "run_up", 4],

	punch_dw: [20, 24, false, 2],
	punch_lf: [25, 29, false, 2],
	punch_rt: [30, 34, false, 2],
	punch_up: [35, 39, false, 2],
};

var WRESTLER_HITBOX = { x: 32, y: 64, width: 32, height: 32 };

var WRESTLER_PUNCHBOX = [
	// x, y, width, height

	{ x: 24, y: 96, width: 48, height: 48 }, // down
	{ x: -16, y: 56, width: 48, height: 48 }, // left
	{ x: 64, y: 56, width: 48, height: 48 }, // right
	{ x: 24, y: 16, width: 48, height: 48 }, // up

];

//**** Los Skullos con un Sombrero *******************************************

var SKULL_ANIMS = {
	// start, end, next, frequency

	run_dw: [ 0,  3, "run_dw", 5],
	run_lf: [ 4,  7, "run_lf", 5],
	run_rt: [ 8,  11, "run_rt", 5],
	run_up: [ 12,  15, "run_up", 5],

	punch_dw: [16, 19, false, 2],
	punch_lf: [20, 23, false, 2],
	punch_rt: [24, 27, false, 2],
	punch_up: [28, 31, false, 2],
};

var SKULL_HITBOX = { x: 16, y: 32, width: 32, height: 32 };
