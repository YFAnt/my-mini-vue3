import { extend, isObject } from "../shared"
import { track, trigger } from "./effect"
import { ReactiveFlags, reactive, readonly } from "./reactive"

const get = createGetter()

const set = createSetter()

const readonlyGet = createGetter(true)
const shallowReactiveGet = createGetter(true, true)


function createGetter(isReadOnly = false, shallow = false) {
    return function get(target, key) {
        if (key === ReactiveFlags.IS_REACTIVE) {
            return !isReadOnly
        } else if (key === ReactiveFlags.IS_READONLY) {
            return isReadOnly
        }
        const res = Reflect.get(target, key)

        if(shallow){
            return res
        }
        // 如果res 是对象
        if (isObject(res)) {
            return isReadOnly ? readonly(res) : reactive(res)
        }
        
        if (!isReadOnly) {
            track(target, key)
        }
        return res
    }
}

function createSetter() {
    return function set(target, key, value) {
        const res = Reflect.set(target, key, value)
        trigger(target, key)
        return res
    }

}
export const mutableHandlers = {
    get,
    set
}


export const readOnlyHandlers = {
    get: readonlyGet,
    set(target, key, value) {
        console.warn(`key:${key} set fail,because target is readonly`)
        return true
    }
}


export const shallowReadonlyHandlers = extend({}, readOnlyHandlers, {
    get: shallowReactiveGet,
})