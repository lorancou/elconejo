"use strict";

var debug = getParameterByName("debug") == "true" ? true : false;
var stage;
var room;
var wresler;

function init() {
	
	// get a reference to the canvas we'll be working with:
	var canvas = document.getElementById("canvas");

	// create a stage object to work with the canvas. This is the top level node in the display list:
	stage = new createjs.Stage(canvas);

	// create a room
	room = new Room(stage);

	// create our wresler
	wresler = new Wresler(stage);

	//register key functions
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;

	// start game loop
	//createjs.Ticker.setInterval(window.requestAnimationFrame);
	createjs.Ticker.useRAF = false;
	createjs.Ticker.addListener(update);
	createjs.Ticker.setFPS(30);
}

function update(dt) {

	room.update();

	if (wresler.x < 0) {
		room.change((room.index + 4 - 1)%4);
		wresler.x = 320;
		wresler.y = 240;
	} else if (wresler.x > 640) {
		room.change((room.index + 1)%4);
		wresler.x = 320;
		wresler.y = 240;
	} else if (wresler.y < 0) {
		room.change((room.index + 4 - 1)%4);
		wresler.x = 320;
		wresler.y = 240;
	} else if (wresler.y > 640) {
		room.change((room.index + 1)%4);
		wresler.x = 320;
		wresler.y = 240;
	}

	// game objects updates
	wresler.update(dt);

	draw();
}

function draw() {

	stage.addChild(room.bitmap);
	stage.addChild(wresler.anim);

	var g = new createjs.Graphics();
	g.setStrokeStyle(1);

	if (debug) {
		var g = new createjs.Graphics();
		if (wresler.punchbox) {
			g.setStrokeStyle(1);
			g.beginStroke(createjs.Graphics.getRGB(255,0,0));
			g.drawRect(
				wresler.punchbox.x,
				wresler.punchbox.y,
				wresler.punchbox.width,
				wresler.punchbox.height
				);
			var s = new createjs.Shape(g);
			stage.addChild(s);
		}
	}

	// call update on the stage to make it render the current display list to the canvas:
	stage.clear();
	stage.update();
	stage.removeAllChildren();
}

function handleKeyDown(e) {

	//cross browser issues exist
	if(!e){ var e = window.event; }
	wresler.handleKeyDown(e);
}

function handleKeyUp(e) {

	//cross browser issues exist
	if(!e){ var e = window.event; }
	wresler.handleKeyUp(e);
}
