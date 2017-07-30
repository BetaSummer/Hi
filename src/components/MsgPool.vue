<template>
  <div class="msg-pool">
    <div class="msg">
      <div class="avator">
        <img src="../assets/logo.jpg" alt="">
      </div>
      <div class="content">
        <div class="bubble border">
          hello 你好
        </div>
      </div>
    </div>
    <div class="msg you">
      <div class="avator">
        <img src="../assets/ii.png" alt="">
      </div>
      <div class="content">
        <div class="bubble border">
          好你妹？
        </div>
      </div>
    </div>
    <div class="msg you">
      <div class="avator">
        <img src="../assets/ii.png" alt="">
      </div>
      <div class="content">
        <div class="bubble border">
          好你妹？
        </div>
      </div>
    </div>
    <div class="msg you">
      <div class="avator">
        <img src="../assets/ii.png" alt="">
      </div>
      <div class="content">
        <div class="bubble border">
          好你妹？
        </div>
      </div>
    </div>
    <div class="msg you">
      <div class="avator">
        <img src="../assets/ii.png" alt="">
      </div>
      <div class="content">
        <div class="bubble border">
          好你妹？
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MsgPool'
  }
</script>

<style scoped>
  .msg-pool{
    width: 100%;
    height: 100%;
  }

  .msg{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
  }

  .msg.you{
    flex-direction: row-reverse;
  }
  
  .msg .avator{
    width: 60px;
    height: 60px;
    text-align: center;
    box-sizing: border-box;
  }
  
  .msg .avator img{
    padding: 12px;
    width: 40px;
    height: 40px;
    border-radius: 16px;
  }

  .msg .content{
    padding: 12px 6px;
    padding-right: 84px;
    width: 100%;
  }

  .msg.you .content{
    padding: 12px 6px 12px 84px;
    text-align: right;
  }

  .msg .content .bubble{
    position: relative;
    display: inline-block;
    max-width: 520px;
    padding: 8px 12px;
    line-height: 22px;
    border: 1px solid #d3d3d3;
    border-radius: 4px;
    background: #fff;
    box-sizing: border-box;
  }

  .msg.you .content .bubble{
    background: rgba(239, 253, 222, 0.8);
  }

  .msg .content .bubble:before,
  .msg .content .bubble:after{
    position: absolute;
    top: 20px;
    left: -12px;
    margin-top: -6px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    content: "";
  }

  .msg.you .content .bubble:before,
  .msg.you .content .bubble:after{
    left: auto;
    right: -12px;
  }

  .msg .content .bubble.border:before{
    border-right-color: #d3d3d3;
    border-right-width: 6px;
    margin-left: -1px;
  }

  .msg .content .bubble.border:after{
    border-right-color: #fff;
  }

  .msg.you .content .bubble.border:before{
    border-right-color: transparent;
    border-left-color: #d3d3d3;
    border-left-width: 6px;
    margin-right: -1px;
  }

  .msg.you .content .bubble.border:after{
    border-right-color: transparent;
    border-left-color: rgba(239, 253, 222, 0.8);
  }

</style>
