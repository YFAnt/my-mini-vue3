import { h } from '../../lib/guide-mini-vue.esm.js'
// window.self = null
export const App = {
    //.vue
    //<template></template>
    render() {
        // window.self = this
        return h('div', {
            id:'root',
            class:['red','hard'],
            // onClick(){
            //     console.log('click')
            // }
        }, 
        // 'hi , mini-vue'
        'hi,' + this.msg
        // [h('p', {class:'red'},'hi'), h('p',{ class:'blue'},'mini-vue')]
        )
    },
    setup() {
        return {
            msg: 'mini-vue-haha'  //data中的数据可以在template中使用，但是不能在template中修改，只能在setup中修改，这样setup中的数据'
        }
    }
}