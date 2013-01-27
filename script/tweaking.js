"use strict";

//**** Heart beat & scoring control ******************************************

// ms
var HEARTBEAT_LEVELS = [
	{ hpStart:  0, hpEnd:  40, delay: 1000, beat:  800 }, 
	{ hpStart: 41, hpEnd:  80, delay:  750, beat:  500 },
	{ hpStart: 81, hpEnd: 120, delay:  500, beat:  300 },
];

var SKULL_VALUE = 1;
var SKULL_HP_BONUS = 1;

//**** Room control **********************************************************

var ROOM_COUNT = 5;

//**** El Conejo the Wrestler *************************************************

var WRESTLER_MOVE_SPEED = 128; //Vitesse en pixels par seconde.

var WRESTLER_ANIMS = {
	// start, end, next, frequency

	run_dw: [ 0,  3, "run_dw", 5],
	run_lf: [ 4,  7, "run_lf", 5],
	run_rt: [ 8, 11, "run_rt", 5],
	run_up: [12, 15, "run_up", 5],

	punch_dw: [20, 24, false, 5],
	punch_lf: [25, 29, false, 5],
	punch_rt: [30, 34, false, 5],
	punch_up: [35, 39, false, 5],
};

var WRESTLER_HITBOX = { x: 32, y: 64, width: 32, height: 32 };

var WRESTLER_PUNCHBOX = [
	// x, y, width, height

	{ x: 24, y: 48, width: 48, height: 48 }, // down
	{ x:  0, y: 48, width: 48, height: 48 }, // left
	{ x: 48, y: 48, width: 48, height: 48 }, // right
	{ x: 24, y: 24, width: 48, height: 48 }, // up

];

//**** Los Skullos con un Sombrero *******************************************

var SKULL_ANIMS = {
	// start, end, next, frequency

	run_dw: [ 0,  1, "run_dw", 5],
	run_lf: [ 0,  1, "run_lf", 5],
	run_rt: [ 0,  1, "run_rt", 5],
	run_up: [ 0,  1, "run_up", 5],

};

var SKULL_HITBOX = { x: 0, y: 0, width: 32, height: 32 };
