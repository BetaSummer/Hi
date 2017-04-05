const RandomColor = require('randomcolor');

/**
 * 随机产生像素点 (像素头像的左半边数据)
 * @param {Object} opt
 *   {Number} opt.width -> 采集像素的范围宽度  default: 120
 *   {Number} opt.height -> 采集像素的范围高度  default: 120
 *   {Number} opt.size  -> 像素的大小  default: 22
 * 
 * @returns 
 */
function randomPixels(opt = {width: 120, height: 120, size: 22}) {
  if(!opt) {
    throw Error('请设置参数，opt cannot null !!!');
  }

  let data =[];
  let size = opt.size;
  let color = RandomColor({count: 2});

  let ii = Math.ceil(opt.width / size * 0.5);
  let jj = Math.ceil(opt.height / size);
  
  if(typeof size !== 'number' || typeof ii !== 'number' || typeof jj !== 'number') {
    throw Error('参数类型错误!!!');
  }

  for(let i = 0; i < ii; i++) {
    for(let j = 0; j < jj; j++) {
      data.push({
        position: {
          x: i * size,
          y: j * size
        },
        size: size,
        color: Math.floor(Math.random() * 10) < 5 ? color[0] : color[1]
      });
    }
  }

  return data;
}

/**
 * 返回聊天者的基本信息
 * 
 * @param {String} name 
 * @returns 
 */
function chatter(name = '你的名字') {
  return {
    name: name,
    logo: {
      width: 120,
      pixels: randomPixels()
    },
    color: RandomColor({luminosity: 'dark'})
  }
}

module.exports = chatter;
