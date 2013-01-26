"use strict";

// El Conejo the Wresler
var WRESLER_MOVE_SPEED = 256; //Vitesse en pixels par seconde.
var WRESLER_ANIMS = {
	// start, end, next, frequency
	// run left, right, up, down
	run_dw: [ 0,  3, "run_dw", 5],
	run_lf: [ 4,  7, "run_lf", 5],
	run_rt: [ 8, 11, "run_rt", 5],
	run_up: [12, 15, "run_up", 5],
	// punch left, right, up, down
	punch_dw: [16, 19, false, 5],
	punch_lf: [20, 23, false, 5],
	punch_rt: [24, 27, false, 5],
	punch_up: [28, 31, false, 5],
}
