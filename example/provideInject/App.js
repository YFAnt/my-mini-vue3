import { h, provide, inject } from "../../lib/guide-mini-vue.esm.js";

const Provider = {
  name: "Provider",
  setup() {
    provide("foo", "fooval");
    provide("bar", "barval");
  },
  render() {
    return h("div", {}, [h("p", {}, "Provider"), h(ProviderTwo)]);
  },
};

const ProviderTwo = {
  name: "ProviderTwo",
  setup() {
    provide("foo", "fooTwo");
    const foo = inject('foo')
    return {
      foo
    }
  },
  render() {
    return h("div", {}, [h("p", {}, `ProviderTwo : ${this.foo}`), h(Consumer)]);
  },
};
const Consumer = {
  name: "Consumer",
  setup() {
    const foo = inject("foo");
    const bar = inject("bar");
    // const baz = inject("baz",'baz');
    const baz = inject("baz",()=> 'baz');

    return {
      foo,
      bar,
      baz
    };
  },
  render() {
    return h("div", {}, `Consumer: ${this.foo} - ${this.bar} - ${this.baz}`);
  },
};

export const App = {
  name: "App",
  setup() {},
  render() {
    return h("div", {}, [h("p", {}, "appInject"), h(Provider)]);
  },
};
