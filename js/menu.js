var servers = [];

servers[0] = {
	title: 'Dette er en server',
	ip: '129.241.127.32:1338',
	noOfPlayers: 0,
	ping: 0,
	isSelected: true
}

servers[1] = {
	title: 'Ikke-eksisterende server',
	ip: '129.241.127.32:1339',
	noOfPlayers: 1,
	ping: 50,
	isSelected: false
}

// TODO
var servermenu = {
	active: true,
	height: 300,
	width: 300,
	selectedServer: 0
}