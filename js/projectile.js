function Projectile(p) {
	this.active = true;

	this.player = p;

	this.x = this.player.x;
	if(this.player.isAirborne){
		this.y = this.player.y + (this.player.height/2)-6;//+3;
	}
	else{
		this.y = this.player.y + (this.player.height/2)-2;
	}
	

	this.startX = this.x;
	this.startY = this.y;

	this.width = 5;
	this.height = 5;

	this.moveSpeed = this.player.weapon.projectileSpeed;

	this.damage = this.player.weapon.damage;

	this.penetratesWalls = false;

	if(this.player.walksRight){
		this.vecX = this.moveSpeed;
		this.x += this.player.width + 5;
	}
	else{
		this.vecX = -this.moveSpeed;
		this.x -= 9;
	}
	this.vecY = 0;

	this.speed = this.player.weapon.speed;

	this.travelDistance = this.player.weapon.projectileTravelDistance;
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
	this.player.fireRate--;
}


function destroyProjectile(proj){
	proj.active = false;
	
	projectiles = projectiles.filter(function(p){
		if(p.active){
			return p;
		}
	});
}