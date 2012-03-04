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
    socket.emit('player_start', {pid: pid, xpos: startPos[0], ypos: startPos[1]});
  });

  socket.on('shoot', function(data){
    console.log(data);
    socket.emit('rawr', { p: data.p });
  });

  socket.on('player_killed', function(data){
    console.log(data)
  });

  socket.on('update_player_position', function(data){
    // console.log(data);
    socket.broadcast.emit('player_pos', {pid: data.pid, xpos: data.xpos, ypos: data.ypos});
  });

});

// Game data
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