import { h, ref } from "../../lib/guide-mini-vue.esm.js";

export const App = {
  name: "App",
  setup() {
    const count = ref(0);
    const onClick = () => {
      count.value++;
    };

    const props = ref({
      bar:'bar',
      foo:'foo'
    })


    const onChangePropsDemo1 = ()=>{
      props.value.foo =  'new-foo'
    }

    function onChangePropsDemo2() {
      props.value.foo = undefined
    }
    function onChangePropsDemo3(){
      props.value ={
        foo:'foo'
      }
    }
    return {
      count,
      onClick,
      props,
      onChangePropsDemo1,
      onChangePropsDemo2,
      onChangePropsDemo3
    };
  },
  render() {
    return h(
      "div",
      {
        id: 'root',
        ...this.props
      },
      [
        h("div", {}, "count:" + this.count),
        h("button", { onClick: this.onClick }, "click"),
        h("button", { onClick: this.onChangePropsDemo1 }, "foo 赋值了"),
        h("button", { onClick: this.onChangePropsDemo2 }, "foo 为 undefined"),
        h("button", { onClick: this.onChangePropsDemo3 }, "只有foo了"),
      ],
    );
  },
};
