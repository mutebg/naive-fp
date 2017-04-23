/*
Helper to log

@sig a -> a
*/
export const log = x => {
  /* eslint-disable no-console */
  console.log(x)
  /* eslint-enable no-console */
  return x
}

// a -> a
export const trace = log

/*
Returns a curried equivalent of the provided function.

@sig: (* -> a) -> (* -> a)
*/
export const curry = (fn, arr = []) => (...args) =>
  (a => (a.length === fn.length ? fn(...a) : curry(fn, a)))([...arr, ...args])

/*
Takes a function and a list, applies the function to each of the list's values,
and returns a list of the same shape.

@sig: (a -> b) -> [a] -> [b]
*/
export const map = curry((fn, list) => {
  if (list.length === 0) {
    return []
  }
  const [fst, ...rest] = list
  return [fn(fst)].concat(map(fn, rest))
})

/*
Applied to a predicate and a list, returns the list of those elements
that satisfy the predicate

@sig: (a -> Bool) -> [a] -> [a]
*/
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

/*
Returns a single item by iterating through the list, successively calling
the iterator function and passing it an accumulator value and the current
value from the array, and then passing the result to the next call.

@sig: (a -> b -> a) -> a -> [b] -> a
*/
export const reduce = curry((fn, initValue, list) => {
  if (list.length === 0) {
    return initValue
  }
  const [fst, ...rest] = list
  return reduce(fn, fn(initValue, fst), rest)
})

/*
Similar to `reduce`, except moves through the input list from
the right to the left.

@sig: (a -> b -> a) -> a -> [b] -> a
*/
export const reduceRight = curry((fn, initValue, list) => {
  if (list.length === 0) {
    return initValue
  }
  const [fst, ...rest] = list
  return fn(reduceRight(fn, initValue, rest), fst)
})

/*
See `reduce`

@sig: (a -> b -> a) -> a -> [b] -> a
*/
export const foldl = reduce

/*
See `reduceRight`

@sig: (a -> b -> a) -> a -> [b] -> a
*/
export const foldr = reduceRight

/*
Returns the first element of the given list.

@sig: [a] -> a
*/
export const head = ([fst, ...rest]) => fst

/*
Returns the last element of the given list.

@sig: [a] -> a
*/
export const last = ([fst, ...rest]) => (rest.length === 0 ? fst : last(rest))

/*
Returns all but the first element of the given list

@sig: [a] -> [a]
*/
export const tail = ([fst, ...rest]) => rest

/*
Performs right-to-left function composition

@sig: [a -> a] -> a -> a
*/
export const compose = (...fns) => x => reduceRight((v, fn) => fn(v), x, fns)

/*
Performs left-to-right function composition

@sig: [a -> a] -> a -> a
*/
export const pipe = (...fns) => x => reduce((v, fn) => fn(v), x, fns)

/*
Returns the result of concatenating the given lists

@sig: [[a]] -> [a]
*/
export const concat = (...lists) => reduce((x, y) => x.concat(y), [], lists)

/*
Returns a new list with the elements in reverse

@sig: [a] -> [a]
*/
export const reverse = list => reduceRight((x, s) => [...x, s], [], list)

/*
Returns the number of elements in a list

@sig: [a] -> Number
*/
export const length = list => {
  if (!list.length) {
    return 0
  }
  const [fst, ...rest] = list
  return 1 + length(rest)
}

/*
Returns the larger element in a list

@sig: [Number] -> Number
*/
export const max = list => Math.max(...list)

/*
Returns the smallest element in a list

@sig: [Number] -> Number
*/
export const min = list => Math.min(...list)

/*
The intersperse function takes an element and a list and `intersperses'
that element between the elements of the list.

@sig: a -> [a] -> [a]
*/
export const intersperse = curry((a, list) => list.join(a))

/*
Returns all but the last element of the given list.

@sig: [a] -> [a]
*/
export const init = list => {
  if (length(list) <= 1) {
    return []
  }

  const [fst, ...rest] = list
  return concat(fst, init(rest))
}

/*
Determines whether any element of the structure satisfies the predicate.

@sig: (a -> Bool) -> [a] -> Bool
*/
export const any = curry((fn, list) => length(filter(fn, list)) > 0)

/*
Determines whether all elements of the structure satisfy the predicate.

@sig: (a -> Bool) -> [a] -> Bool
*/
export const all = curry(
  (fn, list) => length(filter(fn, list)) === length(list),
)

/*
The sum function computes the sum of the numbers of a structure.

@sig: [Number] -> Number
*/
export const sum = list => reduce((x, y) => x + y, 0, list)

/*
Multiplies together all the elements of a list.

@sig: [Number] -> Number
*/
export const product = list => reduce((x, y) => x * y, 1, list)

/*
Returns the first n elements of the given list

@sig: Number -> [a] -> [a]
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

@sig:Number -> [a] -> [a]
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

@sig: Number -> [a] -> [[a]]
*/
export const splitAt = curry((position, list) => {
  return [take(position, list), drop(position, list)]
})

/*
The permutations function returns the list of all permutations of the argument.

@sig: [a] -> [[a]]
*/
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
