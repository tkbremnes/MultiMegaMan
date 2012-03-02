function Player(){
	this.height = 24; // Height in pixels
	this.width = 24;  // Width in pixels

	this.walksRight = true;

	this.walkRightSprite = '../img/walkRight.gif';
	this.walkLeftSprite = '../img/walkLeft.gif';
	this.jumpRightSprite = '../img/jumpRight.gif';
	this.jumpLeftSprite = '../img/jumpLeft.gif';

	this.walkRightSpriteImage = new Image();
	this.walkLeftSpriteImage = new Image();
	this.jumpRightSpriteImage = new Image();
	this.jumpLeftSpriteImage = new Image();

	this.animCycle = 0;
	this.animating = false;

	this.resourcesLoaded = false;

	this.isAirborne = false;
	this.jumpHeight = 50;

	this.moveSpeed = 2;

	this.gravity = true;
	this.isShooting = false;
}

Player.prototype.loadResources = function(){
	this.walkRightSpriteImage.src = player.walkRightSprite;
	this.walkLeftSpriteImage.src = player.walkLeftSprite;
	this.jumpRightSpriteImage.src = player.jumpRightSprite;
	this.jumpLeftSpriteImage.src = player.jumpLeftSprite;	
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
		}
		return this.walkLeftSpriteImage;
	}
}