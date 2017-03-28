;(function(win, doc, io) {

  var socket = io.connect('http://192.168.1.105:3000/group-chat');  // 服务器地址
  var thisChatter = null;

  var msgPool = doc.getElementById('msg-pool');

  /**
   * 文本消息
   */
  var msgText = {
    _element: doc.getElementById('text'),

    // 获取文本
    _getValue: function() {
      var str = this._element.innerHTML;

      // 提取表情标识
      var expression = '';
      var first = 0;
      var last = 0;
      var imgReg = /<img.*?(?:>|\/>)/gi;
      var altReg = /alt=[\'\"]?([^\'\"]*)[\'\"]?/gi;
      var arr1 = str.match(imgReg) || [];
      var arr2 = str.match(altReg) || [];

      for(var i = 0, len = arr1.length; i < len; i++) {
        first = arr2[i].indexOf('"') + 1;
        last = arr2[i].lastIndexOf('"');
        expressionName = ':+' + arr2[i].slice(first, last) + '+:';
        str = str.replace(arr1[i], expressionName);
      }

      // 换行处理 （都是 contenteditable 这个坑）
      if(/<div>/gi.test(str)) {
        str = str.replace(/<div>/g, '\n');
        str += '\n';
      } else {
        str = str.replace(/<br>/gi, '\n');
      }

      str = str.replace(/<[^>]+>/g, '');  // 去除多余的 html tag

      return str;
    },

    // 显示到消息池
    _display: function(msg) {
      displayMsg({
        self: true,
        from: thisChatter,
        content: msg,
        type: 'text',
        time: new Date()
      });
    },

    // 发送..
    _send: function(msg) {
      socket.emit('c-text', msg);
    },

    // 集成..
    go: function() {
      var msg = this._getValue();

      if(!msg) {
        return false;
      }

      this._send(msg);
      this._element.innerHTML = '';
      this._element.focus();
      this._display(msg);
    }
  }

  /**
   * 消息处理 response socket broadcast
   * 
   */
  function msgHandler() {
    var audio = doc.getElementById('audio');

    socket.on('welcome', function(chatter) {
      thisChatter = chatter;
    });

    socket.on('s-text', function(text) {
      displayMsg(text);
      audio.play();
    });

    socket.on('s-photo', function(photo) {
      displayMsg(photo);
      audio.play();
    });

    socket.on('s-file', function(file) {
      displayMsg(file);
      audio.play();
    });
  }

  /**
   * 渲染消息 to html tags
   * @param {Object} msg
   */
  function render(msg) {
    var nameColor = ['yellow', 'green', 'light-green', 'blue', 'red', 'light-red', 'grey', 'brown', 'purple', 'light-purple'];
    var tmp = '';
    var msgContent = '';
    var expressionReg = /:\+.*?\+:/gi;
    var expressions = [];

    msgContent = msg.content.replace(/\n/g, '<br>');
    expressions = msgContent.match(expressionReg);

    if(expressions) {
      for(var i = 0, len = expressions.length; i < len; i++) {
        msgContent = msgContent.replace(expressions[i], '<img src="expressions/'+ expressions[i].slice(2, expressions[i].lastIndexOf('+:')) +'.png">');
      } 
    }

    if(msg.type === 'text') {
      tmp = '\
        <div class="chatter">\
          <div class="logo">\
            <img src="logo/'+ msg.from.logo +'.jpg" alt="'+ msg.from.name +'">\
          </div>\
        </div>\
        <div class="msg-content">\
          <ul>\
            <li>\
              <div class="msg">\
                <h1 class="'+ nameColor[msg.from.nameColor] +'">'+ msg.from.name +'</h1>\
                <p>'+ msgContent +'</p>\
              </div>\
            </li>\
          </ul>\
        </div>';
    } else if(msg.type === 'photo') {

    } else{
      
    }

    return tmp;
  }

  /**
   * 显示消息 append to msgPool
   * 
   * @param {Object} msg 
   */
  function displayMsg(msg) {
    var row = doc.createElement('div');
    var tmp = render(msg);
    var timer = null;
    var preScrollHeight = msgPool.scrollHeight;

    if(msg.self) {
      row.className = 'row you';
    } else {
      row.className = 'row others';
    }
    
    row.innerHTML = tmp; 
    msgPool.appendChild(row);

    var msgHeight = msgPool.scrollHeight - preScrollHeight;
    var slideHeight = 0;


    if(msgPool.scrollHeight - preScrollHeight > 0) {
      timer = setInterval(function() {
        msgPool.scrollTop += (slideHeight++) / 100;

        if(slideHeight >= msgHeight) {
          clearInterval(timer);
          console.log('end');
        }

        console.log(msgPool.scrollTop,msgPool.scrollHeight)
      }, 10);
    }
  }

  /**
   * 点击事件处理
   * 
   * @param {Object} ev 
   */
  function clickHandler(ev) {
    var e = ev || win.event;
    var parent = e.target.parentNode;

    if(e.target.tagName === 'IMG' && parent.tagName === 'LI') {
      text.innerHTML += parent.innerHTML; 
    }

    if(e.target.id === 'btn-send') {
      msgText.go();
    } else if(e.target.id === 'select-photo') {

    } else if(e.target.id === 'select-file') {
      
    }
  }

  /**
   * 键盘事件处理
   * 
   * @param {Object} ev
   */
  function keyUpHandler(ev) {
    var e = ev || win.event;

    if(win.screen.width > 1366 && !e.shiftKey && e.keyCode === 13) {
      e.preventDefault();

      msgText.go();
    }
  }

  msgHandler();
  doc.addEventListener('click', clickHandler, false);
  doc.addEventListener('keypress', keyUpHandler, false);
  win.addEventListener('beforeunload', function(e) {
    var confirmationMessage = "确认离开";

    e.returnValue = confirmationMessage;
    return confirmationMessage;
  }, false);
}(window, document, io));