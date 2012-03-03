function Projectile(p, w, ispeed) {
	this.active = true;

	this.player = player;

	this.x = player.x;
	this.y = player.y + 7;

	this.width = 5;
	this.height = 5;

	this.moveSpeed = 2;

	this.damage = 2;

	if(player.walksRight){
		this.vecX = this.moveSpeed;
		this.x += player.width;
	}
	else{
		this.vecX = -this.moveSpeed;
	}
	this.vecY = 0;

	this.speed = ispeed;
}
Projectile.prototype.update = function(){
	this.x += this.vecX;
	this.x += this.vecY;
}