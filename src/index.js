export const log = x => {
  /* eslint-disable no-console */
  console.log(x)
  /* eslint-enable no-console */
  return x
}

export const trace = log

export const map = (fn, list) => {
  if (list.length === 0) {
    return []
  }
  const [fst, ...rest] = list
  return [fn(fst)].concat(map(fn, rest))
}

export const filter = (fn, list) => {
  if (list.length === 0) {
    return []
  }
  const [fst, ...rest] = list

  if (fn(fst)) {
    return [fst].concat(filter(fn, rest))
  }
  return filter(fn, rest)
}

export const reduce = (fn, initValue = 0, list = []) => {
  if (list.length === 0) {
    return initValue
  }
  const [fst, ...rest] = list
  return reduce(fn, fn(initValue, fst), rest)
}

export const reduceRight = (fn, initValue = 0, list = []) => {
  if (list.length === 0) {
    return initValue
  }
  const [fst, ...rest] = list
  return fn(reduceRight(fn, initValue, rest), fst)
}

export const fold = reduce

export const foldr = reduceRight

export const head = ([fst, ...rest]) => fst

export const last = ([fst, ...rest]) => (rest.length === 0 ? fst : last(rest))

export const tail = ([fst, ...rest]) => rest

export const compose = (...fns) => x => reduceRight((v, fn) => fn(v), x, fns)

export const pipe = (...fns) => x => reduce((v, fn) => fn(v), x, fns)

export const curry = (fn, arr = []) => (...args) =>
  (a => (a.length === fn.length ? fn(...a) : curry(fn, a)))([...arr, ...args])

export const concat = (...lists) => reduce((x, y) => x.concat(y), [], lists)

export const reverse = list => reduceRight((x, s) => [...x, s], [], list)

export const length = list => {
  if (!list.length) {
    return 0
  }
  const [fst, ...rest] = list
  return 1 + length(rest)
}

export const max = list => Math.max(...list)

export const min = list => Math.min(...list)
