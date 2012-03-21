var socket;

function initSocket(){
  // socket = io.connect('http://129.241.127.32:1338');
  socket = io.connect('http://localhost:1337');
  
  socket.emit('client_ready', {});
  console.log("test");

  socket.on('player_pos', function (data) {
    		updatePlayer(data.pid, data.xpos, data.ypos);
  });
  socket.on('player_start', function(data){
  	initPlayer(data);
  });
  
  socket.on('init_opponent', function(data){
  	initOpponent(data);
  });
  
  socket.on('fire_projectile', function(data){
  	projectiles.push(new Projectile(players[data.pid]));
  });
  
  socket.on('respawn_player', function(data){
  	respawnPlayer(players[data.pid]);
  });
  
  socket.on('kill_player', function(data){
  	players[data.pid].destroy();
  });
  
  socket.on('player_hit', function(data){
  	players[data.pid].hit(data.damage);
  });
  
  socket.on('spawn_powerup', function(data){
  	powerups.push(new PowerUpProjectileSpeed(data.posX, data.posY));
  });
  
  socket.on('hello_word', function(data){
    console.log(data.payload);
  });
}