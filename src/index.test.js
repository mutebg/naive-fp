import {
  log,
  map,
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
} from './'

test('test: log', () => {
  expect(log(1)).toBe(1)
})

test('test: map', () => {
  expect(map(x => x * 2, [1, 2, 3])).toEqual([2, 4, 6])
})

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
})

test('test: max', () => {
  expect(max([4, 1, 2, 3])).toEqual(4)
})

test('demo', () => {
  // const cReduce = curry(reduce)
  // console.log(cReduce)
  //expect(cReduce((x, y) => x + y)(0)([1, 2, 3])).toBe(10)
})
