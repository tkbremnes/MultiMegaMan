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

	var options = function(){
		console.log("hello world");
	}
	var start = function(){
		startGame();
	}

	this.startButton = new canvasButton(start, 100, 50, 200, 300, "Start game", true);
	this.dummyButton = new canvasButton(options, 100, 50, 200, 400, "Do nothing", false);

	this.buttons = [this.startButton, this.dummyButton];
	this.selectedButton = 0;
}

IntroMenu.prototype.getButtons = function() {
	return this.buttons;
};

IntroMenu.prototype.pushButton = function(){

	this.buttons[this.selectedButton].f();
}

IntroMenu.prototype.moveDown = function(){

	this.buttons[this.selectedButton].isSelected = false;
	this.selectedButton += 1;
	if(this.selectedButton>=this.buttons.length){
		this.selectedButton = 0;
	}
	this.buttons[this.selectedButton].isSelected = true;

	if(soundEffects['14'].buffer!=null){
		playSound(soundEffects['14'].buffer);
	}
	
}

IntroMenu.prototype.moveUp = function(){

	this.buttons[this.selectedButton].isSelected = false;
	this.selectedButton -= 1;
	if(this.selectedButton<0){
		this.selectedButton = this.buttons.length-1;
	}
	this.buttons[this.selectedButton].isSelected = true;

	if(soundEffects['14'].buffer!=null){
		playSound(soundEffects['14'].buffer);
	}
	
}

function canvasButton(f, width, height, posX, posY, text, isSelected){
	this.isSelected = isSelected;
	this.text = text;
	this.height = height;
	this.width = width;
	this.x = posX;
	this.y = posY;
	this.f = f;
}

var introMusic;
function initIntroMenu(){
	menu = new IntroMenu();

	introMusic = document.createElement('audio');
	introMusic.setAttribute('src', bgMusic['0'].url);
	introMusic.play();
}
function drawIntroMenu(){
	ctx.fillStyle = 'rgb(0,0,0)';
	ctx.fillRect(0, 0, 512, 512);
	menu.buttons.forEach(function(b){
		ctx.fillStyle = 'rgb(255,255,255)';
		if(b.isSelected){
			ctx.fillRect(b.x-40, b.y, 20, 20);
		}
		// else{
		// 	ctx.fillStyle = 'rgb(255,0,0)';
		// }
		// ctx.fillRect(b.x, b.y, b.width, b.height);

		ctx.fillStyle = 'rgb(255,255,255)';
		ctx.font = '20px monospace';
		ctx.fillText(b.text, b.x, b.y+15);
	});
}