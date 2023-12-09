import { ref, h } from "../../lib/guide-mini-vue.esm.js";
const nextChildren = [h("div", {}, "A"), h("div", {}, "B")];
const prevChildren = "oldChild";

export default {
  name: "ArrayToText",
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
