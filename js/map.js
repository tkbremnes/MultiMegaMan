function Map(){
	// TODO - decrease cellSize to
	// cellSize = 16;
	// needs to update collison detector!
	cellSize = 16;
	numberOfCellsVertical = 32;
	numberOfCellsHorisontal = 32;

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
	mapGrid[0] 	= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[1] 	= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[2] 	= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[3] 	= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[4] 	= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[5] 	= [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[6] 	= [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[7] 	= [1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[8] 	= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[9] 	= [0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[10] = [0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[11] = [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1];
	mapGrid[12] = [0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[13] = [0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[14] = [0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[15] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[16] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[17] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[18] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[19] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[20] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[21] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[22] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[23] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[24] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[25] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[26] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[27] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[28] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[29] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[30] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[31] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

	for(var i=0; i<numberOfCellsVertical; i++){
		// console.log(i);
		for(var j=0; j<numberOfCellsHorisontal; j++){
			// console.log(j);
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

	for(var i=-2; i<=2; i++){
		for(var j=-2; j<=2; j++){
				if(col+j>=0 && row+i>=0){
				var c=mapGrid[col+j][row+i];
				if(c!==undefined && c!==0){
					if(collides(p, c, 0, Math.floor(p.fallSpeed))){
						return true;
					}
				}
				}
			
		}
	}
	
	return false;
}

// TODO: prettify!
function wallTopCollisonDetector(p){
	var row = Math.floor((p.y)/cellSize);
	var col = Math.floor((p.x)/cellSize);

	for(var i=-1; i<=3; i++){
		for(var j=-2; j<=3; j++){
			if(col-j>=0 && row-i>=0){
			var c=mapGrid[col-j][row-i];
			if(c!=undefined && c!=0){
				if(collides(p, c, 0, Math.floor(p.fallSpeed))){
					return true;
				}
			}
			}
		}
	}	
	return false;
}

function wallSideCollisionDetector(p){


	var row = Math.floor((p.y)/cellSize);
	var col = Math.floor((p.x)/cellSize);

	var ting;
		if(p.isAirborne){
			ting = 3;
		}
		else{
			ting = 1;
		}

	if(p.walksRight){
		
		for(var i=-4; i<=ting; i++){
			c=mapGrid[col+2][row+i];
			if(c!=undefined && c!=0){
				if(collides(p, c, 4, 0)){
					return true;
				}
			}

		}
	}
	else{
		for(var i=-4; i<=ting; i++){
			var c=mapGrid[col-1][row+i];
			if(c!=undefined && c!=0){
				if(collides(c, p, 2, 0)){
					console.log("left!");
					return true;
				}
			}
		}
	}
	return false;
}