import { h, getCurrentInstance } from "../../lib/guide-mini-vue.esm.js";

export const Foo = {
    setup() {
        const instance = getCurrentInstance()
        console.log(instance,'Foo');
        return {}
    },
    render() {
        return h('div', {}, 'foo')
    }
}