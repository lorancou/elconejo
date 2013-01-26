"use strict";

var imagePool = new Array();
var jsonPool = new Array();

var ROOM_WIDTH = 640;
var ROOM_HEIGHT = 480;

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
	return 	ax1 < bx2 &&
			ax2 > bx1 &&
	    	ay1 < ay2 &&
	    	ay2 > by1; 
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
