var stage;
var wresker;

function init() {
	// get a reference to the canvas we'll be working with:
	var canvas = document.getElementById("canvas");

	// create a stage object to work with the canvas. This is the top level node in the display list:
	stage = new createjs.Stage(canvas);

	// create our wresler
	wresler = new wresler(stage);

	// start game loop
	createjs.Ticker.setInterval(window.requestAnimationFrame);
	createjs.Ticker.addListener(update);
}

function update() {

	// game objects updates
	wresler.update();

	// call update on the stage to make it render the current display list to the canvas:
	stage.update();
}
