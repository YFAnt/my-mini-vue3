import { isReactive, reactive, isProxy } from "../reactive";

describe('reactive', () => {
    it('happy path', () => {
        const original = { foo: 1 }
        const observed = reactive(original)

        expect(original).not.toBe(observed)
        expect(observed.foo).toBe(1)
        expect(isReactive(observed)).toBe(true)
        expect(isReactive(original)).toBe(false)

        expect(isProxy(observed)).toBe(true)
    });

    it('nested reactive', () => {
        const original = {
            nested: {
                foo: 1
            },
            array: [{ bar: 2 }]
        }
        const observed = reactive(original)
        expect(isReactive(observed.nested)).toBe(true)
        expect(isReactive(observed.array)).toBe(true)
        expect(isReactive(observed.array[0])).toBe(true)
        // expect(isReactive(observed.nested.foo)).toBe(false) 
        // expect(isReactive(observed.array[0].bar)).toBe(false) 
        // expect(isReactive(original)).toBe(false) 
        // expect(isReactive(original.nested)).toBe(false) 
        // expect(isReactive(original.array)).toBe(false) 
        // expect(isReactive(original.array[0])).toBe(false) 
        // expect(isReactive(original.nested.foo)).toBe(false) 
        // expect(isReactive(original.array[0].bar)).toBe(false)
    })
})