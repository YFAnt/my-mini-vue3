import { createRenderer } from "../runtime-core";
import { isOn } from "../shared/index";

export function createElement(type) {
  return document.createElement(type);
}

export function patchProps(el, key, prevVal, nextVal) {
  if (isOn(key)) {
    const event = key.slice(2).toLowerCase();
    el.addEventListener(event, nextVal);
  } else {
    if (nextVal === null || nextVal === undefined) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, nextVal);
    }
  }
}

export function insert(el, parent) {
  parent.appendChild(el);
}

export function remove(child) {
  const parent = child.parentNode;
  if (parent) {
    parent.removeChild(child);
  }
}

export function setElementText(el, text) {
  el.textContent = text;
}
const renderer: any = createRenderer({
  createElement,
  patchProps,
  insert,
  remove,
  setElementText,
});

export function createApp(...args) {
  return renderer.createApp(...args);
}

export * from "../runtime-core";
