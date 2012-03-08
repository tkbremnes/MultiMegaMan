var canvas;
var ctx;
var gravity = 5;
var player;

var players = [];
var map;

var lifeBarSpriteImage;
var menuMode;
var menu;
var menuInterval;

var targetFps = 30;

// Gravity related variables
var gravityUpdateInterval = targetFps*2;
var gravityConstant = 7.5/gravityUpdateInterval; // in MM2, Rock falls at 7.5p/s/s

var collisionDetectorInterval = gravityUpdateInterval; // needs to run at least as often

function init()
{
	lifeBarSpriteImage = new Image();
	lifeBarSpriteImage.src = '../img/lifeBar.gif';
	initSoundEffects();

	socket.emit('client_ready', {});

	initCanvas();
	initKeyListener();

	initIntroMenu();
	menuMode = true;

	menuInterval = window.setInterval(function(){
		drawIntroMenu();
	}, 1000/targetFps);

	//DEBUG
	// startGame();
}

//------------------------------
// SOUND
//
// http://www.html5rocks.com/en/tutorials/webaudio/intro/
//------------------------------

function initSoundEffects(){
	bufferReader(soundEffects['4']);
	bufferReader(soundEffects['10']);
	bufferReader(soundEffects['9']);
	bufferReader(soundEffects['14']);
	bufferReader(soundEffects['25']);
}
function onError(error){
	console.log("error");
}

function bufferReader(sfx){
	var request = new XMLHttpRequest();
  	request.open('GET', sfx.url, true);
  	request.responseType = 'arraybuffer';

  	request.onload = function() {
    audioContext.decodeAudioData(request.response, function(buffer) {
    	sfx.buffer = buffer;
    	}, onError);
  	}
  	request.send();
}

// var selectSoundBuffer = null;
var audioContext = new webkitAudioContext();

function playSound(buffer) {
	var source = audioContext.createBufferSource(); // creates a sound source
	source.buffer = buffer;                    		// tell the source which sound to play
	source.connect(audioContext.destination);       // connect the source to the context's destination (the speakers)
	source.noteOn(0);                          		// play the source now
}
//------------------------------

function initIntroMenu(){
	menu = new IntroMenu();
}
function drawIntroMenu(){
	ctx.fillStyle = 'rgb(0,0,0)';
	ctx.fillRect(0, 0, 512, 512);
	// ctx.fillStyle = 'rgb(255,255,255)';
	// ctx.font = '8px monospace';
	// ctx.fillText(menu.introMessage, 0, 0);
	menu.buttons.forEach(function(b){
		if(b.isSelected){
			ctx.fillStyle = 'rgb(255,255,0)';
		}
		else{
			ctx.fillStyle = 'rgb(255,0,0)';
		}
		ctx.fillRect(b.x, b.y, b.width, b.height);
	});
}

function startGame(){
	playSound(soundEffects['25'].buffer);
	menuMode = false;
	window.clearInterval(menuInterval);
	map = new Map();
	setInterval('update()', 1000/gravityUpdateInterval);
	setInterval('draw()', 1000/targetFps);
	setInterval('doGravity()', 1000/gravityUpdateInterval);
	setInterval('collisionDetector();', 1000/collisionDetectorInterval);

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
	drawLifeBars();

	//DEBUG
	drawFps();
	// drawServerMenu();
}

function update(){
	projectiles.forEach(function(p){
		p.update();
	});
}

function refreshScreen(){
	ctx.fillStyle = map.bgColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawLifeBars(){
	// TODO
	for(var i=0; i<players.length; i++){
		var xPos, yPos;
		switch(i){
			case 0:
				xPos = 10;
				yPos = 10;
				break;
			case 1:
				xPos = 494;
				yPos = 10;
				break;
			case 2:
				xPos = 10;
				yPos = 446;
				break;
			case 3:
				xPos = 494;
				yPos = 446;
				break;
		}
		ctx.fillStyle = 'rgb(0,0,0)';
		ctx.fillRect(xPos,yPos,8,56);
		
		for(var j=0; j<(players[i].health)*2; j+=2){
			ctx.drawImage(
				lifeBarSpriteImage,
				0,
				0,
				8,
				2,
				xPos,
				56+(yPos -j),
				8,
				2
			);
		}
	}
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

function doGravity() {
	players.forEach(function(p){
		p.doGravity();
	});
}

function isStandingOnGround(p)
{
	if(p!==undefined){
		return wallBottomCollisionDetector(p);
	}
	return true;
}


function collisionDetector()
{
	players.forEach(function(p){
		// checks for projectile hits
		projectiles.forEach(function(bullet){
			if(collides(p, bullet, 0, 0)){
				var direction;
				if(bullet.vecX>0){
					direction = 'R';
				}
				else{
					direction = 'L';
				}
				p.hit(player.weapon.damage, direction);
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
		if(player.x>=10){
			player.x -= player.moveSpeed;
			player.x = Math.round(player.x);
		}
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
			player.x = Math.round(player.x);
		}
	}
	if(!player.animating && !player.isAirborne){
		startAnimation();
	}

	updatePlayerPosition();
}

function moveUp()
{
	if(!wallTopCollisonDetector(player)){
		player.y -= 2;
		currentJumpHeight += 2;
		if(!keyDownObj.jump || currentJumpHeight>=player.jumpHeight || wallCollisionDetector(player)){
			window.clearInterval(jumpInterval);
			currentJumpHeight = 0;
			enablePlayerGravity();
		}
		updatePlayerPosition();
	}
	else{
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
	if(menuMode){
		menu.moveDown();
	}
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
		walkInterval = setInterval(dir, 1000/targetFps);
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
		playSound(soundEffects['4'].buffer);
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
	p.active = true;
	p.fallSpeed = 0;
	p.respawn(200,0);
}
