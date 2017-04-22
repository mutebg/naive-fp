import {
  log,
  map,
  //indexedMap,
  filter,
  reduce,
  reduceRight,
  head,
  last,
  tail,
  compose,
  pipe,
  curry,
  concat,
  reverse,
  length,
  min,
  max,
  intersperse,
  init,
  permutations,
  any,
  all,
  sum,
  product,
  take,
  drop,
  splitAt,
  //splitEvery,
  //zip,
} from './'

test('test: log', () => {
  expect(log(1)).toBe(1)
})

test('test: map', () => {
  expect(map(x => x * 2, [1, 2, 3])).toEqual([2, 4, 6])
})

// IMPLEMENT
// test('test: indexedMap', () => {
//   expect(indexedMap((index, x) => ({index, x}), [11, 22, 33])).toEqual([
//     {index: 0, x: 11},
//     {index: 1, x: 22},
//     {index: 2, x: 33},
//   ])
// })

test('test: filter', () => {
  expect(filter(x => x > 2, [4, 1, 2, 3])).toEqual([4, 3])
})

test('test: reduce', () => {
  expect(reduce((x, y) => x + y, 0, [4, 1, 2, 3])).toEqual(10)
})

test('test: reduceRight', () => {
  expect(reduceRight((x, y) => x + y, 0, [4, 1, 2, 3])).toEqual(10)
})

test('test: head', () => {
  expect(head([4, 1, 2, 3])).toEqual(4)
})

test('test: tail', () => {
  expect(tail([4, 1, 2, 3])).toEqual([1, 2, 3])
})

test('test: last', () => {
  expect(last([4, 1, 2, 3])).toEqual(3)
})

test('test: compose', () => {
  const add10 = x => x + 10
  const add5 = x => x + 5
  expect(compose(add10, add5)(0)).toEqual(add5(add10(0)))
})

test('test: pipe', () => {
  const add10 = x => x + 10
  const add5 = x => x + 5
  expect(pipe(add10, add5, add5)(0)).toEqual(add5(add5(add10(0))))
})

test('test: concat', () => {
  expect(concat([1], [2], [3, 4])).toEqual([1, 2, 3, 4])
})

test('test: reverse', () => {
  expect(reverse([1, 2, 3])).toEqual([3, 2, 1])
})

test('test: length', () => {
  expect(length([1, 2, 3])).toEqual(3)
})

test('test: curry', () => {
  const add = curry((x, y) => x + y)
  expect(add(10)(10)).toEqual(add(10, 10))
})

test('test: min', () => {
  expect(min([4, 1, 2, 3])).toEqual(1)
  expect(min([4, 1, 2, 3, -Infinity])).toEqual(-Infinity)
})

test('test: max', () => {
  expect(max([4, 1, 2, 3])).toEqual(4)
  expect(max([4, 1, 2, 3, Infinity])).toEqual(Infinity)
})

test('test: init', () => {
  expect(init([1, 2, 3, 4])).toEqual([1, 2, 3])
  expect(init([1])).toEqual([])
})

test('test: intersperse', () => {
  expect(intersperse(',', [1, 2, 3, 4])).toEqual('1,2,3,4')
  expect(intersperse(',')([1, 2, 3, 4])).toEqual('1,2,3,4')
})

test('test: permutations', () => {
  expect(permutations([1, 2, 3])).toEqual([
    [1, 2, 3],
    [2, 1, 3],
    [2, 3, 1],
    [1, 3, 2],
    [3, 1, 2],
    [3, 2, 1],
  ])
})

test('test: any', () => {
  expect(any(x => x > 2, [1, 2, 3])).toEqual(true)
  expect(any(x => x > 5, [1, 2, 3])).toEqual(false)
})

test('test: all', () => {
  expect(all(x => x > 0, [1, 2, 3])).toEqual(true)
  expect(all(x => x > 2, [1, 2, 3])).toEqual(false)
})

test('test: sum', () => {
  expect(sum([1, 2, 3])).toEqual(6)
})

test('test: product', () => {
  expect(product([1, 2, 3])).toEqual(6)
})

test('test: take', () => {
  expect(take(2)([1, 2, 3, 4])).toEqual([1, 2])
  expect(take(8)([1, 2, 3, 4])).toEqual([1, 2, 3, 4])
  expect(take(0)([1, 2, 3, 4])).toEqual([])
})

test('test: drop', () => {
  expect(drop(2)([1, 2, 3, 4])).toEqual([3, 4])
  expect(drop(0)([1, 2, 3, 4])).toEqual([1, 2, 3, 4])
  expect(drop(4)([1, 2, 3, 4])).toEqual([])
})

test('test: splitAt', () => {
  expect(splitAt(2)([1, 2, 3, 4])).toEqual([[1, 2], [3, 4]])
  expect(splitAt(1)([1, 2, 3, 4])).toEqual([[1], [2, 3, 4]])
  expect(splitAt(0)([1, 2, 3, 4])).toEqual([[], [1, 2, 3, 4]])
  expect(splitAt(4)([1, 2, 3, 4])).toEqual([[1, 2, 3, 4], []])
})

// IMPLEMENT
// test('test: splitEvery', () => {
//   expect(splitEvery(2)([1, 2, 3, 4])).toEqual([[1, 2], [3, 4]])
//   expect(splitEvery(1)([1, 2, 3, 4])).toEqual([[1], [2], [3], [4]])
//   expect(splitEvery(3)([1, 2, 3, 4])).toEqual([[1, 2, 3], [4]])
//   expect(splitEvery(0)([1, 2, 3, 4])).toEqual([[1, 2, 3, 4]])
//   expect(splitEvery(10)([1, 2, 3, 4])).toEqual([[1, 2, 3, 4]])
// })

// IMPLEMENT
// test('test: zip', () => {
//   expect(zip([1, 2, 3], [1, 2, 3])).toEqual([[1, 1], [2, 2], [3, 3]])
// })
