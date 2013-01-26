"use strict";

//**** El Conejo the Wresler *************************************************

var WRESLER_MOVE_SPEED = 256; //Vitesse en pixels par seconde.

var WRESLER_ANIMS = {
	// start, end, next, frequency

	run_dw: [ 0,  3, "run_dw", 5],
	run_lf: [ 4,  7, "run_lf", 5],
	run_rt: [ 8, 11, "run_rt", 5],
	run_up: [12, 15, "run_up", 5],

	punch_dw: [16, 19, false, 5],
	punch_lf: [20, 23, false, 5],
	punch_rt: [24, 27, false, 5],
	punch_up: [28, 31, false, 5],
};

var WRESLER_PUNCHBOX = [
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
