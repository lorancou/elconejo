"use strict";

var debug = getParameterByName("debug") == "true" ? true : false;

// PreloadJS
var preload;
var messageField;
var loadingInterval = 0;

// EaselJS stage
var stage;

// Gameplay
var heart;
var score;
var multiplier;
var hud;
var dungeon;
var room;
var wrestler;

function init() {

	// get a reference to the canvas we'll be working with:
	var canvas = document.getElementById("canvas");

	// create a stage object to work with the canvas. This is the top level node in the display list:
	stage = new createjs.Stage(canvas);

	var manifest = [
		{src:"./assets/bg/hud.png", id:"hud"},
		{src:"./assets/sprites/skull.png", id:"skull"},
		{src:"./assets/sprites/tequila.png", id:"tequila"},
		{src:"./assets/sprites/wrestler.png", id:"wrestler"},
		{src:"./assets/sprites/wall.png", id:"wall"},
		{src:"./assets/sprites/rope_dw.png", id:"rope_dw"},
		{src:"./assets/sprites/rope_lf.png", id:"rope_lf"},
		{src:"./assets/sprites/rope_rt.png", id:"rope_rt"},
		{src:"./assets/sprites/rope_up.png", id:"rope_up"},
		{src:"./assets/sprites/heart.png", id:"heart"},
		{src:"./assets/sfx/heartbeat0.ogg", id:"heartbeat0"},
		{src:"./assets/sfx/heartbeat1.ogg", id:"heartbeat1"},
		{src:"./assets/sfx/heartbeat2.ogg", id:"heartbeat2"},
		{src:"./assets/sfx/music.ogg", id:"music"},
		{src:"./assets/sfx/punch.ogg", id:"punch"},
		{src:"./assets/sfx/damage.ogg", id:"damage"},
		{src:"./assets/sfx/hit.ogg", id:"hit"},
	];
	for (var i=0; i<ROOM_COUNT; ++i) {
	    var zeroedId = zeroFill(i, 2);
		manifest.push({src:"./assets/bg/bg"+zeroedId+".png", id:"bg"+zeroedId});
		manifest.push({src:"./assets/rooms/room"+zeroedId+".json", id:"room"+zeroedId});
	}

	var soundJSOK = createjs.SoundJS.checkPlugin(true);
	assert(soundJSOK);

	preload = new createjs.PreloadJS();
    preload.onFileLoad = handleFileLoad;
	preload.onComplete = doneLoading;
	preload.installPlugin(createjs.SoundJS);
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

	dungeon = new Dungeon();

	heart = new Heart();

	score = 0;
	multiplier = 1;

	hud = new HUD();

	// create a room
	/*var data = dungeon.getCurrentRoomData();
	data.index = 19;
	room = new Room(data);*/
	room = new Room(dungeon.getCurrentRoomData());

	// create our wrestler
	wrestler = new Wrestler();

	//register key functions
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;

	// start the music
	createjs.SoundJS.play("music", createjs.SoundJS.INTERRUPT_NONE, 0, 0, -1, 0.4);

	// start game loop
	//createjs.Ticker.setInterval(window.requestAnimationFrame);
	createjs.Ticker.useRAF = false;
	createjs.Ticker.addListener(update);
	createjs.Ticker.setFPS(30);
}

function update(dt) {

	// game objects updates
	var interacResult = wrestler.update(dt, room);
	room.update(dt);
	heart.update(dt, interacResult);
	updateScoring(dt, heart, interacResult);
	hud.update(dt, heart, score, multiplier);

	draw();

	// room change
	var topLeft = getTopLeft(wrestler.hitBox);
	var bottomRight = getBotRight(wrestler.hitBox);
	if (topLeft.x < 0) {
		var index = dungeon.getLeftRoomIndex();
		if (index != -1) {
			dungeon.goLeft();
			room = new Room(dungeon.getCurrentRoomData());
			wrestler.changeRoom(DIR_LF);
		}
	} else if (bottomRight.x > ROOM_WIDTH) {
		var index = dungeon.getRightRoomIndex();
		if (index != -1) {
			dungeon.goRight();
			room = new Room(dungeon.getCurrentRoomData());
			wrestler.changeRoom(DIR_RT);
		}
	} else if (topLeft.y < 0) {
		var index = dungeon.getUpRoomIndex();
		if (index != -1) {
			dungeon.goUp();
			room = new Room(dungeon.getCurrentRoomData());
			wrestler.changeRoom(DIR_UP);
		}
	} else if (bottomRight.y > ROOM_HEIGHT) {
		var index = dungeon.getDownRoomIndex();
		if (index != -1) {
			dungeon.goDown();
			room = new Room(dungeon.getCurrentRoomData());
			wrestler.changeRoom(DIR_DW);
		}
	}
}

function updateScoring(dt, heart, interacResult) {

	score += interacResult.score * multiplier;

	if (interacResult.hit && heart.beat) {
		multiplier += HIT_ON_BEAT_BONUS;
	} else if (interacResult.miss && !heart.beat) {
		multiplier = Math.max(multiplier - MISS_OFF_BEAT_MALUS, 1);
	}
}

function draw() {

	room.draw(stage);
	wrestler.draw(stage);
	hud.draw(stage);

	if (debug) {
		var g = new createjs.Graphics();
		room.debugDraw(g, stage);
		wrestler.debugDraw(g, stage);
	}

	// call update on the stage to make it render the current display list to the canvas:
	stage.clear();
	stage.update();
	stage.removeAllChildren();
}

function handleKeyDown(e) {

	//cross browser issues exist
	if(!e){ var e = window.event; }
	wrestler.handleKeyDown(e);
}

function handleKeyUp(e) {

	//cross browser issues exist
	if(!e){ var e = window.event; }
	wrestler.handleKeyUp(e);
}
