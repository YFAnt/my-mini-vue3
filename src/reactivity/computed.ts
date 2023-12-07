import { ReactiveEffect } from "./effect"

class ComputedRefImpl{
    private _getter: any
    private dirty = true
    private _value: any
    private _effect: ReactiveEffect
    constructor(getter){
        this._getter = getter
        this._effect = new ReactiveEffect(getter, ()=>{
            if(!this.dirty){
                this.dirty = true
            }
        }) 
    }
    get value(){
        if(this.dirty){
            this.dirty = false
            this._value = this._effect.run()
        }
        return this._value
    }
    // set value(){
   
    // }
}



export function computed(fn){
    return new ComputedRefImpl(fn)
}