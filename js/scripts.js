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

var players = [];
function init()
{
	player = new Player(20, 50, 'blue');
	players.push(player);
	players.push(new Player(200, 50, 'green'));

	initCanvas();
	initKeyListener();

	setInterval('update()', 20);
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
	drawCharacters();
	drawEnemies();
	drawProjectiles();
	drawFps();
}

function update(){
	projectiles.forEach(function(p){
		p.update();
	});
	collisionDetector();
	draw();
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

function drawCharacters(){
	for(var i=0; i<players.length; i++){
		var p = players[i];
		
		ctx.drawImage(
			p.getSprite(),
			p.getSpritePosition(),
			0,
			p.width,
			p.height,
			p.x,
			p.y,
			p.width,
			p.height
		);
	}
}


function drawFps(){
//TODO	
}


var fallspeed = 0;
function doGravity() {
	players.forEach(function(p){
		if(p.gravity){
			if(!isStandingOnGround(p)){
				p.isAirborne = true;
				fallspeed += gravity;
				p.y += 1;
			}
			else{
				p.isAirborne = false;
			}
		}
	});
}

function isStandingOnGround(p)
{
	if(p!==undefined){
		if(p.y+p.height == wall.y){
			if(p.x <= wall.width){
				return true;
			}
		}
		return false;
	}
	return true;
}


function collisionDetector()
{
	// checks for projectile hits
	projectiles.forEach(function(bullet){
		players.forEach(function(p){
			if(collides(bullet, p)){
				p.hit(2);
				destroyProjectile(bullet);
				updateHeathBars();
			}
		});
	});
}

// source: http://www.html5rocks.com/en/tutorials/canvas/notearsgame/#toc-collision-detection
function collides(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}


function moveLeft()
{
	player.walksRight = false;
	if(player.x>=0){
		player.x -= player.moveSpeed;
	}
	if(!player.animating && !player.isAirborne){
		startAnimation();
	}
}

var jumpInterval;
var currentJumpHeight;
function jump(){
	if(!player.isAirborne){
		player.isAirborne = true;
		player.gravity = false;
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

function enablePlayerGravity(){
	player.gravity = true;
}

function moveRight()
{
	player.walksRight = true;
	
	// TODO
	if(player.x<=500-player.width){
		player.x += player.moveSpeed;
	}
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

var projectiles = [];
var projectileInverval;
var destoyProjectileInterval;

function fire(){

	window.clearInterval(projectileInverval);
	player.shoot();

	// Create projectile
	projectiles.push(new Projectile(player, 0, 1));
}

function drawProjectiles(){
	ctx.fillStyle = 'rgb(255,0,0)';
	projectiles.forEach(function(p){
		ctx.fillRect(p.x, p.y, p.width, p.height);
	});
}

function updateHeathBars(){
	//TODO
	$('#temphealth').text(players[1].health);
}

function destroyProjectile(proj){
	proj.active = false;
	
	projectiles = projectiles.filter(function(p){
		if(p.active){
			return p;
		}
	});
}


function destroyPlayer(p){
	p.active = false;
	p.update();
	respawnCountdown(p, 3);
}

var cnt;
function respawnCountdown(p, s){
	//-----
	$('#tempcountdown').text(s);
	//-----

	window.clearInterval(cnt);
	if(s>0){
		cnt = setInterval(function(){
			respawnCountdown(p, s-1);
		}, 1000);
	}
	else{
		respawnPlayer(p);
	}
}

function respawnPlayer(p){
	p.respawn(200,50);
}