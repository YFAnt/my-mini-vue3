import { isObject } from "../shared/index"
import { readOnlyHandlers, mutableHandlers ,shallowReadonlyHandlers } from "./baseHandlers"

export const enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive',
    IS_READONLY = '__v_isReadonly'
}

export function reactive(raw: any) {
    return createActiveObject(raw, mutableHandlers)
}


export function readonly(raw: any) {
    return createActiveObject(raw, readOnlyHandlers)
}

export function shallowReadonly(raw: any){
    return createActiveObject(raw, shallowReadonlyHandlers)
}


export function isReactive(raw: any) {
    return !!raw[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(raw: any) {
    return !!raw[ReactiveFlags.IS_READONLY]
}

export function isProxy(raw: any){
    return isReactive(raw) || isReadonly(raw)
}


function createActiveObject(raw: any, baseHandlers) {
    if(!isObject(raw)){
        console.warn(`target ${raw} is not object` )
        return
    }
    return new Proxy(raw, baseHandlers)
}


