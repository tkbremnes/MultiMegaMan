var powerups = [];

function drawPowerups(){
	powerups.forEach(function(p){

		ctx.drawImage(
			p.getSprite(),
			0,
			0,
			p.width,
			p.height,
			p.x,
			p.y,
			p.width,
			p.height
		);
	});
}

function destroyPowerUp(powerup){
	powerup.active = false;
	
	powerups = powerups.filter(function(p){
		if(p.active){
			return p;
		}
	});
}


function PowerUpCooldown(ix, iy){
	this.active = true;

	this.hitboxWidth = 16;
	this.hitboxHeight = 16;

	this.height = 16;
	this.width = 16;

	this.x = ix;
	this.y = iy;

	this.spriteImage = new Image();
	this.spriteImage.src = '../img/etank.gif';
}
PowerUpCooldown.prototype.getSprite = function() {
	return this.spriteImage;
}
PowerUpCooldown.prototype.applyEffect = function(p) {
	p.weapon.cooldown -= 900;
}



// TODO: some difficulties combining cooldowns and fire rate.
function PowerUpFireRate(ix, iy){
	this.active = true;

	this.hitboxWidth = 16;
	this.hitboxHeight = 16;

	this.height = 16;
	this.width = 16;

	this.x = ix;
	this.y = iy;

	this.spriteImage = new Image();
	this.spriteImage.src = '../img/etank.gif';
}
PowerUpFireRate.prototype.getSprite = function() {
	return this.spriteImage;
}
PowerUpFireRate.prototype.applyEffect = function(p) {
	p.weapon.fireRate += 1;
}



function PowerUpDamage(ix, iy){
	this.active = true;

	this.hitboxWidth = 16;
	this.hitboxHeight = 16;

	this.height = 16;
	this.width = 16;

	this.x = ix;
	this.y = iy;

	this.spriteImage = new Image();
	this.spriteImage.src = '../img/etank.gif';
}
PowerUpDamage.prototype.getSprite = function() {
	return this.spriteImage;
}
PowerUpDamage.prototype.applyEffect = function(p) {
	p.weapon.damage += 1;
}

function PowerUpProjectileTravelDistance(ix, iy){
	this.active = true;

	this.hitboxWidth = 16;
	this.hitboxHeight = 16;

	this.height = 16;
	this.width = 16;

	this.x = ix;
	this.y = iy;

	this.spriteImage = new Image();
	this.spriteImage.src = '../img/etank.gif';
}
PowerUpProjectileTravelDistance.prototype.getSprite = function() {
	return this.spriteImage;
}
PowerUpProjectileTravelDistance.prototype.applyEffect = function(p) {
	p.weapon.projectileTravelDistance += 100;
}


function PowerUpProjectileSpeed(ix, iy){
	this.active = true;

	this.hitboxWidth = 16;
	this.hitboxHeight = 16;

	this.height = 16;
	this.width = 16;

	this.x = ix;
	this.y = iy;

	this.spriteImage = new Image();
	this.spriteImage.src = '../img/etank.gif';
}
PowerUpProjectileSpeed.prototype.getSprite = function() {
	return this.spriteImage;
}
PowerUpProjectileSpeed.prototype.applyEffect = function(p) {
	p.weapon.projectileSpeed += 5;
}

