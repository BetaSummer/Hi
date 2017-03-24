;(function(win, doc) {
  var socket = io.connect('http://192.168.1.105:3000');
  var msgInput = doc.getElementById('msg-input');
  var msgWords = doc.getElementById('words');
  var btnSend = doc.getElementById('btn-send');
  var msgPool = doc.getElementById('msg-pool');

  function createElement(data) {
    var row = doc.createElement('div');

    // var data = {
    //   chatter: {
    //     logo: 'https://oblky3j33.qnssl.com/images/logo.png',
    //     name: 'elliot',
    //     nameColor: 'yellow'
    //   },
    //   words: 'hello socket.io'
    // };

    var str ='\
      <div class="row others">\
        <div class="chatter">\
          <div class="logo">\
            <img src="' + data.chatter.logo + '" alt="">\
          </div>\
        </div>\
        <div class="msg-content">\
          <ul>\
            <li>\
              <div class="msg">\
                <h1 class="' + data.chatter.nameColor + '">' + data.chatter.name + '</h1>\
                <p>' + data.words + '</p>\
              </div>\
            </li>\
          </ul>\
        </div>\
      </div>';

    row.innerHTML = str;
    msgPool.appendChild(row);
  }

  /**
   * 发送消息
   * 
   * @param {String} msg 
   */
  function sendMsg(data) {
    socket.emit('c-words', data);
  }

  /**
   * 接收消息
   * 
   */
  function getMsg() {
    socket.on('s-words', function (data) {
      createElement(data);
    });
  }

  getMsg();

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
      sendMsg({
        chatter: {
          logo: 'https://oblky3j33.qnssl.com/images/logo.png',
          // name: 'elliot',
          nameColor: 'yellow'
        },
        words: msg
      });
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
      sendMsg({
        chatter: {
          logo: 'https://oblky3j33.qnssl.com/images/logo.png',
          // name: 'elliot',
          nameColor: 'yellow'
        },
        words: msg
      });
    }
  }
  
  msgInput.addEventListener('click', clickHandler, false);
  msgWords.addEventListener('keyup', keyUpHandler, false);
}(window, document));