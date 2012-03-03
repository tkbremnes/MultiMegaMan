function Projectile(p, w, ispeed) {
	this.active = true;

	this.player = player;

	this.x = player.x;
	this.y = player.y + 7;

	this.startX = this.x;
	this.startY = this.y;

	this.width = 5;
	this.height = 5;

	this.moveSpeed = 5;

	this.damage = 2;

	if(player.walksRight){
		this.vecX = this.moveSpeed;
		this.x += player.width;
	}
	else{
		this.vecX = -this.moveSpeed;
		this.x -= 5;
	}
	this.vecY = 0;

	this.speed = ispeed;

	this.travelLength = 100;
}
Projectile.prototype.update = function(){
	this.x += this.vecX;
	this.x += this.vecY;
	if(this.x >= this.startX+this.travelLength){
		destroyProjectile(this);
	}
}