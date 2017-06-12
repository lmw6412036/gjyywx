/**
 * Created by Administrator on 2017/6/12 0012.
 */
import axios from "axios";
export default (url)=>{
  console.log(url);
  var s2 = document.createElement("script");
  s2.src=url;
  var head=document.getElementsByName('head')[0];
  head.appendChild(s2);
}
