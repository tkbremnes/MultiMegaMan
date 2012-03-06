var servers = [];

servers[0] = {
	title: 'Dette er en server',
	ip: '129.241.127.32:1338',
	noOfPlayers: 0,
	ping: 0,
	isSelected: true
};

servers[1] = {
	title: 'Ikke-eksisterende server',
	ip: '129.241.127.32:1339',
	noOfPlayers: 1,
	ping: 50,
	isSelected: false
};

// TODO
var servermenu = {
	active: true,
	height: 300,
	width: 300,
	selectedServer: 0
};

function IntroMenu(){
	this.active = true;
	this.height = 512;
	this.width = 512;

	this.introMessage = "Welcome to Multi Mega Man!";

	this.startButton = new canvasButton(0, 100, 50, 200, 300, "Start Game", true);
	this.dummyButton = new canvasButton(0, 100, 50, 200, 400, "Start Game", false);

	this.buttons = [this.startButton, this.dummyButton];
	this.selectedButton = 0;
}

IntroMenu.prototype.getButtons = function() {
	return this.buttons;
};

IntroMenu.prototype.moveDown = function(){
	console.log(this.buttons.length);
	this.buttons[this.selectedButton].isSelected = false;
	this.selectedButton += 1;
	if(this.selectedButton>=this.buttons.length){
		this.selectedButton = 0;
	}
	this.buttons[this.selectedButton].isSelected = true;
	console.log(this.selectedButton);
}

function canvasButton(f, width, height, posX, posY, text, isSelected){
	this.isSelected = isSelected;
	this.text = text;
	this.height = height;
	this.width = width;
	this.x = posX;
	this.y = posY;
}