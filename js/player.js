function Player(startx, starty, color, playerid){
	this.pid = playerid;
	this.active = true;

	this.color = color;

	// TODO
	this.hitboxWidth = 32;
	this.hitboxHeight = 32;

	this.height = 32; // Height in pixels
	this.width = 32;  // Width in pixels

	this.walksRight = true;


	this.blankSprite = new Image();
	this.blankSprite.src = '../img/blank.gif';

	this.damageRightSpriteImage = new Image();
	this.damageLeftSpriteImage = new Image();
	this.damageRightSpriteImage.src = '../img/damageRight.gif';
	this.damageLeftSpriteImage.src = '../img/damageLeft.gif';

	this.introLeftAnimationSpriteImage = new Image();
	this.introRightAnimationSpriteImage = new Image();
	this.introLeftAnimationSpriteImage.src = '../img/introLeft.gif';
	this.introRightAnimationSpriteImage.src = '../img/introRight.gif';

	this.jumpRightSpriteImage = new Image();
	this.jumpLeftSpriteImage = new Image();
	this.jumpRightSpriteImage.src = '../img/jumpRight.gif';
	this.jumpLeftSpriteImage.src = '../img/jumpLeft.gif';

	this.walkRightSpriteImage = new Image();
	this.walkLeftSpriteImage = new Image();
	this.walkRightSpriteImage.src = '../img/walkRight.gif';
	this.walkLeftSpriteImage.src = '../img/walkLeft.gif';

	this.walkRightShootingSpriteImage = new Image();
	this.walkLeftShootingSpriteImage = new Image();
	this.walkRightShootingSpriteImage.src = '../img/walkShootRight.gif';
	this.walkLeftShootingSpriteImage.src = '../img/walkShootLeft.gif';

	this.animCycle = 0;
	this.introAnimCycle = 0;
	this.animating = false;

	this.resourcesLoaded = false;

	this.isAirborne = false;
	this.isShooting = false;
	this.jumpHeight = 60;
	this.isHit = false;

	this.moveSpeed = 2;

	this.gravity = true;
	this.isShooting = false;

	this.x = startx;
	this.y = starty;

	this.fireRate = 0;

	this.startingHealth = 10;
	this.health = this.startingHealth;

	this.weapon = new WeaponMegaBlaster();

	this.playIntro = false;
	this.playDeath = false;

	this.damageTimeout;
	this.damagedPlayer;

	this.flickerTimer = 0;
}


Player.prototype.update = function(){
	if(this.active){
		this.height = this.hitboxHeight;
		this.width = this.hitboxWidth;
	}
	else{
		this.x = 0;
		this.y = 0;
		this.height = 0;
		this.width = 0;
	}
}

//---------------
// Draw function
//---------------
function drawPlayers(){
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

var introAnimInterval;
function playIntroAnimation(p){
	console.log("playing animation");
	if(!p.playIntro){
		p.playIntro = true;
		i<ntroAnimInterval = setInterval(function(){
			playIntroAnimation(p);
		}, 400);
	}
	if(p.playIntro){
		if(p.introAnimCycle<4){
			p.introAnimCycle += 1;
		}
		else{
			window.clearInterval(introAnimInterval);
			p.playIntro = false;
		}
	}
}


// Bug: does not return jump left shoot sprite correctly

// var flickerTimer = 0;
Player.prototype.getSprite = function(){
	if(this.playIntro){
		if(this.walksRight){
			return this.introRightAnimationSpriteImage;
		}
		else{
			return this.introLeftAnimationSpriteImage;
		}
	}
	if(this.playDeath){
		//TODO
	}

	if(this.walksRight){
		if(this.isHit){
			if(this.flickerTimer==1){
				this.flickerTimer=0;
				return this.damageRightSpriteImage;
			}
			else{
				this.flickerTimer+=1;
				return this.blankSprite;
			}
		}
		if(this.isAirborne){
			return this.jumpRightSpriteImage;
		}
		if(this.isShooting){
			return this.walkRightShootingSpriteImage;
		}
		return this.walkRightSpriteImage;
	}
	else {
		if(this.isHit){
			return this.damageLeftSpriteImage;
		}
		if(this.isAirborne){
			return this.jumpLeftSpriteImage;
		}
		if(this.isShooting){
			return this.walkLeftShootingSpriteImage;
		}
		return this.walkLeftSpriteImage;
	}
}

Player.prototype.getSpritePosition = function(){
	if(this.playIntro){
		return this.width*this.introAnimCycle;
	}
	if(this.isAirborne){
		if(this.isShooting){
			return this.width*2;
		}
		else{
			return 0;
		}
	}
	if(this.animating){
		return this.width*this.animCycle;
	}
	else{
		return 0;
	}
}


// Todo: behold - the reason being hit by projectiles craps up the animation.
var damageStack = [];
Player.prototype.hit = function(damage){
	if(!this.isHit){
		socket.emit('player_hit', {pid: this.pid, damage: damage});
		this.isHit = true;
		this.health -= damage;
		// if(this.health<=0){
		// 	this.destroy();
		// }
		// this.damagedPlayer = players[this.pid];
		damageStack.push(this.pid);
		window.clearTimeout(this.damageTimeout);
		
		this.damageTimeout = setTimeout(function(){
			players[damageStack[0]].isHit = false;
			damageStack = damageStack.slice(1);
		}, 1000);
	}
}

Player.prototype.destroy = function(){
	// trigger animation

	// schedule respawn
	// socket.emit('player_killed', {pid: this.pid, action: 0});
	destroyPlayer(this);
}

Player.prototype.respawn = function(x, y){
	this.active = true;
	this.health = this.startingHealth;
	this.x = x;
	this.y = y;
	this.update();
}

var stopShootingTimeout;
var weaponCooldownTimeout;

Player.prototype.shoot = function(){
	window.clearTimeout(weaponCooldownTimeout);
	this.weapon.isReady = false;
	weaponCooldownTimeout = setTimeout(function(){
		player.weapon.isReady = true;
	}, this.weapon.cooldown);


	window.clearTimeout(stopShootingTimeout);
	this.isShooting = true;
	stopShootingTimeout = setTimeout(function(){
		player.isShooting = false;
	}, 400);
}

function updatePlayer(p, newx, newy)
{
	var pl = players[p];

	if(pl.x<newx){
		pl.walksRight = true;
	}
	else if(pl.x>newx){
		pl.walksRight = false;
	}

	pl.x = newx;
	pl.y = newy;
}