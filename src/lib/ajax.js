/**
 * Created by 李康飞 on 2017/6/23.
 */
/**
 * Created by Administrator on 2017/6/1 0001.
 */

let url = "//nethos.diandianys.com/api/app";
let spid = "1001";
let random = "";
for (let i = 0; i < 4; i++) {
  random += "1234567890".substr(Math.floor(Math.random() * 10), 1);
}
let base = {
  channel: 4,
  format: "JSON",
  oper: "127.0.0.1",
  spid: 1001,
  random:random,
  service:'nethos.system.atta.upload'
};


export default function (file,options) {
  
  let sign = hex_md5(hex_md5("aAr9MVS9j1") + 1001 + random);
  var form  = new FormData();
  for(var item in base){
    form.append(item,base[item])
  }
  form.append('file',file);
  console.log(file,form)
  let promiseXHR = new Promise((resolve, reject)=>{
    let xhr = new XMLHttpRequest()

    xhr.open("POST",url)
    xhr.setRequestHeader('sign',sign)
    xhr.upload.onprogress=options.progress;
    xhr.onload =function () {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400){
        resolve(JSON.parse(xhr.responseText))
      }else {
        reject(xhr.error)
      }
    }
    xhr.send(form)
  })
  return promiseXHR
}


