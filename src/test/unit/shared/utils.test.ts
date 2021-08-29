import { eq, groupBy, isString, nonNullable, when, zip } from '~/backend/shared/utils'

describe('zip', () => {
  it('should works', () => {
    const res = zip([1, 2, 3, 4], ['a', 'b', 'c', 'd'])
    expect(res).toStrictEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
      [4, 'd'],
    ])
  })
  it('should not works when length are different', () => {
    expect(() => {
      zip([1, 2, 3, 4], ['a', 'b', 'c'])
    }).toThrow()
  })
})

describe('isString', () => {
  it('should work', () => {
    const str = 'string'
    expect(isString(str)).toBeTruthy()
  })
  it('should be false when val is number', () => {
    const num = 0
    expect(isString(num)).toBeFalsy()
  })
})

describe('nonNullable', () => {
  it('shuld remove null', () => {
    const nonNullArr = nonNullable(['a', 'b', 'c', 'd', null])
    expect(nonNullArr).toBeTruthy()
  })
  it('should remove all null', () => {
    const nonNullArr = nonNullable([null, null, null])
    expect(nonNullArr).toBeTruthy()
  })
})

describe('groupBy', () => {
  it('should work with domains', () => {
    const data = [
      { id: 1, domain: 'test1.com' },
      { id: 2, domain: 'test2.com' },
      { id: 3, domain: 'test1.com' },
    ]
    const res = groupBy(data, 'domain')
    const ans = {
      'test2.com': [{ domain: 'test2.com', id: 2 }],
      'test1.com': [
        { domain: 'test1.com', id: 1 },
        { domain: 'test1.com', id: 3 },
      ],
    }
    expect(res).toStrictEqual(ans)
  })
})

describe('when function', () => {
  it('should return matched val', () => {
    const hoge = 1
    const res = when(hoge)
      .on(eq(1), () => 'A')
      .on(eq(2), () => 'B')
      .on(eq(3), () => 'C')
      .otherwise(() => 'default')
    expect(res).toBe('A')
  })

  it('should return default when doesnt match', () => {
    const hoge = 4
    const res = when(hoge)
      .on(eq(1), () => 'A')
      .on(eq(2), () => 'B')
      .on(eq(3), () => 'C')
      .otherwise(() => 'default')
    expect(res).toBe('default')
  })
})
