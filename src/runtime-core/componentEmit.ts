import { camelize, toHandlerKey } from "../shared/index"

export function emit(instance, event, ...args){
    const { props } = instance
    //add -> Add
    //add-foo -> AddFoo
    const handlerName = toHandlerKey(camelize(event))
    const handler = props[handlerName]
    handler && handler(...args)
}