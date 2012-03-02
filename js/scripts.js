var canvas;
var ctx;
var gravity = 5;
var player;

wall = {
	x: 0,
	y: 100,
	width: 400,
	height: 10,
	isHazard: false
};

enemy = {
	// x: 20,
	// y: 80,
	// width: 10,
	// height: 20,
	// isHazard: true
};


function init()
{
	player = new Player();

	initCanvas();
	initKeyListener();

	setInterval('draw()', 20);
	setInterval('doGravity()', 5);
}



function initCanvas()
{
	canvas = document.querySelector('canvas');
	ctx = canvas.getContext('2d');
	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw()
{
	refreshScreen();
	drawEnvironment();
	drawCharacter();
	drawEnemies();
	collisionDetector();
	drawFps();
}

function refreshScreen(){
	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}


var tempint = 10;
function drawEnvironment(){
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
}

var tempXdir = 1;
var tempYdir = 1;

function drawCharacter(){
	ctx.drawImage(
		player.getSprite(),
		player.getSpritePosition(),
		0,
		player.width,
		player.height,
		player.x,
		player.y,
		player.width,
		player.height
	);
}

var fallspeed = 0;
function doGravity() {
	if(player.gravity){
		if(!isStandingOnGround()){
			player.isAirborne = true;
			fallspeed += gravity;
			player.y += 1;
		}
		else{
			player.isAirborne = false;
		}
	}
	// if(player.isAirborne)
	// {
	// 	stopAnimation();
	// }
	// else if(player.walking && !player.animating)
	// {
	// 	startAnimation();
	// }
}

function collisionDetector()
{
	if(enemy.isHazard && ((enemy.x + enemy.width == player.x) || (enemy.x== player.x+player.width)))
	{
		playerDie();
	}
	if(player.x == enemy.x && player.y+player.height == enemy.y){
		console.log("killing enemy")
		enemyDie(enemy);
	}
}

function drawFps(){
	
}

function moveLeft()
{
	player.walksRight = false;
	player.x -= player.moveSpeed;
	if(!player.animating && !player.isAirborne){
		startAnimation();
	}
}

function isStandingOnGround()
{
	if(player.y+player.height == wall.y){
		if(player.x <= wall.width){
			return true;
		}
	}
	return false;
}

var jumpInterval;
var currentJumpHeight;
function jump(){
	if(!player.isAirborne){
		player.isAirborne = true;
		disablePlayerGravity();
		currentJumpHeight = 0;
		
		if(isStandingOnGround()) {
			jumpInterval = setInterval('moveUp()', 2);
		}
	}
}

function moveUp()
{
	player.y -= 2;
	currentJumpHeight += 2;
	if(!keyDownObj.up || currentJumpHeight>=player.jumpHeight){
		window.clearInterval(jumpInterval);
		currentJumpHeight = 0;
		enablePlayerGravity();
	}
}

function disablePlayerGravity(){
	player.gravity = false;
}

function enablePlayerGravity(){
	player.gravity = true;
}

function moveRight()
{
	player.walksRight = true;
	player.x += player.moveSpeed;
	if(!player.animating && !player.isAirborne){
		startAnimation();
	}
}

function moveDown()
{
	
}

function drawEnemies()
{
	ctx.fillStyle = 'rgb(255, 0, 0)';
	ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

function playerDie()
{
	console.log("you were maimed");
}

function  enemyDie(enm)
{
	console.log("deleting enemy");
	enm.width = 0;
	enm.height = 0;
	enm.x = 0;
	enm.y = 0;
	player.y -= 30;
}

var animInterval;
var walkInterval;

function startWalking(direction){
	var dir;
	if(direction == 'R')
	{
		dir = 'moveRight()';
	}
	else if(direction == 'L')
	{
		dir = 'moveLeft()';
	}

	if(!player.walking)
	{
		player.walking = true;
		walkInterval = setInterval(dir, 15);
	}
}
function stopWalking(){
	window.clearInterval(walkInterval);
	player.walking = false;
}

function startAnimation(){
	if(player.isAirborne){
		stopAnimation();
	}
	else{
		if(!player.animating)
		{
			animInterval = setInterval('startAnimation()', 150);
			player.animating = true;
		}

		player.animCycle += 1;

		if(player.animCycle==4)
		{
			player.animCycle = 1;
		}
	}
}


function stopAnimation(){
	window.clearInterval(animInterval);	
	player.animCycle = 0;
	player.animating = false;
}

var goingLeft;
function goLeft(){
	startWalking('L');
	startAnimation();
}

var goingRight;
function goRight(){
	startWalking('R');
	startAnimation();
}