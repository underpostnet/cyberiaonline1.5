

var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({port: 3002}),
CLIENTS=[], USERDATA=[];

wss.on('connection', function(ws) {

  CLIENTS.push(ws);

  ws.on('message', function(message) {

    console.log('received:', message);

    var obj = JSON.parse(message);

    for (var i=0; i<CLIENTS.length; i++) {

      if(CLIENTS[i]==ws){

        USERDATA[i]=obj;

        if(obj.state=='new'){

          console.log('Connected User -> ID:'+USERDATA[i].id+' INDEX:'+i);

        }else{

          console.log('Update User -> ID:'+USERDATA[i].id+' INDEX:'+i);

        }

      }

    }

    sendAll(message);

  });

  ws.on('close', function close() {

    for (var i=0; i<CLIENTS.length; i++) {

      if(CLIENTS[i]==ws){

        USERDATA[i].state = 'del';
        sendAll(JSON.stringify(USERDATA[i]));
        console.log('Disconnected User -> ID:'+USERDATA[i].id+' INDEX:'+i);
        CLIENTS.splice(i, 1);
        USERDATA.splice(i, 1);

      }

    }

  });

});

function sendAll (message) {
  for (var i=0; i<CLIENTS.length; i++) {
    CLIENTS[i].send(message);
    //para enviar a un ws especifico
    //ws.send('User Connected');
  }
}
