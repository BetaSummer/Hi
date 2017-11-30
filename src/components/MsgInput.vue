<template>
  <div class="rich-input" v-bind:class="{'show-footer': showFooter}">
    <header>
      <div class="input-area">
        <div class="input" contenteditable="true" placeholder="Type something.." ref="input" v-on:keydown="keyDownHandler" v-on:paste="pasteHandler" v-on:focus="hideFooter"></div>
      </div>
      <div class="files">
        <i class="material-icons">&#xE2BC;</i>
      </div>
      <div class="expressions" v-on:click="showExpressionBox">
        <i class="material-icons">{{showFooter ? '&#xE312;' : '&#xE24E;'}}</i>
      </div>
      <div class="send-menu" v-on:click="sendMsg">
        <i class="material-icons">&#xE163;</i>
      </div>
    </header>
    <footer>
      
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Input',
    data () {
      return {
        state: 0,
        showFooter: false
      }
    },

    methods: {
      _insertText (text) {
        let textLength = text.length
        let selection = window.getSelection()
        let range = selection.getRangeAt(0)  // 光标对象
        let commonAncestorContainer = range.commonAncestorContainer
        let startContainer = range.startContainer
        let startOffset = range.startOffset
        let endOffset = range.endOffset
        // console.log(startContainer)

        if (startContainer.nodeName === '#text') {
          console.log('文本内', startContainer)
          if (startOffset === endOffset) {
            startContainer.insertData(startOffset, text)
          } else {
            console.log('有选择区域')

            if (commonAncestorContainer.nodeName === '#text') {
              commonAncestorContainer.nodeValue = text
            } else {
              commonAncestorContainer.innerText = text
            }
          }
          range.setStart(startContainer, startOffset + textLength)
          console.log('结束paste')
        } else {
          console.log('新的一行', startContainer)
          // startContainer.innerText += text
          startContainer.innerHTML = text
          range.setStart(startContainer.childNodes[0], startOffset + textLength)
        }
        range.collapse(true)
        console.log('结束')
        // selection.removeAllRanges()
        // selection.addRange(range)
      },

      _insertNode (node) {
        let selection = window.getSelection()
        let range = selection.getRangeAt(0)  // 光标对象
        let startContainer = range.startContainer
        let startOffset = range.startOffset

        range.insertNode(node)
        if (startContainer.nodeName === '#text') {
          range.setStart(startContainer.parentNode, startOffset + 1)
        } else {
          range.setStart(startContainer, startOffset + 1)
        }
        range.collapse(true)
        console.log(startContainer, startContainer.nodeType, startContainer.nodeName)
      },

      hideFooter () {
        this.showFooter = false
      },

      keyDownHandler (ev) {
        let e = ev || window.event
        let isMobile = /AppleWebKit.*Mobile.*|Android|iPhone|iPad/.test(navigator.userAgent)

        // e.preventDefault()

        // console.log(e.key, e)
        // this.inputValue += e.key

        if (!isMobile && !e.shiftKey && e.keyCode === 13) {
          alert('发送消息...')
        }
      },

      pasteHandler (ev) {
        let e = ev || window.event
        let textValue = e.clipboardData.getData('text/plain')

        e.preventDefault()
        this._insertText(textValue)
      },

      showExpressionBox () {
        if (this.showFooter) {
          setTimeout(() => {
            this.$refs.input.focus()
          }, 120)
        }
        this.showFooter = !this.showFooter
      },

      sendMsg () {
        console.log(this.$refs.input)
        this.$refs.input.focus()
      }
    }
  }
</script>

<style>
  .rich-input{
    position: relative;
    width: 100%;
    height: 256px;
    box-sizing: border-box;
    user-select: none;
    transform: translateY(200px);
    transition: transform .32s ease;
  }

  .rich-input.show-footer{
    transform: translateY(0);
  }

  .rich-input header{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 56px;
    box-shadow: 0 0 5px #bbb;
  }

  .rich-input footer{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 200px;
  }

  .input-area{
    margin-right: 44px;
    margin-left: 88px;
    height: 100%;
    outline: none;
    box-sizing: border-box;
  }

  .input-area .input{
    margin: auto;
    padding: 18px 12px;
    min-height: 16px;
    max-height: 56px;
    line-height: 20px;
    outline: none;
    box-sizing: border-box;
    overflow: auto;
  }

  .input-area .input div{
    height: 22px;
  }

  .input-area .input img{
    margin: 0 2px;
    width: 20px;
    height: 20px;
    vertical-align: bottom;
  }

  .rich-input i{
    font-size: 32px;
    color: #d4dadf;
  }

  .files{
    position: absolute;
    left: 0;
    top: 0;
    width: 56px;
    height: 56px;
    text-align: center;
    line-height: 75px;
    vertical-align: middle;
    transform: rotate(-45deg);
    transition: all .32s ease;
  }

  .expressions{
    position: absolute;
    left: 56px;
    top: 0;
    width: 32px;
    height: 56px;
    text-align: center;
    line-height: 75px;
    vertical-align: middle;
    transition: all .32s ease;
  }

  .expressions .content{
    position: absolute;
    left: 0;
    width: 100vw;
    height: 200px;
    background: teal;
  }

  .send-menu{
    position: absolute;
    right: 0;
    top: 0;
    width: 56px;
    height: 56px;
    text-align: center;
    line-height: 75px;
    vertical-align: middle;
    transition: all .6s ease;
  }
  
  .files img, .expressions img, .send-menu img{
    width: 32px;
    height: 32px;
    user-select: none;
  }

  .input::-webkit-scrollbar{
  }
</style>
