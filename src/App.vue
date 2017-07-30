<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  html,body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font: 16px/1.8 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  #app {
    width:100%;
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  @media only screen and (min-width: 640px) {
    /* 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸 */
    ::-webkit-scrollbar{
      width: 6px;
      height: 8px;
      background-color: #eee;
    }
    ::-webkit-scrollbar-track:hover{
      background-color: #eee;
    }
    /* 定义滑块 内阴影 圆角 */
    ::-webkit-scrollbar-thumb{
      border-radius: 20px;
      background-color: #afafb0;
    }
    ::-webkit-scrollbar-thumb:hover{
      background-color: #888;
    }
    
  }
</style>
