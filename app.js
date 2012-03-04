var sys = require("sys"),  
    http = require("http").createServer(handler),  
    url = require("url"),  
    path = require("path"),  
    fs = require("fs"),
    io = require('socket.io').listen(http);  

http.listen(1337, "localhost");

function handler (request, response) {
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
    var startPos = getStartPos(pid);
    // var p = new Player(pid, startPos[0], startPos[1]);
    socket.emit('player_start', {pid: pid, xpos: startPos[0], ypos: startPos[1]});
  });

  socket.on('shoot', function(data){
    console.log(data);

    socket.emit('fire_projectile', data);

    socket.broadcast.emit('fire_projectile', {
      pid: data.pid,
      startPosX: data.startPosX, 
      startPosY: data.startPosY, 
      velocity: data.velocity, 
      travelLength: data.travelLength, 
      damage: data.damage
    });
  });

  socket.on('player_killed', function(data){
    console.log(data)
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
    socket.broadcast.emit('player_pos', {pid: data.pid, xpos: data.xpos, ypos: data.ypos});
  });

});

// Game data
var respawnTime = 3000;
var pids = [];
function createPid(){
  var newPid = pids.length;
  pids.push(newPid);
  return newPid;
}

function getStartPos(pid){
  switch(pid){
    case 0:
      return [20,50];
    case 1:
      return [200,50];
  }
}

var players = [];
function addPlayer(){

}

function updatePlayer(id, x, y, h){
  var p = players[id];
  p.xpos = x;
  p.ypos = y;
  p.health = h;
}

function Player(id, x, y){
  this.pid = id;
  this.xpos = x;
  this.ypos = y;

  this.health = 10;
}