var canvas;
var ctx;
var gravity = 5;
var player;

var players = [];
var map;
function init()
{
	player = new Player(20, 50, 'blue');
	players.push(player);
	players.push(new Player(200, 50, 'green'));

	initCanvas();
	initKeyListener();

	map = new Map();

	setInterval('update()', 20);
	setInterval('doGravity()', 5);

	setTimeout(function(){
		powerups.push(new PowerUpProjectileSpeed(480,49));
	}, 500);
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
	drawMap();
	drawPlayers();
	drawProjectiles();
	drawPowerups();
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
	ctx.fillStyle = map.bgColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
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
		return wallCollisionDetector(p);

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
	players.forEach(function(p){
		// checks for projectile hits
		projectiles.forEach(function(bullet){
			if(collides(bullet, p)){
				p.hit(player.weapon.damage);
				bullet.destroy();
				updateHeathBars();
			}
		});

		// checks for power up pickups
		powerups.forEach(function(powerup){
			if(collides(powerup, p)){
				powerup.applyEffect(p);
				destroyPowerUp(powerup);
			}
		})
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

	if(!wallSideCollisionDetector(player)){
		if(player.x>=0){
			player.x -= player.moveSpeed;
		}
	}
	else{
		player.x +=2;
	}
	if(!player.animating && !player.isAirborne){
		startAnimation();
	}
}

function moveRight()
{
	player.walksRight = true;
	
	// TODO
	if(!wallSideCollisionDetector(player))
	{
		if(player.x<=500-player.width){
			player.x += player.moveSpeed;
		}
	}
	else{
		player.x -= 2;
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
	if(!keyDownObj.up || currentJumpHeight>=player.jumpHeight || wallCollisionDetector(player)){
		window.clearInterval(jumpInterval);
		currentJumpHeight = 0;
		enablePlayerGravity();
	}
}

function enablePlayerGravity(){
	player.gravity = true;
}



function moveDown()
{
	
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
	if(player.weapon.isReady){
		player.shoot();

		// Create projectile	
		projectiles.push(new Projectile(player, player.weapon));
	}
}

function drawProjectiles(){

	// arc(x, y, radius, startAngle, endAngle, anticlockwise)


	projectiles.forEach(function(p){
		ctx.fillStyle = 'rgb(0,0,0)';
		ctx.beginPath();
		ctx.arc(p.x, p.y, 3, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();

		ctx.fillStyle = '#eee9e9';
		ctx.beginPath();
		ctx.arc(p.x, p.y, 2, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
	});


	// ctx.fillStyle = 'rgb(255,0,0)';
	// projectiles.forEach(function(p){
	// 	ctx.fillRect(p.x, p.y, p.width, p.height);
	// });
}

function updateHeathBars(){
	//TODO
	$('#temphealth').text(players[1].health);
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