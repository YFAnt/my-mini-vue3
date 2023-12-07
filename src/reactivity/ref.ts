import { hasChanged, isObject } from "../shared"
import { isTracking, trackEffects, triggerEffects } from "./effect"
import { reactive } from "./reactive"

class RefImpl {
    private _value: any
    private _rawValue: any
    public dep: Set<any> = new Set()
    public __v_isRef = true  //表示是ref类型
    constructor(value) {
        this._rawValue = value
        this._value = convert(value)
        this.dep = new Set()
    }
    get value() {
        trackRefValue(this)  //收集依赖 
        return this._value
    }
    set value(newValue) {
        if (hasChanged(this._rawValue, newValue)) {
            this._value = convert(newValue)
            this._rawValue = newValue
            triggerEffects(this.dep)
        }
    }
}

function trackRefValue(ref) {
    if (isTracking()) {
        trackEffects(ref.dep)
    }
}

function convert(value) {
    return isObject(value) ? reactive(value) : value
}


export function ref(raw) {
    return new RefImpl(raw)
}


export function isRef(ref) {
    return !!ref.__v_isRef
}


export function unRef(ref) {
    return isRef(ref) ? ref.value : ref
}


export function proxyRefs(objectWithRef) {
    return new Proxy(objectWithRef,{
        get(target,key) {
            return unRef(Reflect.get(target,key))
        },
        set(target,key,value) {
            if(isRef(target[key]) && !isRef(value)){
                return target[key].value = value
            }else{
                return Reflect.set(target,key,value)
            }   
        }
    })
}