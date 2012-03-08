function Map(){
	// TODO - decrease cellSize to
	// cellSize = 16;
	// needs to update collison detector!
	cellSize = 32;
	numberOfCellsVertical = 16;
	numberOfCellsHorisontal = 16;

	mapInit();

	this.cellColor = 'rgb(55, 160, 38)';
	this.bgColor = '#0075ef';
}

function drawMap(){
	
	for(var i=0; i<numberOfCellsVertical; i++){
		for(var j=0; j<numberOfCellsHorisontal; j++){
			if(mapGrid[j][i]!=0){
				drawCell(mapGrid[j][i]);
			}
		}
	}
}

var test = 0;
function drawCell(cell){
	ctx.fillStyle = cell.color;
	ctx.fillRect(cell.x, cell.y, cell.width, cell.height);
	// ctx.fillRect(test, test, test, test);
	// test++;
}

// Obsolete
	wall = {
		x: 0,
		y: 100,
		width: 400,
		height: 10,
		isHazard: false
	};



var mapGrid = [];


function mapInit(){
	mapGrid[0] 	= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[1] 	= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[2] 	= [0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1];
	mapGrid[3] 	= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[4] 	= [1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1];
	mapGrid[5] 	= [0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1];
	mapGrid[6] 	= [0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1];
	mapGrid[7] 	= [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1];
	mapGrid[8] 	= [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0];
	mapGrid[9] 	= [0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0];
	mapGrid[10] = [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[11] = [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[12] = [0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0];
	mapGrid[13] = [0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0];
	mapGrid[14] = [0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0];
	mapGrid[15] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1];

	for(var i=0; i<numberOfCellsVertical; i++){
		for(var j=0; j<numberOfCellsHorisontal; j++){
			if(mapGrid[i][j]==1){
				mapGrid[j][i] = new MapCell(j*cellSize, i*cellSize, cellSize, cellSize);
			}
		}
	}

	// console.log(mapGrid[0][0]);
}

function wallBottomCollisionDetector(p){
	var row = Math.floor((p.y)/cellSize);
	var col = Math.floor((p.x)/cellSize);

	if(col<0 || row<=0){
		return false;
	}

	if(mapGrid[col][row+1]!=0){
		if(collides(p, mapGrid[col][row+1], 0, Math.floor(p.fallSpeed))){
			return true;
		}
	}
	if(mapGrid[col+1][row+1]!=0){
		if(collides(p, mapGrid[col+1][row+1], 0, Math.floor(p.fallSpeed))){
			return true;
		}
	}

	if(col!=0){
		if(mapGrid[col-1][row+1]!=0){
			if(collides(p, mapGrid[col-1][row+1], 0, Math.floor(p.fallSpeed))){
				return true;
			}
		}
	}
	
	return false;
}

// TODO: prettify!
function wallTopCollisonDetector(p){
	var row = Math.floor((p.y)/cellSize);
	var col = Math.floor((p.x)/cellSize);

	if(col<0 || row<=0){
		return false;
	}

	if(mapGrid[col][row-1]!=0){
		if(collides(p, mapGrid[col][row-1], 0, Math.ceil(p.fallSpeed))){
			return true;
		}
	}

	if(mapGrid[col+1][row-1]!=0){
		if(collides(p, mapGrid[col+1][row-1], 0, Math.ceil(p.fallSpeed))){
			return true;
		}
	}
	
	return false;
}

function wallSideCollisionDetector(p){

	// Finds row
	var row = Math.floor((p.y)/cellSize)+1;
	var col = Math.floor((p.x)/cellSize);
	if(row<0 || col<0){
		return false;
	}

	for(var j=row; j>=row-1; j--){
		if(j<0){
			return false;
		}
	if(p.walksRight){
		for(var i=col; i<numberOfCellsHorisontal; i++){
			if(collides(p, mapGrid[i][j], p.moveSpeed, 0)){
				if(mapGrid[i][j]!=0 && !mapGrid[i][j].isBelow(p)){
					return true;
				}
			}
		}
	}
	else{
		for(var i=col; i>=0; i--){
			if(collides(p, mapGrid[i][j], -1*p.moveSpeed, 0)){
				if(!mapGrid[i][j].isBelow(p)){
					return true;
				}
			}
		}
	}
	}
	// row++;
	// if(row<0){
	// 	return false;
	// }

	// for(var i=0; i<numberOfCellsHorisontal; i++){
	// 	if(collides(p, mapGrid[i][row])){
	// 		console.log("rawr");
	// 		return true;
	// 	}
	// }
	return false;
}