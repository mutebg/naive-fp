# naivefp

A naive implementation of functional library for JavaScript programmers


## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
npm install --save naivefp
```

## Usage
Functions list:
`log`, `map`, `filter`, `reduce`, `reduceRight`, `head`, `last`, `tail`,
`compose`, `pipe`, `curry`, `concat`, `reverse`, `length`, `min`  `max`,
`intersperse`, `init`, `permutations`, `any`, `all`, `sum`, `product`,
`take`,  `drop`, `splitAt`,


```html
import { map, filter, curry} from 'naivefp';

const double = map( x => x * 2 );
double([1,2,3]);

```


Functions have fixed arities to support auto-currying:
`map`, `filter`, `reduce`, `reduceRight`







## Inspiration
Inspired by Haskell's idea of recursive implementation of any function
