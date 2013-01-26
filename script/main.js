"use strict";

var debug = getParameterByName("debug") == "true" ? true : false;

// PreloadJS
var preload;
var messageField;
var loadingInterval = 0;

// EaselJS stage
var stage;

// Gameplay
var score;
var room;
var wresler;
var skulls;

// TEMP
var scoreDiv;

function init() {

	// get a reference to the canvas we'll be working with:
	var canvas = document.getElementById("canvas");

	// create a stage object to work with the canvas. This is the top level node in the display list:
	stage = new createjs.Stage(canvas);

	var manifest = [
		{src:"./assets/bg/bg00.png", id:"bg00"},
		{src:"./assets/bg/bg01.png", id:"bg01"},
		{src:"./assets/bg/bg02.png", id:"bg02"},
		{src:"./assets/bg/bg03.png", id:"bg03"},
		{src:"./assets/bg/bg04.png", id:"bg04"},
		{src:"./assets/rooms/room00.json", id:"room00"},
		{src:"./assets/rooms/room01.json", id:"room01"},
		{src:"./assets/sprites/skull.png", id:"skull"},
		{src:"./assets/sprites/wresler.png", id:"wresler"},
	];

	preload = new createjs.PreloadJS();
    preload.onFileLoad = handleFileLoad;
	preload.onComplete = doneLoading;
	preload.loadManifest(manifest);

	messageField = new createjs.Text("Loading", "bold 24px Arial", "#000000");
	messageField.maxWidth = 1000;
	messageField.textAlign = "center";
	messageField.x = canvas.width / 2;
	messageField.y = canvas.height / 2;
	stage.addChild(messageField);
	stage.update(); 	//update the stage to show text

	loadingInterval = setInterval(updateLoading, 1);
}

function updateLoading() {
	messageField.text = "Loading " + (preload.progress*100|0) + "%";
	stage.clear();
	stage.update();
}

function handleFileLoad(event) {
	switch (event.type) {

	case "image":
	{
        imagePool[event.id] = new Image();
        imagePool[event.id].src = event.src;
	} break;
	case "json":
	{
		jsonPool[event.id] = JSON.parse(event.result);
	} break;
	}
}

function handleImageLoadComplete(event) {

}

function doneLoading() {
	
	clearInterval(loadingInterval);

	scoreDiv = document.getElementById("score");

	score = 0;

	// create a room
	room = new Room(0);

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

	// game objects updates
	wresler.update(dt);

	room.update();

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

	// room change
	if (wresler.x < 0) {
		room = new Room((room.index + 5)%4);
		wresler.x = 320;
		wresler.y = 240;
	} else if (wresler.x > ROOM_WIDTH) {
		room = new Room((room.index + 1)%4);
		wresler.x = 320;
		wresler.y = 240;
	} else if (wresler.y < 0) {
		room = new Room((room.index + 5)%4);
		wresler.x = 320;
		wresler.y = 240;
	} else if (wresler.y > ROOM_HEIGHT) {
		room = new Room((room.index + 1)%4);
		wresler.x = 320;
		wresler.y = 240;
	}	
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
