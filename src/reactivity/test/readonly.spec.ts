import { isReadonly, readonly, isProxy } from "../reactive"

describe('readonly', () => {
    it('happy path', () => {
        const original = {
            foo: 1,
            bar: {
                baz: 2
            }
        }
        const wrapped = readonly(original)
        expect(wrapped).not.toBe(original)
        expect(isReadonly(wrapped)).toBe(true)
        expect(isReadonly(original)).toBe(false)
        expect(wrapped.foo).toBe(1)
        expect(isProxy(wrapped)).toBe(true)
    })
    it('warn then call set', () => {
        console.warn = jest.fn()
        const user = readonly({
            age: 10
        })
        user.age = 11
        expect(console.warn).toBeCalled()
    })
    it('nested readonly', () => {
        const original = {
            nested: {
                foo: 1,
            },
            array: [{ bar: 2 }]
        }
        const wrapped = readonly(original)
        expect(isReadonly(wrapped.nested)).toBe(true)
        expect(isReadonly(wrapped.array)).toBe(true)
        expect(isReadonly(wrapped.array[0])).toBe(true)
    })
})