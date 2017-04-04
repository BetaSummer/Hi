const httpHander = require('./lib/http');
const Server = require('http').createServer(httpHander);
const Io = require('socket.io')(Server);

/**
 * 所有在线 chatter - 暂时用数组 不知是必要数据库
 */
let chatter = {
  name: [],
  storage: [],

  add: function(name, chatter) {
    this.name.push(name);
    this.storage.push(chatter);
  },
  
  remove: function(name) {
    let index = this.name.indexOf(name);

    this.name.splice(index, 1);
    this.storage.splice(index, 1);
  },

  get: function (name) {
    return this.storage[this.name.indexOf(name)];
  }
};

Io.of('/group-chat').on('connection', function (socket) {
  let reqIP = socket.handshake.headers['x-real-ip'] || socket.handshake.address.substr(7);

  // 唯一 IP 原则
  if(chatter.name.indexOf(reqIP) >= 0) {

    return socket.emit('refused', `您的IP: ${reqIP} 已被占用...`);
  }

  let reqDate = new Date();
  let thisChatter = {
    name: reqIP,
    logo: parseInt(Math.random() * 10, 10),
    nameColor: parseInt(Math.random() * 10, 10)
  };
  let msg = {
    action: 'join',
    from: 'system',
    to: 'all',
    type: 'notice',
    date: reqDate,
    content: `🙋 ${reqIP} 加入群聊 ${reqDate.toString().split(' ')[4]}`
  };


  /**
   * new chatter
   */
  chatter.add(reqIP, thisChatter);
  socket.emit('join', thisChatter);
  socket.broadcast.emit('s-msg', msg);
    
  // 取消引用，方便下次直接垃圾回收时 ？
  reqDate = null;
  msg = null;
  thisChatter = null;

  /**
   * Response 聊天消息
   */
  socket.on('c-msg', function (cMsg) {
    let msg = {
      from: chatter.get(reqIP),
      to: cMsg.to,
      type: cMsg.type,
      date: new Date,
      content: cMsg.content
    };

    socket.broadcast.emit('s-msg', msg);
  });

  /**
   * chatter 离开
   */
  socket.on('disconnect', function() {
    let date = new Date();
    let msg = {
      action: 'leave',
      from: 'system',
      to: 'all',
      type: 'notice',
      date: date,
      content: `☕ ${reqIP} 离开群聊 ${date.toString().split(' ')[4]}`
    };

    chatter.remove(reqIP);
    socket.broadcast.emit('s-msg', msg);
  })
});

Server.listen(3000);