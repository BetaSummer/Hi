const httpHander = require('./lib/http');
const Server = require('http').createServer(httpHander);
const Io = require('socket.io')(Server);

Io.on('connection', function (socket) {
  socket.on('c-words', function (data) {

    data.chatter.name = socket.handshake.address.substr(7);
    console.log(data);

    socket.broadcast.emit('s-words', data);
    socket.emit('s-words', data);
  });
});

Io.on('disconnect', function() {
  console.log('disconnect');
  socket.emit('words', {words: 'disconnect'});
});

Server.listen(3000);