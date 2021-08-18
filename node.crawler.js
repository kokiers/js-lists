var express = require('express');
var app = express();
var fs = require('fs');
var superagent = require('superagent');
var cheerio = require('cheerio');
var request = require('request');
var md5 = require('js-md5');
var path = require('path');


let resWord= ['橘子','香蕉','西瓜','怪兽']


// TODO 需要破解反爬虫
function getPixabayPic(resWord,i,cookie) {

  let key = resWord[i], errFlag = false
  if (!key || key == undefined) {
    return false;
  }
  var pre = './pixabay/', items = []
    url = 'https://pixabay.com/zh/images/search/' + encodeURI(key) + '?min_width=500&min_height=250' //?hp=&image_type=&cat=&min_width=&min_height=&q=' +  + '&order=popular';

  mkdir(pre + key);
  let params = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
  }
  cookie && (params.cookie = cookie)
 
  superagent.get(url).set(params).end(function(err, sres) {
    if (err) {
      errFlag = true

      cookie = err.response.header['set-cookie'] ? err.response.header['set-cookie'][0] : ''
     
      getPixabayPic(resWord[i],i,cookie);
      writeFileData('error.log',JSON.stringify(err.response,null,4))
      return
      // return next(err, 'cuowu');
    }else{
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后            
      var $ = cheerio.load(sres.text);
      // 遍历网页实体获取内容            
      $('.item a img').each(function(idx, element) {
        var $element = $(element), preUrl;

        if ($element.attr('src') == '/static/img/blank.gif') {
          preUrl = $element.attr('data-lazy');
        } else {
          preUrl = $element.attr('src');
        }
        items.push({
          href: preUrl,
          name: key + '___' + $element.attr('title'),
          title: key,
        });
      });
      saveDataImg(items, pre);
      !errFlag && i++;
      if ((i < resWord.length - 1) && !errFlag) {
        getPixabayPic(resWord[i],i,cookie);
      }
    }
  });
}

getPixabayPic(resWord,0)

function saveDataImg(items, pre) {
  items.forEach(val=>{
    savedImg(val,pre)
  })
}

function savedImg(arg, dir) {
  var img_filename = md5(arg['name']) + '.jpg';
  var img_src = arg['href'];

  //if https add refer
  request.head(img_src + '?f=jahah', function(err, res, body) {
    if (err) {
      console.log(err);
    }
  });
  var writable = fs.createWriteStream(dir + arg['title'] + '/' + img_filename);
  request(img_src).pipe(writable);

  writable.on('finish', function() {
    console.log('保存完毕')
  })

}


function mkdir(dirpath, dirname) {
  if (typeof dirname === "undefined") {
    if (fs.existsSync(dirpath)) {
      return;
    } else {
      mkdir(dirpath, path.dirname(dirpath));
    }
  } else {
    if (dirname !== path.dirname(dirpath)) {
      mkdir(dirpath);
      return;
    }
    if (fs.existsSync(dirname)) {
      fs.mkdirSync(dirpath)
    } else {
      mkdir(dirname, path.dirname(dirname));
      fs.mkdirSync(dirpath);
    }
  }
}

// mkdir('./program');
// mkdir('./program'+'/hah');

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
