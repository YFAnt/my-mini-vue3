import { h, renderSlots } from "../../lib/guide-mini-vue.esm.js";

export const Foo = {
    setup() {
        return {}
    },
    render() {
        const age = 14
        const foo = h('p', {}, 'foo')
        //获取指定渲染的元素
        //获取渲染的位置
        return h('div', {}, [renderSlots(this.$slots, 'header', { age }), foo, renderSlots(this.$slots, 'footer')])
    }
}