<template>
  <div class="hello">
    <msg-pool class="content"></msg-pool>
    <my-input class="footer"></my-input>
  </div>
</template>

<script>
  import MyInput from './MsgInput'
  import MsgPool from './MsgPool'

  export default {
    name: 'index',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
      MyInput: MyInput,
      MsgPool: MsgPool
    }
  }
</script>

<style scoped>
  html,body{
    margin: 0;
    padding: 0;
    min-width: 1366px;
    font: 16px/1.8 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  .hello{
    width: 100%;
    height: 100%;
  }

  .content{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 56px;
    left: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .footer{
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    box-shadow: 0 0 5px #bbb;
    box-sizing: border-box;
  }
</style>
