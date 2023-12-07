import { h } from "../../lib/guide-mini-vue.esm.js";

export const Foo = {
    setup(props, { emit }){
        // console.log(props)
        // set会失败 props 是shallowReadonly
        // props.count++
        // console.log(props)
        const emitAdd = () => {
            console.log('emit add ')
            emit('add', 1,2)
            emit('add-foo')
        }
        return {
            emitAdd
        }
    },
    render(){
        const btn = h('button', {
            onClick: this.emitAdd
        }, "emitAdd")
        const foo = h('p', {}, "foo, " + this.count)
        return h('div', {}, [foo, btn]) 
    }
}