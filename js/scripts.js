var canvas;
var ctx;
var gravity = 5;

player = {
	height: 24, // Height in pixels
	width: 24,  // Width in pixels

	walksRight: true,

	walkRightSprite: '../img/walkRight.gif',
	walkLeftSprite: '../img/walkLeft.gif',
	jumpRightSprite: '../img/jumpRight.gif',
	jumpLeftSprite: '../img/jumpLeft.gif',

	animCycle: 0,
	animating: false,

	resourcesLoaded: false,

	isAirborne: false,
	jumpHeight: 40,

	// getSprite: function(){
	// 	if(player.walksRight){
	// 		return walkRightSprite;
	// 	}
	// 	else{
	// 		return walkLeftSprite;
	// 	}
	// },

	// reverseWalkingDirection: function(){
	// 	walksRight = !walksRight;
	// },
};
wall = {};

enemy = {};

var imgPlayerSpriteRight;
var imgPlayerSpriteLeft;

function loadResources(){
	imgPlayerSpriteRight = new Image();
	imgPlayerSpriteLeft = new Image();
	imgPlayerJumpRightSprite = new Image();
	imgPlayerJumpLeftSprite = new Image();

	imgPlayerSpriteRight.src = player.walkRightSprite;
	imgPlayerSpriteLeft.src = player.walkLeftSprite;
	imgPlayerJumpRightSprite.src = player.jumpRightSprite;
	imgPlayerJumpLeftSprite.src = player.jumpLeftSprite;

	imgPlayerJumpLeftSprite.onload = function(){
		player.resourcesLoaded = true;
	};
}

function init()
{
	loadResources();

	initCanvas();
	initKeyListener();

	// STARTPOS
	player.x = 20;
	player.y = 10;

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
	doGravity();
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
	var sprite;
	if(player.isAirborne){
		sprite = imgPlayerJumpRightSprite;
	}
	else if(player.walksRight){
		sprite = imgPlayerSpriteRight;
	}
	else
	{
		sprite = imgPlayerSpriteLeft;
	}
		// drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
		ctx.drawImage(
			sprite,
			player.width*player.animCycle,
			0,
			player.width,
			player.height,
			player.x,
			player.y,
			player.width,
			player.height
		);
	// }

	
}


var fallspeed = 0;
function doGravity() {
	if(!isStandingOnGround()){
//		console.log("fall down damn you!");
		fallspeed += gravity;
		player.y += 2;
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
	player.x -= 2;
}

function isStandingOnGround()
{
	if(player.y+player.height == wall.y){
		if(player.x <= wall.width){
			player.isAirborne = false;
			return true;
		}
	}
	player.isAirborne = true;
	return false;
}

function moveUp()
{
	// Can only jump with solid ground beneath feet
	if(isStandingOnGround()) {
		player.y -= 40;
	}
}

function moveRight()
{
	player.walksRight = true;
	player.x += 2;
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
	if(!player.animating)
	{
		console.log("starting animation");
		player.animating = true;
		animInterval = setInterval('startAnimation()', 150);
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

function jump(){
	moveUp();
}

function stopAnimation(){
	console.log("stopping animation");
	window.clearInterval(animInterval);	
	player.animCycle = 0;
	player.animating = false;
}