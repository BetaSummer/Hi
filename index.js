const httpHander = require('./lib/http');
const Server = require('http').createServer(httpHander);
const Io = require('socket.io')(Server);

let chatters = [];  // 所有在线 chatter - 暂时用数组 不知是必要数据库

Io.on('connection', function (socket) {
  let reqIP = socket.handshake.address.substr(7);
  let random = parseInt(Math.random() * 10, 10);
  let chatter = null;

  chatter = {
    name: reqIP,
    logo: random,
    nameColor: random
  };

  /**
   * new chatter
   */
  socket.broadcast.emit('new-chatter', chatter);
  chatters.push(chatter);
  
  /**
   * 文本消息
   */
  socket.on('c-text', function (text) {
    socket.broadcast.emit('s-text', {
      from: chatter,
      msg: text,
      time: new Date()
    });
  });

  /**
   * 图片消息
   */
  socket.on('c-photo', function (text) {
    socket.broadcast.emit('s-photo', {
      from: chatter,
      msg: text
    });
  });

  /**
   * 其它文件消息
   */
  socket.on('c-file', function (text) {
    socket.broadcast.emit('s-file', {
      from: chatter,
      msg: text
    });
  });

  /**
   * chatter 离开
   */
  socket.on('disconnect', function() {
    chatters.splice(chatters.indexOf(reqIP));
    socket.broadcast.emit('chatter-leave', `${reqIP} 离开...`);
  })
});

Server.listen(3000);