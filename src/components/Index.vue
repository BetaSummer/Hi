<template>
  <div class="hello">
  
   <my-input class="footer"></my-input>
  </div>
</template>

<script>
  import MyInput from './Input'

  export default {
    name: 'index',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
      MyInput: MyInput
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

  .footer{
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 0 12px #bbb;
  }
</style>
