function Player(startx, starty, color){
	this.active = true;

	this.color = color;

	this.hitboxWidth = 24;
	this.hitboxHeight = 24;

	this.height = 24; // Height in pixels
	this.width = 24;  // Width in pixels

	this.walksRight = true;

	this.walkRightSpriteImage = new Image();
	this.walkLeftSpriteImage = new Image();
	this.jumpRightSpriteImage = new Image();
	this.jumpLeftSpriteImage = new Image();
	this.damageRightSpriteImage = new Image();
	this.damageLeftSpriteImage = new Image();
	this.blankSprite = new Image();

	this.tempWalkRightShootingSpriteImage = new Image();
	this.tempWalkLeftShootingSpriteImage = new Image();
	this.tempWalkRightShootingSpriteImage.src = '../img/shootingTempRight.gif';
	this.tempWalkLeftShootingSpriteImage.src = '../img/shootingTempLeft.gif';

	this.walkRightSpriteImage.src = '../img/walkRight.gif';
	this.walkLeftSpriteImage.src = '../img/walkLeft.gif';
	this.jumpRightSpriteImage.src = '../img/jumpRight.gif';
	this.jumpLeftSpriteImage.src = '../img/jumpLeft.gif';
	
	this.damageRightSpriteImage.src = '../img/damageRight.gif';
	this.damageLeftSpriteImage.src = '../img/damageLeft.gif';

	this.blankSprite.src = '../img/blank.gif';

	this.animCycle = 0;
	this.animating = false;

	this.resourcesLoaded = false;

	this.isAirborne = false;
	this.isShooting = false;
	this.jumpHeight = 50;
	this.isHit = false;

	this.moveSpeed = 2;

	this.gravity = true;
	this.isShooting = false;

	this.x = startx;
	this.y = starty;

	this.shadowY = starty;

	this.startingHealth = 10;
	this.health = this.startingHealth;

	this.weapon = new WeaponMegaBlaster();
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

var flickerTimer = 0;
Player.prototype.getSprite = function(){
	if(this.walksRight){
		if(this.isHit){
			if(flickerTimer==1){
				flickerTimer=0;
				return this.damageRightSpriteImage;
			}
			else{
				flickerTimer+=1;
				return this.blankSprite;
			}
		}
		if(this.isAirborne){
			if(this.isShooting){
				// TODO
			}
			else
			{
				return this.jumpRightSpriteImage;
			}
		}
		if(this.isShooting){
			// TODO
			return this.tempWalkRightShootingSpriteImage;
		}
		return this.walkRightSpriteImage;
	}
	else {
		if(this.isHit){
			return this.damageLeftSpriteImage;
		}
		if(this.isAirborne){
			if(this.isShooting){
				// TODO
			}
			else
			{
				return this.jumpLeftSpriteImage;
			}
		}
		if(this.isShooting){
			// TODO
			return this.tempWalkLeftShootingSpriteImage;
		}
		return this.walkLeftSpriteImage;
	}
}

Player.prototype.getSpritePosition = function(){
	if(this.isAirborne || this.isShooting){
		return 0;
	}
	if(this.animating){
		return this.width*this.animCycle;
	}
	else{
		return 0;
	}
}

Player.prototype.fireWeapon = function(){

}


var damageTimeout;
Player.prototype.hit = function(damage){
	if(!this.isHit){
		this.isHit = true;
		this.health -= damage;
		if(this.health<=0){
			this.destroy();
		}

		window.clearTimeout(damageTimeout);
		damageTimeout = setTimeout(function(){
			players[1].isHit = false;
		}, 400);
	}
}

Player.prototype.destroy = function(){
	// trigger animation

	// schedule respawn
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