import { extend } from "../shared";

let activeEffect: ReactiveEffect;
let shouldTrack: boolean
const targetMap = new Map()



export class ReactiveEffect {
    private _fn: any
    active = true; //是否激活，默认激活，如果stop被调用，active为false，不再调用run方法，如果active为true，则再�
    onStop?: () => void;
    deps: Array<Set<ReactiveEffect>> = []
    constructor(fn: any, public scheduler?: any) {
        this._fn = fn
    }
    run() {
        if (!this.active) {
            return this._fn()
        }
        shouldTrack = true
        activeEffect = this
        const result = this._fn()
        shouldTrack = false
        return result
    }
    stop() {
        if (this.active) {
            cleanupEffect(this)
            if (this.onStop) {
                this.onStop()
            }
            this.active = false;
        }

    }
}
function cleanupEffect(effect: ReactiveEffect) {
    effect.deps.forEach((dep: Set<ReactiveEffect>) => {
        dep.delete(effect)
    })
    effect.deps.length = 0
}


export function track(target: Object, key: string | symbol) {
    if (!isTracking()) return;
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Set()
        depsMap.set(key, dep)
    }
    trackEffects(dep)
}

export function trackEffects(dep){
    if (dep.has(activeEffect)) return
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
}

export function isTracking() {
    return shouldTrack && activeEffect !== undefined
}

export function trigger(target: Object, key: string | symbol) {
    const depsMap = targetMap.get(target)
   
    const dep = depsMap.get(key)
    triggerEffects(dep)
}
export function triggerEffects(dep){
    for (const effect of dep) {
        if (effect.scheduler) {
            effect.scheduler()
        } else {
            effect.run()
        }
    }
}



export function effect(fn: Function, options: any = {}) {
    const _effect = new ReactiveEffect(fn, options.scheduler)
    Object.assign(_effect, options)
    extend(_effect, options)
    _effect.run()
    const runner: any = _effect.run.bind(_effect)
    runner.effect = _effect
    return runner
}

export function stop(runner: any) {
    runner.effect.stop()
}
