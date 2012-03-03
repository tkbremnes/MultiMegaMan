function Projectile(p, weapon) {
	this.active = true;

	this.player = player;

	this.x = player.x;
	this.y = player.y + 10;

	this.startX = this.x;
	this.startY = this.y;

	this.width = 5;
	this.height = 5;

	this.moveSpeed = 5;

	this.damage = weapon.damage;

	this.penetratesWalls = false;

	if(player.walksRight){
		this.vecX = this.moveSpeed;
		this.x += player.width;
	}
	else{
		this.vecX = -this.moveSpeed;
		this.x -= 5;
	}
	this.vecY = 0;

	this.speed = weapon.speed;

	this.travelLength = 100;
}
Projectile.prototype.update = function(){
	this.x += this.vecX;
	this.y += this.vecY;

	if(this.x>=500 || this.x<=0){
		this.destroy();
	}

	if(!this.penetratesWalls && wallSideCollisionDetector(this)){
		this.destroy();
	}

	if(this.vecX>0){
		if(this.x >= this.startX+this.travelLength){
			this.destroy();
		}
	}
	else{
		if(this.x <= this.startX-this.travelLength){
			this.destroy();
		}
	}
}

Projectile.prototype.destroy = function(){
	destroyProjectile(this);
	player.fireRate--;
}


function destroyProjectile(proj){
	proj.active = false;
	
	projectiles = projectiles.filter(function(p){
		if(p.active){
			return p;
		}
	});
}