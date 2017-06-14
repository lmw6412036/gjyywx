/**
 * Created by Administrator on 2017/6/1 0001.
 */
import axios from "axios";
let url = "//nethos.diandianys.com/api/app";
let spid = "1001";
let random = "";
for (let i = 0; i < 4; i++) {
  random += "1234567890".substr(Math.floor(Math.random() * 10), 1);
}
let sign = hex_md5(hex_md5("aAr9MVS9j1") + spid + random);

let base = {
  channel: 4,
  format: "JSON",
  oper: "127.0.0.1",
  spid: spid,
  random: random,
  sign: sign
};
let config = {
  headers: {"Content-Type": "application/json"},
}

export default function (service, options) {
  if (typeof options.showloading == "undefined") {
    options.showloading = true;
  }
  if (options.showloading) {
    bus.$emit("loading", {status: 'start'});
  }
  return axios.post(url, {...base, ...options, service}, config)
    .then((res) => {
      bus.$emit("loading", {status: 'stop'});
      if (res.status == 200) {
        return res.data;
      } else {
        return res;
      }
    });
}

