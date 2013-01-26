"use strict";

var DIR_DW = 0;
var DIR_LF = 1;
var DIR_RT = 2;
var DIR_UP = 3;

var STATE_IDLE = 0;
var STATE_RUN = 1;
var STATE_PUNCH = 2;

function getDirSuffix(dir) {
	switch (dir) {
		case DIR_DW: return "_dw";
		case DIR_LF: return "_lf";
		case DIR_RT: return "_rt";
		case DIR_UP: return "_up";
	}
	assert(false);
}