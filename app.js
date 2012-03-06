var sys = require("sys"),  
    http = require("http").createServer(handler),  
    url = require("url"),  
    path = require("path"),  
    fs = require("fs"),
    io = require('socket.io').listen(http);  

http.listen(1337, "localhost");

function handler (request, response) {
  console.log("incoming connection");
  var uri = url.parse(request.url).pathname;
  if(uri=='/'){
    uri = '/index.html'
  }
  var filename = path.join(process.cwd(), uri);
  console.log("requesting " + uri);
  path.exists(filename, function(exists) {  
        if(!exists) {  
            response.writeHead(404, {"Content-Type": "text/plain"});  
            response.end("404 Not Found\n"); 
            return;  
        }  
  
        fs.readFile(filename, "binary", function(err, file) {  
            if(err) {  
                response.writeHead(500, {"Content-Type": "text/plain"});  
                response.end(err + "\n");  
                return;  
            }  
  
            response.writeHead(200);  
            response.end(file, "binary");  
            // response.close();  
        });  
    });
}


io.sockets.on('connection', function (socket)
{  
  socket.on('client_ready', function(data){
    var pid = createPid();
    socket.emit('player_start', {pid: pid, xpos: players[pid].xpos, ypos: players[pid].ypos});

    players.forEach(function(p){
      if(p.pid!=pid){
        socket.emit('init_opponent', {pid: p.pid, xpos: p.xpos, ypos: p.ypos});
      }
    });
  });

  socket.on('shoot', function(data){
    // console.log(data);

    socket.broadcast.emit('fire_projectile', {
      pid: data.pid,
      startPosX: data.startPosX, 
      startPosY: data.startPosY, 
      velocity: data.velocity, 
      travelLength: data.travelLength, 
      damage: data.damage
    });
  });

  socket.on('player_hit', function(data){
    players[data.pid].health -= data.damage;
    socket.broadcast.emit('player_hit', {pid: data.pid, damage: data.damage});
    
    if(players[data.pid].health<0){
      socket.emit('kill_player', {pid: data.pid});
      socket.broadcast.emit('kill_player', {pid: data.pid});

      players[data.pid].health = players[data.pid].startHealth;
      // Schedule respawn
      setTimeout(function(){
        socket.emit('respawn_player', {pid: data.pid});
        socket.broadcast.emit('respawn_player', {pid: data.pid});
      }, respawnTime);
    }
  });

  socket.on('player_killed', function(data){
    // console.log(data)
    socket.emit('kill_player', {pid: data.pid});
    socket.broadcast.emit('kill_player', {pid: data.pid});


    // Schedule respawn
    setTimeout(function(){
      socket.emit('respawn_player', {pid: data.pid});
      socket.broadcast.emit('respawn_player', {pid: data.pid});
    }, respawnTime);
  });

  socket.on('update_player_position', function(data){
    // console.log(data);
    players[data.pid].xpos = data.xpos;
    players[data.pid].ypos = data.ypos;
    socket.broadcast.emit('player_pos', {pid: data.pid, xpos: data.xpos, ypos: data.ypos});
  });

});

// Power up
var powerups = [];
var powerupCooldown;
function initGame(){

  // powerupCooldown = 10000 + (Math.round(Math.random()*20000));
  powerupCooldown = 2000;
  setTimeout(function(){
     spawnPowerup();
  }, powerupCooldown);
}

function spawnPowerup(){
  // TODO
  // Sjekke om det er noen koblet til
  // hvis ikke - ordne en form for long-polling

  // var powerup = new getRandomPowerup();
  // powerups.push(powerup);
  // socket.broadcast('spawn_powerup', {powerup: powerup()});

  // // Schedule next
  // setTimeout(function(){
  //    spawnPowerUp();
  // }, powerupCooldown);
}

function getRandomPowerup(){
  var rand = Math.round(Math.random()*3);
  var posX = Math.round(Math.random()*500);
  var posY = 10;
  return {type: rand, posX: posX, posY: posY};
}

// Game data
var respawnTime = 3000;
var players = [];
initPlayers();

var multiplayerHack = 0;
function createPid(){
  var res = multiplayerHack;
  if(multiplayerHack==3){
    multiplayerHack = 0;
  }
  else{
    multiplayerHack++;
  }
  return res;
}


function addPlayer(){

}

function updatePlayer(id, x, y, h){
  var p = players[id];
  p.xpos = x;
  p.ypos = y;
  p.health = h;
}

function initPlayers(){
  players[0] = {
    pid: 0,
    xpos: 20,
    ypos: 50,
    health: 10
  };
  players[1] = {
    pid: 1,
    xpos: 200,
    ypos: 50,
    health: 10
  };
  players[2] = {
    pid: 2,
    xpos: 300,
    ypos: 20,
    health: 10
  };
  players[3] = {
    pid: 3,
    xpos: 380,
    ypos: 50,
    health: 10
  };
}

function Player(id, x, y){
  this.pid = id;
  this.xpos = x;
  this.ypos = y;

  this.health = 28;
  this.startHealth = 28;
}

initGame();