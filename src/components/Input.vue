<template>
  <div class="rich-input">
    <div class="input-area">
      <div class="input" contenteditable="true"></div>
    </div>
    <div class="files">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFaElEQVR4Xu1bjXEVNxBeVRCoIKQCoAKgAkgFQAVZVwBU4KWCmAowFcRUgKkgpoKECsR8b1YZvX3S3UqnO7/wrJk3nvFJp91P+6+9QCc+wonzT3cArC0BzHwvhPAkxviIiPB7oH9LW18T0Q0RXYcQrmOMn0Xk3zVpXEUCmPlBCOF5jPHVBLNevgDGRYzxwxpgDAWAmZ8S0R9E9MLLXeO8SyJ6LyJXjeuq04cAwMwQ7XMiAgBz4ysRJbFOjKR194jo4dwLiAjrzkQEKrNoLAIA+k1Eb4iIJ6j4pARfeQlWQAEKfs8n3i1E9G6JanQDoER+VKNmafxGRG+J6HIJcXipggxbApB/LYABo/m7F1y7vgsAZgZBfxaI2TEuIheL5LKyWPcFsCUgXvfs2wwAM0PXrch/JyIRERC3+mBm7AMafjGbAfx3LQQ0AcDMOHWcfj5g1F71imALsflcVUFImjWaFyLy2vteNwDMDIMDF5ePDziJpXruJdbOU/sAul6aZzCMLml0AVDReQQmVhp6eVm0jpkhCRYEl02YBUBF7Ys9+WNhPtFVAeHxnGpOAqAiBuYRv6dxNCdfUAkrCXCRAKGaT8wBYPUeBu/pben8nJ7ogSFKzA0jQudqoFYFoCD6cHVgfnH4OcfIkudKN0DIXWRVFaYA+MvE9m7L6mFA0+Sd4Rqd6WmcgBA9DYThz0p0FQHQrA4ApPFNRHI74OFxco4xWsPtCjND//OI8Vkpi6wBgLQzT0JcLqUFFWaGmD7RNSh8eDJJ9xYF1/1JRA7S9AMAUMwgor/XPH28e20AdA8rBfetAS8BAIuJeD+N4ae/IQCWF9QQ4Nn+GyUA4PdR4EjjADW3HE5M3EgCUK/4JyPjWkQeVwFQP5ovKOrN/wUAlTRrz/YOdE8CmBlGAkWONA5EZgTzW6mA7mPVAMUTgLIbFgBkULn/nI2lewHZQgUUAKhznsvsxTMWgNw1ocIxmywdOwAKQszo3FNrC0BuAL+KSG4Me3ktrttKAhQAhO8pP9gzhBaAHKnhwUmOxMYAVCV7GADqQRA/eENmSBfcFAbSVW+SheAGxtl9ZWbA3lPtKQCakh9mttZ2qMqYlzV5J5sc5bbtDgCjl1VrOXecWYGyRQVSzo5aQ4sKNBVie1XgJI1g1V3MSUDr8429QNW9WxuwFzefYiB08qHwySdDNn8+rXS4EDfjXz9TQeQgv/GUxJqiLq832MILFKJTV0nMFkVvROQ3L2PeeRsBgOJuHpjNF0VVDX7Gsnjx7sF7MTJcCja4GLGn778YKdTs8K+m7HBOFbLmJ0xFV4c7vXW828Yz1bC+5XIUBAJFb9IyR+cqz/VyFNd6qdaAfdovR1UK7PU4mAcIw05rJAoqVWA+L+X1XY8rAEARTOeXjE1NSCMZnHtXoYkLbXuPuhskFARbVk466+7EmiN8xPNKB9tsWd9V9q40SR2NJFSYd91pugBQSbCWdScJrQXKEaed3pEVYm23mttjuQFQEErtaLARQHtT76DWHo2b9u6iqdmiCYAJSYBXwM1zU5tqrzQwc+pQz11dV6zSDICCUGuWvgkhvD0/P0cH6fBxdnb2MsYIVSwVXl06b4nqAiDzDsgZii3sIQQZ0fyUmqlijLh3KDEOV/eiVwW7AcjiBJyI7SHOgb4MIVzpB1AuOwH91g+t0Dc09fnNe23P7w7MFgGQWWMYIkSNqelpSvwBwtQnM54L2c/apO0CdIqYIQBkQODEIKpTn7kssQ2wLYg/juujKctRlunBWHo+gpoCBe25cL9DM8a04VAJKHGhYEAy8g8na6CA2d2Hk/pDh2e3fntEbXUAPETc5pw7AG4T/WPY+wegMPRfLDHFYQAAAABJRU5ErkJggg==" alt="">
    </div>
    <div class="expressions">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAGEUlEQVR4Xu1bjXHUOhDerQBeBSQV8KgAqIBVBYQKEiogVECogFCBlApIKgAqgFTwkgr2zedZZRSfbVmybI5JNHNzk/hsab/9/yQzPfDBD1x+egTg0QI2QEBE/iWil0SE7wN8mBnfd0NVb4joBxH9ts9FCAF/rzpWcwHn3BtVFSISZn5aI4WBcsnM5977i5pn5O5pCoCIQNBjIjrpCX1LRJeqCo3iA23fRA2bheBefDorYWaA9yQKYGCcEdHnEALubzKaASAiH3qCX6tqIKLzWlM2YI4MjGeQuDUQiwEQkVdE9CXx6StVhdDnTVRkD8E8zHxqsQRAIFa8DyEA5OqxCAAR+cTMJzY7NH6ydEE5SQwIgBst4iyE8D5339j1KgDM178xM/wV2vhMRKctfTMnkIicMjPcDvMjrryumb8YABFB+vIm/C0ifQjhMrfgNa6bNcAFnphLuNJ4UwSAaf6XRfifqnpUOmFrILAmZoYCnluAhCXMrh9mA9Azewj/qsbkWgOA5/VAKHKHEgDg84j4eyV8BLQPQgjhxRywZwGQBBz4PDQ/28TmLKLVbwwEpEfEBBRMMUONTpEFwALNN4u2CDKL8m4rYcee01sv4sFkgJ4DwHdE/LmIri3gnOdHi0VmCCEcTt0zCUDP9A/2JejlQDBXgJs+U9WPIQRUkINjFIA05anqu9albU6IpddFBF2ot9R4OKa8KQDQhHwhomvv/b3efenitrrfOYeAOGkFUwCg4Dn4G7WfpMZOiVOxYBAAtKHM/J2Ibr33VWTGVlrOzeOcA3eAtDiYwcYAOGfmt6r6NYRwlJtkn6+LyBkzH4/JMgZANP+qvG9RGLX57dKiyawRGrwOIcCni0asC8bcYAcAdHvM/AuzeO+zdUJ/NSICiwFP0LmOqqIQAZDFNJaIgGjpLNCiOQiQYqLFOaf2DGSDeyAOAdClDyK68t6j9p89rFVG4XQvbuRy8dAEab+fXlfVHSFyC3TOQQkvhwL6EAAd0VBT+aVlaG9RxWDGRfeFq8lKSWW4UxTtAOCcQ60PSnuyghrRGni7rm/ojQvvPVje2SOuYwCAbH0/5JZW0+woYgiAaC7FE2HiIc2pavGzRqzpp/e+o+FKRvKs9QGwEhpuhIXeqCpIyyrKzBaOlvapUV4gXWuCabTMPAAiEru/Yq2VaGXL36bW1M9szV1gSrCYjsbSa5KuXiytH9J17BMAsSzdEXBp/TEFfG0MqKoCMwuJJTaIJdfTUneNiIozRs6digAQkbjI4jQ4YyF3VSa2z4joo93zIan4mpo/ni8i2Kz9NATuVCG0SiOEUtly8g5eNUVODnQDIDZE+UIoaR5+zKWW5yxiIChhq/u5/R9UO7bWViFcS0th7LT8h4Wp6j81ebcUkDV/b51plCffDFk1B0IR7WzzQLimsEPPjtzgGLU3xgd0PrNGRP4DAMSgPrhRMgZAGq3/WjfoMduD2WWU8HDORTdong63soIk/Y02UVlaPMerbyVMzTwikmW2JymvObx6zcK2uCfR/uS+Rm5rLN1dgQ8Vk5JbCNufo2RXK0t6JkXEZQjh9Z8QqHROEcERHjBQWSouC4B1aQiIoKb3PiAmpo9CLttXZAGwWvqufq+ht0o1WPv7ZEcLwoNCR7k9OWYBYCDEggI9fdFBpNwiWly3U6U4xgP6bHYjNxsAK5EjY7xXIKTC4wxTCXFaBMDAkTT0ClWEZwutm2WCfO00X3OAqwgAmxDdIsiMN9Yxoo2NxEYruWY9R0SOmTn6edXptWIA4srirquBACvAKZJN6gTbgsO+Ybd1V+LzfWSrATBrQKEEa+jO9YPUaH2eP13wwPsIOLaHvYLiDdP43EUAGAjoHGGG0SUQIPE3InETizCNgzBNX8TAsXwc1V00x2IAEpe4d54/ugYsRFWvShdqBRh2dGFl6b5i02P5zQDoAYHtrM4i4rCtLWiryxp2wDm9Hrfi8b3zUhXKWttma8obNgcgAQIny6L28MZYzYDQEBh86SJTH5t8NQD6E9qrNcjZSKODBy/sNEn3+txW9cVmANSof4t7HgHYAuV9nuPBW8D/ckAVfePzfqgAAAAASUVORK5CYII=" alt="">
    </div>
    <div class="send-menu">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC00lEQVR4Xu2azW7TQBDHZzYhEiqKggCJAyAa8W55Asc55hTJTtpDqlaYK0KiBl6DrwIC7rmX3nJIIlElg8ayq21C4zR21muvfXEkx/vx8/xndmcHwfALDZ8/lABKCzCcQCkBww2gdIIrEnAc5wsADBuNht9qtS6LbiErAFzXpXDS50TkCSFOLMu6KCqIdQCiOV8SkS+EOLIsi62jUNcmAK4mTERfiyaPWwGISBDRHwB4WQR5bAVA0gA7yXeIOMyrPJICkP3BGYOo1+uneYoeaQIIYLA8ENFDxOM8RI/UASzLg4iObNv+rGvo2CWAFXlMJhO/2+3+1QmGKgDaykMpgCV5vCeiYdbyyArANXmwn5jNZqdZyEMHAJnKQxsAWclDRwDy3uMb7z12KQ+tAUhWccFbc0Q8abfb52mG0bwAkLfmH4QQvPf4lAaI/2WEfiLiCwDYS6ODHbbxg4gObdt+k6SPG7PCvV7vQa1Way4WiyYA7BNRExGDOwA8Q8Rqko5TfDeRPLZKi/u+XxmNRk+r1SoD2kfEpgwIER+lOMFNm+LM1a3lsRWAuBH1+/29+XweWAwA8D2wIv4d3u/GtZHw+XeOHtPp9G3c4monAOIG77ruY5ZWBIihhFbEkJ4goohrY8PnnMx9BQDHN0WPTACsG7zneXfG4/HzZb8TAULE+xtOXv5bIA9ecnc6nY/ygzwBiBxx/gEUXgKRE6xUKldRolBOUA6D4brg2jqhEGFwMBg85K/G3jqapBTGirsQchzndxiW7m3hbZW9QkS/AODAtu3XSTotN0PL9KTT4SRg03430Xp/3WC0tgAiMjIhwueNyjLG2lhAVkdqOgA4MzEtrtTMtXGCWZm5DgCC2gHTDkeD6hHjjsd1NHNVEjCyRMbMIiljy+RMLZQ0tlTWzGJp48vl085k6N6edgcjqoGVAFQT162/0gJ0+yKqx1NagGriuvX3D17IKl9yINhzAAAAAElFTkSuQmCC" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Input'
  }
</script>

<style scoped>
  .rich-input{
    width: 100%;
    height: 56px;
    box-sizing: border-box;
  }

  .input-area{
    position: absolute;
    right: 88px;
    left: 0;

    height: 100%;
    line-height: 24px;
    outline: none;
  }

  .input-area .input{
    padding: 18px 12px;
    height: 100%;
    line-height: 20px;
    outline: none;
    box-sizing: border-box;
    overflow: auto;
  }

  .files{
    display: none;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 56px;
    height: 56px;
    text-align: center;
    line-height: 75px;
    vertical-align: middle;
    transition: all .32s ease;
  }

  .expressions{
    position: absolute;
    right: 56px;
    bottom: 0;
    width: 32px;
    height: 56px;
    text-align: center;
    line-height: 75px;
    vertical-align: middle;
    transition: all .32s ease;
  }

  .send-menu{
    position: absolute;
    right: 0;
    bottom: 0;
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
  }
</style>
