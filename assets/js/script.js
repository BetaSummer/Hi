;(function(win, doc) {
  var socket = io.connect('http://192.168.1.105:3000');
  var msgInput = doc.getElementById('msg-input');
  var msgWords = doc.getElementById('words');
  var btnSend = doc.getElementById('btn-send');
  var msgPool = doc.getElementById('msg-pool');
  var thisChatter = null;

  /**
   * 显示消息
   * 
   * @param {Object} msg 
   */
  function displayMsg(msg) {
    console.log(msg);
  }

  /**
   * 发送文本消息
   * 
   * @param {String} text
   */
  function sendText(text) {
    socket.emit('c-text', text);
    displayMsg(text);
  }

  /**
   * 接收消息
   * 
   */
  function getMsg() {
    socket.on('s-text', function (text) {
      displayMsg(text);
    });

    socket.on('new-chatter', function (chatter) {
      thisChatter = chatter;
    });

  }

  /**
   * 点击事件处理
   * 
   * @param {Object} ev 
   */
  function clickHandler(ev) {
    var e = ev || win.event;
    var msg = msgWords.value;

    if(e.target.id === 'btn-send' && !!msg) {
      msgWords.value = '';
      sendText(msg);

      msgWords.focus();
    }
  }

  /**
   * 键盘事件处理
   * 
   * @param {Object} ev 
   */
  function keyUpHandler(ev) {
    var e = ev || win.event;
    var msg = e.target.value;

    if(!!msg) {
      btnSend.parentNode.className = 'send active';
    } else {
      btnSend.parentNode.className = 'send';
    }

    if(e.keyCode == 13 && !!msg) {
      e.target.value = '';
      sendText(msg);
    }
  }
  
  getMsg();
  msgInput.addEventListener('click', clickHandler, false);
  msgWords.addEventListener('keyup', keyUpHandler, false);
}(window, document));