"use strict";

var debug = getParameterByName("debug") == "true" ? true : false;
var stage;
var score;
var room;
var wresler;
var skulls;

var scoreDiv; // TEMP

function init() {
	
	// get a reference to the canvas we'll be working with:
	var canvas = document.getElementById("canvas");
	scoreDiv = document.getElementById("score");

	// create a stage object to work with the canvas. This is the top level node in the display list:
	stage = new createjs.Stage(canvas);

	score = 0;

	// create a room
	room = new Room();

	// create our wresler
	wresler = new Wresler();

	// create a bunch of skulls
	skulls = new Array();
	for (var i = 0; i<10; ++i) {
		skulls.push(new Skull());
	}

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

	// room change
	if (wresler.x < 0) {
		room.change((room.index + 4 - 1)%4);
		wresler.x = 320;
		wresler.y = 240;
	} else if (wresler.x > ROOM_WIDTH) {
		room.change((room.index + 1)%4);
		wresler.x = 320;
		wresler.y = 240;
	} else if (wresler.y < 0) {
		room.change((room.index + 4 - 1)%4);
		wresler.x = 320;
		wresler.y = 240;
	} else if (wresler.y > ROOM_HEIGHT) {
		room.change((room.index + 1)%4);
		wresler.x = 320;
		wresler.y = 240;
	}

	// game objects updates
	wresler.update(dt);

	for (var i = 0; i<10; ++i) {
		if (!skulls[i]) {
			continue;
		}

		skulls[i].update(dt);

		// hits
		if (wresler.punchBox) {
	        var hitBox = new createjs.Rectangle(
	            skulls[i].anim.x + SKULL_HITBOX.x,
	            skulls[i].anim.y + SKULL_HITBOX.y,
	            SKULL_HITBOX.width,
	            SKULL_HITBOX.height
	            );
	        if (rectIntersect(hitBox, wresler.punchBox)) {
	        	skulls[i] = null;
	        	score += 1;
	        	scoreDiv.innerHTML = score;
	        }
	    }
	}

	draw();
}

function draw() {

	stage.addChild(room.bitmap);

	for (var i = 0; i<10; ++i) {
		if (!skulls[i]) {
			continue;
		}
		stage.addChild(skulls[i].anim);
	}

	stage.addChild(wresler.anim);

	if (debug) {
		var g = new createjs.Graphics();
		if (wresler.punchBox) {
			g.setStrokeStyle(1);
			g.beginStroke(createjs.Graphics.getRGB(255,0,0));
			g.drawRect(
				wresler.punchBox.x,
				wresler.punchBox.y,
				wresler.punchBox.width,
				wresler.punchBox.height
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
