import { createRenderer } from "../runtime-core";
import { isOn } from "../shared/index";

export function createElement(type){
    return document.createElement(type)
}

export function patchProps(el,key,val){
    if (isOn(key)) {
        const event = key.slice(2).toLowerCase();
        el.addEventListener(event, val);
      } else {
        el.setAttribute(key, val);
      }
}


export function insert(el,parent){
    parent.appendChild(el)
}



const renderer:any = createRenderer({
  createElement,
  patchProps,
  insert
})


export function createApp(...args){
  return renderer.createApp(...args)
}

export * from '../runtime-core'