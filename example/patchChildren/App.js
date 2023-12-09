import { h } from "../../lib/guide-mini-vue.esm.js";
import ArrayToText from "./ArrayToText.js";
// import ArrayToArray from "./ArrayToArray.js";
import TextToText from "./TextToText.js";
import TextToArray from "./TextToArray.js";
export const App = {
  name: "App",
  setup() {},
  render() {
    return h("div", { tid: 1 }, [h("p", {}, "主页"), 
      // 老的是text 新的也是text
      // h(TextToText)
     //老的是数组，新的是text
      // h(ArrayToText)
      //老的是text 新的是数组
      h(TextToArray)
    ]);
  },
};
