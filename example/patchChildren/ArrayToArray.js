import { ref, h } from "../../lib/guide-mini-vue.esm.js";
//左侧对比
//(a b) c 
//(a b) d  e
// const prevChildren = [
//   h('p',{key: 'A'}, 'A'),
//   h('p',{key: 'B'}, 'B'),
//   h('p',{key: 'C'}, 'C')
// ]
// const nextChildren = [
//   h('p',{key: 'A'}, 'A'),
//   h('p',{key: 'B'}, 'B'),
//   h('p',{key: 'D'}, 'D'),
//   h('p',{key: 'E'}, 'E'),
// ]

//2,右侧对比
//a (b c)
//d e (b c)
// const prevChildren = [
//   h('p',{key: 'A'}, 'A'),
//   h('p',{key: 'B'}, 'B'),
//   h('p',{key: 'C'}, 'C')
// ]
// const nextChildren = [
//   h('p',{key: 'D'}, 'D'),
//   h('p',{key: 'E'}, 'E'),
//   h('p',{key: 'B'}, 'B'),
//   h('p',{key: 'C'}, 'C'),
// ]
//
//3:右侧新增
// const prevChildren = [
//   h('p',{key: 'A'}, 'A'),
//   h('p',{key: 'B'}, 'B'),
// ]
// const nextChildren = [
//   h('p',{key: 'A'}, 'A'),
//   h('p',{key: 'B'}, 'B'),
//   h('p',{key: 'C'}, 'C'),
// ]

//4:左侧新增
// const prevChildren = [
//   h('p',{key: 'A'}, 'A'),
//   h('p',{key: 'B'}, 'B'),
// ]
// const nextChildren = [
//   h('p',{key: 'C'}, 'C'),
//   h('p',{key: 'A'}, 'A'),
//   h('p',{key: 'B'}, 'B'),
// ]
// 5老的比新的长
// const prevChildren = [
//   h('p',{key: 'A'}, 'A'),
//   h('p',{key: 'B'}, 'B'),
//   h('p',{key: 'C'}, 'C'),
// ]
// const nextChildren = [
//   h('p',{key: 'A'}, 'A'),
//   h('p',{key: 'B'}, 'B'),
// ]


// const prevChildren = [
//   h('p',{key: 'A'}, 'A'),
//   h('p',{key: 'B'}, 'B'),
//   h('p',{key: 'C'}, 'C'),
// ]
// const nextChildren = [
//   h('p',{key: 'B'}, 'B'),
//   h('p',{key: 'C'}, 'C'),
// ]


// 6: 数组老的新的都有


// const prevChildren = [
//   h('p',{key: 'A'}, 'A'),
//   h('p',{key: 'B'}, 'B'),
//   h('p',{key: 'C',id: 'c-prev'}, 'C'),
//   h('p',{key: 'D'}, 'D'),
//   h('p',{key: 'E'}, 'E'),
//   h('p',{key: 'F'}, 'F'),
// ]
//
// const nextChildren = [
//   h('p',{key: 'A'}, 'A'),
//   h('p',{key: 'B'}, 'B'),
//   h('p',{key: 'E'}, 'E'),
//   h('p',{key: 'C',id: 'c-next'}, 'C'),
//   h('p',{key: 'F'}, 'F'),
//   h('p',{key: 'G'}, 'G'),
// ]
//

//移动
const prevChildren = [
  h('p',{key: 'A'}, 'A'),
  h('p',{key: 'B'}, 'B'),
  h('p',{key: 'C',}, 'C'),
  h('p',{key: 'D'}, 'D'),
  h('p',{key: 'E'}, 'E'),
  h('p',{key: 'F'}, 'F'),
  h('p',{key: 'G'}, 'G'),
]

const nextChildren = [
  h('p',{key: 'A'}, 'A'),
  h('p',{key: 'B'}, 'B'),
  h('p',{key: 'E'}, 'E'),
  h('p',{key: 'C'}, 'C'),
  h('p',{key: 'D'}, 'D'),
  h('p',{key: 'H'}, 'H'),
  h('p',{key: 'F'}, 'F'),
  h('p',{key: 'G'}, 'G'),
]



export default {
  name: "ArrayToArray",
  setup() {
    const isChange = ref(false);
    window.isChange = isChange;

    return {
      isChange,
    };
  },
  render() {
    const self = this;
    return self.isChange
      ? h("div", {}, nextChildren)
      : h("div", {}, prevChildren);
  },
};
