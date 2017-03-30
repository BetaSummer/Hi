;(function(win, doc, io) {
  var socket = io.connect('http://192.168.1.105:3000/group-chat');  // 服务器地址
  var thisChatter = null;

  var msgPool = doc.getElementById('msg-pool');
  var msgSlideIn = slide();

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
      msgSlideIn();
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
      msgSlideIn();
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
   * 
   * 注：
   *   ① 说多了都是泪啊，为了能插入表情装个B...
   *   ② ...
   * 
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
   * 显示消息 append to msgPool （核心就一个 appendChild）
   * 
   * @param {Object} msg 
   */
  function displayMsg(msg) {
    var row = doc.createElement('div');
    var tmp = render(msg);

    if(msg.self) {
      row.className = 'row you';
    } else {
      row.className = 'row others';
    }
    
    row.innerHTML = tmp; 
    msgPool.appendChild(row);  // 插入节点
  }

  /**
   * 消息平滑显示的视觉效果
   * 
   * 注：
   *   ① 都是 appendChild 插入的节点不在可视区-这个坑，当然如果不要‘纵想丝滑’，可以直接 xxx.scrollTop = xxx.scrollHeight
   *   ② scrollTop 的值不接受小数自动抛弃小数点后面的值，就像 Math.floor 一样向下舍入（chrome 57.0.2987.98）？ 比如scrollTop = 3.3 浏览器直接给了 3，
   *
   * @returns 
   */
  function slide() {
    var isFinished = true;  // 滚动是否结束
    var preScrollTop;
    var timer = null;

    return function() {
      var startTime = Date.now();  // 开始滚动时的时间戳
      var gapTime = 0;  // 间隔的时间

      
      // scrollTop 自增
      function addScrollTop() {

        // 讲真，我实在不知给这个函数取个什么名字了，它存在的意义完全是为了取代 setInterval 函数
        // 因为，当回调函数的执行被阻塞时，setInterval 仍然会发布更多的回调指令，
        // 在很小的定时间隔情况下，这会导致回调函数被堆积起来。
        // 对应本程序的功能，测试过大量消息时，所谓我想要的消息平滑显示的视觉效果会是个大坑
        function bar() {
          gapTime = Date.now() - startTime;
    
          preScrollTop = msgPool.scrollTop;
          msgPool.scrollTop = Math.ceil(msgPool.scrollTop + gapTime * gapTime * 0.0004);
          
          if(preScrollTop === msgPool.scrollTop) {
            timer = null;
            clearTimeout(timer);
            isFinished = true;
          } else {
            addScrollTop();  // 自我调用
            isFinished = false;
          }
        }

        // 在回调函数内部使用 setTimeout 函数，间接实现 setInterval 的效果
        timer = setTimeout(bar, 10);
      }

      return isFinished ? addScrollTop() : false;
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