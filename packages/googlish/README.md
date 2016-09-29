# Googlish

Enter a Google search style query and it will return a test function that returns true when its input satisfies the query.

Works with double and single quoted inner strings:

```javascript
const test = googlish('over fox "lazy dog"')
test('the quick brown fox jumps over the lazy dog')
//true

const test = googlish('over fox "dog lazy"')
test('the quick brown fox jumps over the lazy dog')
//false
```

By default substrings count as matches and search is case insensitive. This can be changed:

```javascript
let wholeWords = true
let caseSensitive = true
googlish('over fox', wholeWords, caseSensitive)
```

Ideal for creating filter functions:

```javascript
const isLazyDog = googlish('"lazy dog"')
const dogs = ['happy dog', 'lazy dog']
const lazyDogs = dogs.filter(isLazyDog)
// ['lazy dog']
```
