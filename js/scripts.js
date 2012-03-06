var canvas;
var ctx;
var gravity = 5;
var player;

var players = [];
var map;
function init()
{

	socket.emit('client_ready', {});

	initCanvas();
	initKeyListener();

	//TEMP

	map = new Map();


	// player = new Player(20, 50, 'blue', 0);
	// players.push(player);
	// players.push(new Player(200, 50, 'green', 1));

	// players.forEach(function(p){
	// 	playIntroAnimation(p);
	// });

	setInterval('update()', 20);
	setInterval('doGravity()', 5);

	// setTimeout(function(){
	// 	powerups.push(new PowerUpProjectileSpeed(480,10));
	// }, 2000);

}

function initPlayer(data){
	player = new Player(data.xpos, data.ypos, 'blue', data.pid);
	players[data.pid] = player;
}

function initOpponent(data){
	players[data.pid] = new Player(data.xpos, data.ypos, 'green', data.pid);
}

function updatePlayerPosition(){
	socket.emit('update_player_position', {
		pid: player.pid,
		xpos: player.x,
		ypos: player.y
	});
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
	// drawServerMenu();
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

function drawServerMenu(){
	if(servermenu.active){
		ctx.fillStyle = 'rgb(255,255,255)';
		ctx.fillRect(100,100,servermenu.width, servermenu.height);


		for(var i=0; i<servers.length; i++){
			var s = servers[i];
			if(servermenu.selectedServer==i){
				ctx.fillStyle = 'rgb(255,0,0)';
			}
			else{
				ctx.fillStyle = 'rgb(0,0,0)'
			}
			ctx.fillRect(100, 100+(100*i), servermenu.width, 100);
		}
	}
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
	powerups.forEach(function(p){
		if(!isStandingOnGround(p)){
			p.y += 1;
		}
	});
}

function isStandingOnGround(p)
{
	if(p!==undefined){
		return wallCollisionDetector(p);

		// if(p.y+p.height == wall.y){
		// 	if(p.x <= wall.width){
		// 		return true;
		// 	}
		// }
		// return false;
	}
	return true;
}


function collisionDetector()
{
	players.forEach(function(p){
		// checks for projectile hits
		projectiles.forEach(function(bullet){
			if(collides(p, bullet, 0, 0)){
				p.hit(player.weapon.damage);
				bullet.destroy();
				updateHeathBars();
			}
		});

		// checks for power up pickups
		powerups.forEach(function(powerup){
			if(collides(p, powerup, 0, 0)){
				powerup.applyEffect(p);
				destroyPowerUp(powerup);
			}
		})
	});
}

// source: http://www.html5rocks.com/en/tutorials/canvas/notearsgame/#toc-collision-detection
// function collides(a, b) {
//   return a.x < b.x + b.width &&
//          a.x + a.width > b.x &&
//          a.y < b.y + b.height &&
//          a.y + a.height > b.y;
// }

function collides(a, b, offsetX, offsetY) {
  	return a.x+offsetX < b.x + b.width &&
         a.x+offsetX + a.width > b.x &&
         a.y+offsetY < b.y + b.height &&
         a.y+offsetY + a.height > b.y;
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
		//player.x +=2;
	}
	if(!player.animating && !player.isAirborne){
		startAnimation();
	}

	updatePlayerPosition();
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
		//player.x -= 2;
	}
	if(!player.animating && !player.isAirborne){
		startAnimation();
	}

	updatePlayerPosition();
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
	updatePlayerPosition();
}

function enablePlayerGravity(){
	player.gravity = true;
}



function moveDown()
{
	if(servermenu.selectedServer>=1){
		servermenu.selectedServer = 0;
	}
	else{
		servermenu.selectedServer += 1;
	}
	console.log(servermenu.selectedServer);
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
		var proj = new Projectile(player);
		projectiles.push(proj);

		socket.emit('shoot', {
			pid: player.pid,
      		startPosX: proj.startPosX, 
      		startPosY: proj.startPosY, 
      		velocity: proj.moveSpeed, 
      		travelLength: proj.travelDistance, 
      		damage: proj.damage
		});
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
	// respawnCountdown(p, 3);
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