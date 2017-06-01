/**
 * Created by Administrator on 2017/6/1 0001.
 */
export default {
  session:{
    _get(name){
      let v=sessionStorage.getItem(name);
      if(v){
        return JSON.parse(v);
      }else{
        return null
      }
    },
    _set(name,value){
      if(value){
        value=JSON.stringify(value);
      }
      sessionStorage.setItem(name,value);
    }
  },
  local:{
    _get(name){
      let v=localStorage.getItem(name);
      if(v){
        return JSON.parse(v);
      }else{
        return null
      }
    },
    _set(name,value){
      if(value){
        value=JSON.stringify(value);
      }
      localStorage.setItem(name,value);
    }
  }
};
