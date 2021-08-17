let  fs = require('fs');
let  join = require('path').join;
let  path = require('path');

// 获取文件夹下面所有文件，返回文件名数组
function runFilesNameSync(startPath) {
  let result = [];
  function finder(path) {
    let files = fs.readdirSync(path);
    files.forEach( val => {
      let fPath = join(path, val);
      let stats = fs.statSync(fPath);
      if (stats.isDirectory()) finder(fPath);
      if (stats.isFile()) result.push(fPath);
    })
  }
  finder(startPath)
  return result
}

// 写入文件 传入文件名，数据
function writeFileData(file, data) {
  let tips = false;
  fs.writeFile(file, data, {flag:'a',encoding:'utf-8'},function(error) {
    if (error) {
      throw error;
    } else {
      console.log("文件已保存", file);
      tips = true
    }
  });
  return tips;
}


// 升级版：
// 如果传入第二个参数，就按每个细分的夹子一个json存贮。否则就是和简单版一个效果

// 获取文件夹下面所有文件，写入文件
function runFilesNameToFile(startPath, reStart) {
  let result = [],
    arr = [],
    stl = startPath.length - 2,
    jiaName, subLen = 0;

  function finder(path) {
    let files = fs.readdirSync(path);
    files.forEach( val => {
      let fPath = join(path, val);
      let stats = fs.statSync(fPath);
      if (stats.isDirectory()) {
        finder(fPath);
        jiaName = fPath.substr(stl);
        if (arr.length > 0 && jiaName) {
          result.push(JSON.stringify({
            name: jiaName,
            urls: arr.toString(),
          }));
        }
        arr = [];
        jiaName = fPath.substr(stl);
        subLen = jiaName.length;
      }
      if (stats.isFile()) {
        if (reStart) {
          var lname = fPath.substr(subLen);
          arr.push(lname);
        } else {
          result.push(fPath);
        }
      }
    });
  }
  finder(startPath);
  if (reStart) {
    writeFileData(reStart + '.txt', JSON.stringify(result,null,4));
  } else {
    writeFileData(new Date().getTime() + '.txt', JSON.stringify(result,null,4));
  }
}

// 读取文件数据
function getFileData(file) {
  fs.readFile(file, {
    flag: 'r+',
    encoding: 'utf-8'
  }, function(err, data) {
    if (err) {
      console.log("获取数据失败");
    } else {
      console.log("获取数据成功", data);
    }
  })
}
