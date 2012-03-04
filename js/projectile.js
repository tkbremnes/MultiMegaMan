function Projectile(p, weapon) {
	this.active = true;

	this.player = player;

	this.x = player.x;
	this.y = player.y + (player.height/2);

	this.startX = this.x;
	this.startY = this.y;

	this.width = 5;
	this.height = 5;

	this.moveSpeed = weapon.projectileSpeed;

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

	this.travelDistance = weapon.projectileTravelDistance;
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
		if(this.x >= this.startX+this.travelDistance){
			this.destroy();
		}
	}
	else{
		if(this.x <= this.startX-this.travelDistance){
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