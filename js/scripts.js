var canvas;
var ctx;
var gravity = 5;
var player;

// player() = {
// 	height: 24, // Height in pixels
// 	width: 24,  // Width in pixels

// 	walksRight: true,

// 	walkRightSprite: '../img/walkRight.gif',
// 	walkLeftSprite: '../img/walkLeft.gif',
// 	jumpRightSprite: '../img/jumpRight.gif',
// 	jumpLeftSprite: '../img/jumpLeft.gif',

// 	animCycle: 0,
// 	animating: false,

// 	resourcesLoaded: false,

// 	isAirborne: false,
// 	jumpHeight: 50,

// 	moveSpeed: 2,

// 	gravity: true,
// };
wall = {};
enemy = {};


function init()
{
	player = new Player();
	player.loadResources();

	initCanvas();
	initKeyListener();

	// STARTPOS
	player.x = 20;
	player.y = 50;

	wall.x = 0;
	wall.y = 100;
	wall.width = 400;
	wall.height = 10;
	wall.isHazard = false;

	// enemy.x = 20;
	// enemy.y = 80;
	// enemy.width = 10;
	// enemy.height = 20;
	// enemy.isHazard = true;

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
		player.width*player.animCycle,
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
//		console.log("fall down damn you!");
		fallspeed += gravity;
		player.y += 1;
	}
	}
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

	player.test;
}

function isStandingOnGround()
{
	if(player.y+player.height == wall.y){
		if(player.x <= wall.width){
			player.isAirborne = false;
			if(!player.animating && player.walking){
				startAnimation();
			}
			return true;
		}
	}
	player.isAirborne = true;
	stopAnimation();
	return false;
}

var jumpInterval;
var currentJumpHeight;
function jump(){
	if(!player.isAirborne){
	disablePlayerGravity();
	currentJumpHeight = 0;
	if(isStandingOnGround()) {
		jumpInterval = setInterval('moveUp()', 1);
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
	if(!player.isAirborne){
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
	else
	{
		animCycle = 0;
	}
	}
	else{
		animCycle = 0;
	}
}



function stopAnimation(){
	console.log("stopping animation");
	window.clearInterval(animInterval);	
	player.animCycle = 0;
	player.animating = false;
}

function goLeft(){
	stopWalking();
	startWalking('L');
	startAnimation();
}

function goRight(){
	stopWalking();
	startWalking('R');
	startAnimation();
}