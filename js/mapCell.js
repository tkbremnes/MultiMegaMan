function MapCell(ix, iy, iwidth, iheight){
	this.x = ix;
	this.y = iy;
	this.width = iwidth;
	this.height = iheight;

	this.gridX = Math.floor(ix/iwidth);
	this.gridy = Math.floor(iy/iheight);

	this.color = 'rgb(55, 160, 38)';

	this.hazardous = false;
}

MapCell.prototype.isBelow = function(p) {
	var py = p.y+p.height-1;
	// console.log(this.y + " " + py);
	return this.y>=py;
};