import { isReactive, isReadonly, shallowReadonly } from "../reactive";

describe('shallowReadonly', () => {
   it('should not make non-reactive properties reactive', () => {
      const props = shallowReadonly({ n: { foo: 1 }})
      expect(isReactive(props)).toBe(true)
      expect(isReadonly(props.n)).toBe(false)
   }); 
})