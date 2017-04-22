export const log = x => {
  /* eslint-disable no-console */
  console.log(x)
  /* eslint-enable no-console */
  return x
}

export const trace = log

export const curry = (fn, arr = []) => (...args) =>
  (a => (a.length === fn.length ? fn(...a) : curry(fn, a)))([...arr, ...args])

export const map = curry((fn, list) => {
  if (list.length === 0) {
    return []
  }
  const [fst, ...rest] = list
  return [fn(fst)].concat(map(fn, rest))
})

// export const indexedMap = curry((fn, list) => fasle)

export const filter = curry((fn, list) => {
  if (list.length === 0) {
    return []
  }
  const [fst, ...rest] = list

  if (fn(fst)) {
    return [fst].concat(filter(fn, rest))
  }
  return filter(fn, rest)
})

export const reduce = curry((fn, initValue, list) => {
  if (list.length === 0) {
    return initValue
  }
  const [fst, ...rest] = list
  return reduce(fn, fn(initValue, fst), rest)
})

export const reduceRight = curry((fn, initValue, list) => {
  if (list.length === 0) {
    return initValue
  }
  const [fst, ...rest] = list
  return fn(reduceRight(fn, initValue, rest), fst)
})

export const foldl = reduce

export const foldr = reduceRight

export const head = ([fst, ...rest]) => fst

export const last = ([fst, ...rest]) => (rest.length === 0 ? fst : last(rest))

export const tail = ([fst, ...rest]) => rest

export const compose = (...fns) => x => reduceRight((v, fn) => fn(v), x, fns)

export const pipe = (...fns) => x => reduce((v, fn) => fn(v), x, fns)

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

export const intersperse = curry((a, list) => list.join(a))

export const init = list => {
  if (length(list) <= 1) {
    return []
  }

  const [fst, ...rest] = list
  return concat(fst, init(rest))
}

/*
Determines whether any element of the structure satisfies the predicate.
*/
export const any = curry((fn, list) => length(filter(fn, list)) > 0)

/*
Determines whether all elements of the structure satisfy the predicate.
*/
export const all = curry(
  (fn, list) => length(filter(fn, list)) === length(list),
)

/*
The sum function computes the sum of the numbers of a structure.
*/
export const sum = list => reduce((x, y) => x + y, 0, list)

/*
  Multiplies together all the elements of a list.
*/
export const product = list => reduce((x, y) => x * y, 1, list)

/*
  Returns the first n elements of the given list
*/
export const take = curry((position, list) => {
  if (position === 0) {
    return []
  } else if (length(list) <= position) {
    return list
  } else {
    const [first, ...rest] = list
    return [first, ...take(position - 1, rest)]
  }
})

/*
  Removes the first n elements of the given list
*/
export const drop = curry((position, list) => {
  if (position === 0) {
    return list
  } else if (length(list) <= position) {
    return []
  } else {
    const [first, ...rest] = list
    return drop(position - 1, rest)
  }
})

/*
  Splits a given list at a given index.
*/
export const splitAt = curry((position, list) => {
  return [take(position, list), drop(position, list)]
})

export const permutations = list => {
  if (list.length === 0) {
    return [[]]
  }
  return reduce(
    (acc, perm) => {
      // use native map instead library one till implement indexMap
      const mapped = list.map((e, pos) => {
        const newPerm = perm.slice()
        newPerm.splice(pos, 0, list[0])
        return newPerm
      })
      return concat(acc, mapped)
    },
    [],
    permutations(drop(1, list)),
  )
}

/*
 Splits a collection into slices of the specified length.
*/
// export const splitEvery = curry((position, list) => {
//   return false
// })

// export const zip = curry((a, b) => false

// export const zipWidth = curry( (fn, a, b) => null )
