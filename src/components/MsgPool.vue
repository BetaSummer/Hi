<template>
  <div class="msg-pool">
    <div class="msg">
      <div class="avator">
        <img src="../assets/logo.jpg" alt="">
      </div>
      <div class="content">
        <div class="bubble border">
          hello 你好<br>SB
        </div>
      </div>
    </div>
    <div class="msg">
      <div class="avator">
        <img src="../assets/logo.jpg" alt="">
      </div>
      <div class="content">
        <div class="bubble border">
          hello 你好<br>SB
        </div>
      </div>
    </div>
    <div class="msg system">
      <span>Millco、何建吖、崔慧、马克里斯 加入群聊</span>
    </div>
    <div class="msg">
      <div class="avator">
        <img src="../assets/logo.jpg" alt="">
      </div>
      <div class="content">
        <div class="bubble border">
          hello 你好<br>SB
        </div>
      </div>
    </div>
    <div class="msg">
      <div class="avator">
        <img src="../assets/logo.jpg" alt="">
      </div>
      <div class="content">
        <div class="bubble border">
          hello 你好<br>SB
        </div>
      </div>
    </div>
    <div class="msg system">
      <span>周一 13:01</span>
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
          好你妹？<br>SB
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
    padding: 12px 0;
    width: 100%;
    font-size: 14px;
    overflow: auto;
  }

  .msg{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    padding: 0 6px;
    box-sizing: border-box;
  }

  .msg.you{
    flex-direction: row-reverse;
  }

  .msg.system{
    justify-content: center;
    padding: 22px 6px 6px  6px;
  }

  .msg.system span{
    display: inline-block;
    padding: 0 6px;
    color: #fff;
    font-size: 12px;
    line-height: 22px;
    text-align: center;
    background: rgba(142, 139, 139, 0.28);
    border-radius: 2px;
    box-sizing: border-box;
  }
  
  .msg .avator{
    padding: 6px;
    width: 52px;
    height: 52px;
    text-align: center;
    box-sizing: border-box;
  }
  
  .msg .avator img{
    width: 40px;
    height: 40px;
    border-radius: 4px;
  }

  .msg .content{
    padding: 6px;
    padding-right: 84px;
    width: 100%;
  }

  .msg.you .content{
    padding: 6px 6px 6px 84px;
    text-align: right;
  }

  .msg .content .bubble{
    position: relative;
    display: inline-block;
    max-width: 520px;
    padding: 10px 12px;
    line-height: 18px;
    text-align: left;
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
