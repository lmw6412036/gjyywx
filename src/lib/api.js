/**
 * Created by Administrator on 2017/6/1 0001.
 */
import axios from "axios";
const url = "//nethos.diandianys.com/api/app";
const spid = "1001";
const pwd = "aAr9MVS9j1"

let base = {
  channel: 4,
  format: "JSON",
  oper: "127.0.0.1",
  spid: spid
};

function getRandom() {
  let random = "";
  for (let i = 0; i < 4; i++) {
    random += "1234567890".substr(Math.floor(Math.random() * 10), 1);
  }
  return random;
}

export default function (service, options) {
  base.random = getRandom();
  if (typeof options.showloading == "undefined") {
    options.showloading = true;
  }
  if (options.showloading) {
    bus.$emit("loading", {status: 'start'});
  }
  var fdata = {...base, ...options, service};
  //console.log(fdata);
  let sign = hex_md5(hex_md5(pwd) + JSON.stringify(fdata));
  //fdata.sign=sign;
  let config = {
    headers: {
      sign: sign,
      "Content-Type": "application/json"
    },
  }
  return axios.post(url, fdata, config)
    .then((res) => {
      bus.$emit("loading", {status: 'stop'});
      if (res.status == 200) {
        return res.data;
      } else {
        return res;
      }
    });
}

