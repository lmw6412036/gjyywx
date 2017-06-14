/**
 * Created by MBENBEN on 2017/6/15.
 */
let hasClass=(dom,name) => {
    if(dom){
        let reg=new RegExp(name+"(\s|$)",'g')
        console.log('reg',reg)
        return reg.test(dom.className)
    }
}





export default {
    hasClass
}
