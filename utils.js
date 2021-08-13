

// 去除text中的特殊符号
function stripscript(s) {
    let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
    let rs = "";
    for (let i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, repaceSpecl);
    }
    return rs;
}

function repaceSpecl(match, p1, offset, string) {
    return '\\' + match
}

function setHighLight(w, str) {
    let word = w.split(/[;；,，\s]/);
    str = str + ''
    word.forEach(v => {
        if (v != '') {
            let words = stripscript(v)
            str = str.replace(new RegExp(words, "ig"), "<strong>" + v + "</strong>");
        }
    })
    return str
}



// 校验身份证
function isIdCard(idCard) {
    let flag = false
    let preg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    idCard = idCard + ''
    if (preg.test(idCard) && idCard.length == 18) {
        let idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        let idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2);
        let idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和 
        for (let i = 0; i < 17; i++) {
            idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
        }
        let idCardMod = idCardWiSum % 11;
        let idCardLast = idCard.substring(17); 
        //得到最后一位身份证号码 //如果等于2，则说明校验码是10，身份证号码最后一位应该是X 
        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码 
        if ((idCardMod == 2 && (idCardLast == "X" || idCardLast == "x")) || (idCardMod != 2 && idCardLast == idCardY[idCardMod])) {
            flag = true
        } 
    }
    return flag
}

// 匹配替换
function addTipText(key,str,appendText){
    let reg = new RegExp(`<\s*${key}[^>]*>(.*?)<\s*/\s*${key}>`, "g");
    let match = str.match(reg)
    if (match){
        match.forEach(v=>{
            let inA = v.split(reg)[1]
            let name = v + appendText
            str = str.replace(v,name)
        })
    }
    return str
}
// addTipText('mys','<mys>我的</mys>祖国','伟大') 
// <mys>我的</mys>伟大祖国"



// 计算文本宽度
function calcTextWidth(text, font) {
    
    let fonts = font || `bold 15px ${getSysFont('text')}`
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    context.font = fonts;
    let metrics = context.measureText(text);
    canvas = null;
    return metrics.width
}

// 获取系统默认字体
function getSysFont(text) {
    let span = document.createElement('span');
    let fontFamily = '';
    span.innerHTML = text;
    span.style.display = 'none';
    document.body.appendChild(span);
    fontFamily = getComputedStyle(span).fontFamily;
    span.parentNode.removeChild(span);
    return fontFamily;
}

// 转成base64
 function transPic(file,cb){
    var ready=new FileReader();
    ready.readAsDataURL(file);
    ready.onload=function(){
      var img = new Image();
      img.src = this.result;
      img.onload = function(){
        var width = this.width,
            height = this.height

        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var anw = document.createAttribute("width");
        anw.nodeValue = width;
        var anh = document.createAttribute("height");
        anh.nodeValue = height;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, width, height);  
        ctx.drawImage(this, 0, 0, width, height,0,0,width,height);
        let base64 = canvas.toDataURL("image/jpeg",  0.7);
        cb && cb(base64)
      }  
    }
  }