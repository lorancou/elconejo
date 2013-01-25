function init() {
	// get a reference to the canvas we'll be working with:
	var canvas = document.getElementById("testCanvas");

	// create a stage object to work with the canvas. This is the top level node in the display list:
	var stage = new createjs.Stage(canvas);

	// Create a new Text object:
	var text = new createjs.Text("Hello World!", "36px Arial", "#000");

	// add the text as a child of the stage. This means it will be drawn any time the stage is updated
	// and that it's transformations will be relative to the stage coordinates:
	stage.addChild(text);

	// position the text on screen, relative to the stage coordinates:
	text.x = 0;
	text.y = 0;

	// call update on the stage to make it render the current display list to the canvas:
	stage.update();
}
