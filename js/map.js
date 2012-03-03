function Map(){
	cellSize = 32;
	numberOfCellsVertical = 16;
	numberOfCellsHorisontal = 16;

	mapInit();

	this.cellColor = 'rgb(55, 160, 38)';
	this.bgColor = '#0075ef';
}

function drawMap(){
	ctx.fillStyle = map.cellColor;
	
	for(var i=0; i<numberOfCellsHorisontal; i++){
		for(var j=0; j<numberOfCellsVertical; j++){
			if(mapGrid[j][i]==1){
				ctx.fillRect(i*cellSize, j*cellSize, cellSize, cellSize);
			}
		}
	}
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
	mapGrid[0] 	= [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
	mapGrid[1] 	= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[2] 	= [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1];
	mapGrid[3] 	= [1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0];
	mapGrid[4] 	= [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1];
	mapGrid[5] 	= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1];
	mapGrid[6] 	= [0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1];
	mapGrid[7] 	= [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1];
	mapGrid[8] 	= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[9] 	= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[10] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[11] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	mapGrid[12] = [0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0];
	mapGrid[13] = [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0];
	mapGrid[14] = [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0];
	mapGrid[15] = [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1];
}
