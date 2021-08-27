// 数组
// 数组存在
function inArray(val,arr) {
  let arlen = arr.length; 
  let test = '';    
    for (let s = 0; s < arlen; s++) {
        test = arr[s].toString();
        if (test == val) {
            return true;
        }
    }
    return false;
};

// 对象拷贝
function deepCopyObj(obj) { 

  let str, result = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), 
        result = JSON.parse(str); 
    } else {
        for(let i in obj){
            result[i] = typeof obj[i] === 'object' ? deepCopyObj(obj[i]) : obj[i]; 
        }
    }

    return result; 
};

// 日期
// 日期格式化
function formatTime(time,fmt) {
  fmt = fmt || 'yyyy-MM-dd'
  time = new Date(time)
  let o = {
    "M+": time.getMonth() + 1,
    "d+": time.getDate(),
    "H+": time.getHours(),
    "m+": time.getMinutes(),
    "s+": time.getSeconds(),
    "S+": time.getMilliseconds()
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));
    }
  }
  return fmt;
}

// 字符串String
// 字符串分隔空格
function andleSplit(str){
    var temp = str.split(/[\s+,]/g);
    for (var i = 0; i < temp.length; i++) {
        if (temp[i] == "") {                    
            temp.splice(i, 1);
            i--;
        }
    }
    return temp;
}

// string 替换
String.prototype.format = String.prototype.f = function () {
    var s = this,
        i = arguments.length;
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};
var template1="我是{0}，今年{1}了,biubiubiu{2}";
var result1=template1.format("loogn",22,9090);

// 数字Number
// 数字千分位格式化
function toThousands(num) {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}

// url
// url 分割query
function splitParam(href) {
    href = href || location.search;
    var arr={},
    reg = new RegExp( "([^?=&]+)(=([^&]*))?", "g" );
    href && href.replace(reg,function( $0, $1, $2, $3 ){
        arr[$1] = $3;    
    });
    return arr;
}

// url 分割query
// 保留部分参数

function addParam(href) {
    href = href || location.search;
    var name = ['f','ref','isapp','ssc','usc','td','dgfromsource','_vs'],
    str='',
    arr={},
    reg = new RegExp( "([^?=&]+)(=([^&]*))?", "g" );
    href && href.replace(reg,function( $0, $1, $2, $3 ){
        if (name.includes($1)) {            
            arr[$1] = $3;
        }        
    });
    for(var i in arr){
        str +=  i + '=' + arr[i] + '&';
    }
    if (str.length) {
        str = str.substring(0, str.length-1);
    }
    return str;
}

// a标签 解析 url
function parseURL(url) {
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port || '80',
        query: a.search,
        params: (function() {
            var ret = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length,
                i = 0,
                s;
            for (; i < len; i++) {
                if (!seg[i]) { continue; } s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace(' #', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
}


// 字符串混淆 加密 解密
function strChange(str,c){
    if (c){
      let nstr = '' ,
      index = str.indexOf('L'),
      iSplit = str.substr(0,index),
      ilen = str.length
      let arr = Array.from(str)
      let j = 0;
      let mixL = iSplit >= 24 ? 24 : iSplit;
      let after = '';
      for(let i=index+1;i<ilen;i+=2){
        if (j >= mixL){
          after = str.substr(i)
          break;
        }
        nstr += arr[i]
        j++
      } 
      return nstr + after
    }else{
      let ilen = str.length, nstr = ilen + 'L',flag = (Math.random().toString(36) + new Date().getTime()).substr(2)
      let arr = Array.from(str),brr = Array.from(flag)
      let mixL = ilen <= 24 ? ilen : 24;
      let after = ilen <= 24 ? '' : str.substr(24);
      for(let i=0;i<mixL;i++){
        nstr += arr[i] + brr[i]
      } 
      return nstr + after
    }
  }

strChange('kokier')
//"6Lkcopkeipe5rw"
strChange("6Lkcopkeipe5rw",1)
//"kokier"数组

 function showSize(base64url) {
    //把头部去掉
    var str = base64url.replace('data:image/png;base64,', '');
    // 找到等号，把等号也去掉
    var equalIndex = str.indexOf('=');
    if(str.indexOf('=')>0) {
        str=str.substring(0, equalIndex);
    }
    // 原来的字符流大小，单位为字节
    var strLength=str.length;
    // 计算后得到的文件流大小，单位为字节
    var fileLength=parseInt(strLength-(strLength/8)*2);
    // 由字节转换为kb
    var size = "";
    size = (fileLength / 1024).toFixed(2);
    var sizeStr = size + ""; //转成字符串
    var index = sizeStr.indexOf("."); //获取小数点处的索引
    var dou = sizeStr.substr(index + 1, 2) //获取小数点后两位的值
    if (dou == "00") { //判断后两位是否为00，如果是则删除00                
      return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }
    return size;
  }