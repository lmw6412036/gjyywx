/**
 * Created by MBENBEN on 2017/6/15.
 */
let hasClass = (dom, name) => {
  if (dom) {
    let reg = new RegExp(name + "(\s|$)", 'g')
    return reg.test(dom.className)
  }
  return false;
}

let addClass = (dom, name) => {
  if (!dom) {
    return
  }
  if (!hasClass(dom, name)) {
    let arr = dom.className.split(" ");
    arr.push(name);
    dom.className = arr.join(" ");
  }
}

let removeClass = (dom, name) => {
  if (!dom) {
    return
  }
  if (hasClass(dom, name)) {
    let reg = new RegExp(name + "(\s|$)", 'g')
    dom.className = dom.className.replace(reg, '');
  }
}

export default {
  hasClass, addClass, removeClass
}
