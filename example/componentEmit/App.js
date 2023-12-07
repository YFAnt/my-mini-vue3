import { h } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js'
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
        [h('div', {}, 'hi,' + this.msg), h(Foo,
            {
                count: 1,
                onAdd(a,b){
                    console.log('onAdd',a,b)
                },
                onAddFoo(){
                    console.log('addFoo');
                }
            })]
        // 'hi , mini-vue'
        
        // [h('p', {class:'red'},'hi'), h('p',{ class:'blue'},'mini-vue')]
        )
    },
    setup() {
        return {
            msg: 'mini-vue-haha'  //data中的数据可以在template中使用，但是不能在template中修改，只能在setup中修改，这样setup中的数据'
        }
    }
}