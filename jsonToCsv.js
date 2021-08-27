//  数组数据转成csv 并下载
function formatData(arr){
  if (arr && arr.length) {
    let rowName = Object.keys(arr[0]),
    jlen = rowName.length ,
    str = `${rowName.join(',')}\n`;
    for(let i = 0 ,len = arr.length ; i < len ; i++ ){
      for(let j= 0; j < jlen ; j++){
        let key = rowName[j]
          str+=`${arr[i][key] + '\t'},`;     
      }
      str+='\n';
    }
    dataToExcel(str)
  }else{
    alert('无数据')
  }
}

function dataToExcel(str){
  let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
  let link = document.createElement("a");
  link.href = uri;
  link.download =  `${new Date().getTime()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}