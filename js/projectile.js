function Projectile(p, w, ispeed) {
	this.player = player;

	this.x = player.x;
	this.y = player.y;

	this.width = 5;
	this.height = 5;

	if(player.walksRight){
		this.vecX = 1;
		this.x += player.width;
	}
	else{
		this.vecX = -1;
	}
	this.vecY = 0;

	this.speed = ispeed;
}
Projectile.prototype.move = function(){
	this.x += this.vecX;
	this.x += this.vecY;
}