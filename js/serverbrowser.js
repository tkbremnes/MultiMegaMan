var servers = [];

servers[0] = {
	name: 'Dette er en server',
	ip: '129.241.127.32:1338',
	noOfPlayers: 0,
	ping: 0,
	isSelected: true,
	connect: function(){

	}
};

servers[1] = {
	name: 'Ikke-eksisterende server',
	ip: '129.241.127.32:1339',
	noOfPlayers: 1,
	ping: 50,
	isSelected: false,
	connect: function(){

	}
};

var serverBrowser = {

	buttons: [
		new canvasButton(servers[0].connect, 400, 100, 30, 56, servers[0].name, true), 
		new canvasButton(servers[0].connect, 400, 100, 160, 56, servers[0].name, false)
	],

	draw: function(){
		ctx.clearRect(0,0,512,512);
		ctx.fillStyle = 'rgb(128,128,128)';
		ctx.fillRect(10,10,30,30);

		this.buttons.forEach(function(b){
			ctx.fillStyle = 'rgb(255,255,255)';
			if(b.isSelected){
				ctx.fillRect(b.x-40, b.y, 20, 20);
			}

			ctx.fillStyle = 'rgb(255,255,255)';
			ctx.font = '20px monospace';
			ctx.fillText(b.text, b.x, b.y+15);
		});
	},

	moveUp: function(){

	},

	moveDown: function(){
		
	}
}

function listServers(){
	window.clearInterval(menuInterval);
	serverBrowser.draw();
}