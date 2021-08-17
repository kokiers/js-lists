const fs = require('fs');
const readline = require('readline');

// 之前从网盘看一个小说，没有目录，很是难受。后得知，有 第xx章字眼可以生成目录。遂整理一下啦。
// 4.万鼠拜坟 转成 第4章.万鼠拜坟 如此目录可生成
const rl = readline.createInterface({
    input: fs.createReadStream('1629165271708.txt'),
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
  let text = line.toString(),
  reg = /^[1-9]\d*(.|、)/
  if (reg.test(text)) {
    let regex = /\（(.+?)\）/;  
    let matchx = text.match(regex)
    if (matchx) {
      text = text.replace(matchx[0],'')
    }
    let regx = /^[1-9]\d*/
    let match = text.match(regx)
    if (match) {
      text = text.replace(match[0],`第${match[0]}章`)
    }
    text = `\n${text}`
  }
  if (text) {
    writeFileData('new.txt',text + '\n')
  }
});

rl.on('close',()=>{
  console.log('close')
})

function writeFileData(file, data) {
  let tips = false;
  fs.writeFile(file, data, {flag:'a',encoding:'utf-8'},function(error) {
    if (error) {
      throw error;
    } else {
      tips = true
    }
  });
  return tips;
}