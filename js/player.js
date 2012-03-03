function Player(startx, starty){
	this.height = 24; // Height in pixels
	this.width = 24;  // Width in pixels

	this.walksRight = true;

	this.walkRightSpriteImage = new Image();
	this.walkLeftSpriteImage = new Image();
	this.jumpRightSpriteImage = new Image();
	this.jumpLeftSpriteImage = new Image();

	this.tempWalkRightShootingSpriteImage = new Image();
	this.tempWalkLeftShootingSpriteImage = new Image();
	this.tempWalkRightShootingSpriteImage.src = '../img/shootingTempRight.gif';
	this.tempWalkLeftShootingSpriteImage.src = '../img/shootingTempLeft.gif';

	this.walkRightSpriteImage.src = '../img/walkRight.gif';
	this.walkLeftSpriteImage.src = '../img/walkLeft.gif';
	this.jumpRightSpriteImage.src = '../img/jumpRight.gif';
	this.jumpLeftSpriteImage.src = '../img/jumpLeft.gif';

	this.animCycle = 0;
	this.animating = false;

	this.resourcesLoaded = false;

	this.isAirborne = false;
	this.isShooting = false;
	this.jumpHeight = 50;

	this.moveSpeed = 2;

	this.gravity = true;
	this.isShooting = false;

	this.x = startx;
	this.y = starty;

	this.health = 10;

	this.weapon = 'dummy';
}

Player.prototype.loadResources = function(){
	
}

Player.prototype.getSprite = function(){
	if(this.walksRight){
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

Player.prototype.hit = function(damage){

}