import test from 'ava'
import BibleReferences from '../bible-book-regex'

import { en, zh } from '@omysoul/bible-langs'
const abbrs = [en, zh].map(
  ({ abbreviations }) => abbreviations
)

const {
  partToRange,
  getVerseRanges,
  compressRangesText,
  uncompressRangesText,
} = new BibleReferences(abbrs)

test('partToRange(约翰福音 3:16)', t => {
  t.deepEqual(
    partToRange('约翰福音 3:16'), {
      start: { book: 'john', chapter: '3', verse: '16' },
      end: { book: 'john', chapter: '3', verse: '16' },
      ctx: { book: 'john', chapter: '3', verse: '16' },
    }
  )
})

test('partToRange(john 3:16)', t => {
  t.deepEqual(
    partToRange('john 3:16'), {
      start: { book: 'john', chapter: '3', verse: '16' },
      end: { book: 'john', chapter: '3', verse: '16' },
      ctx:{ book: 'john', chapter: '3', verse: '16' },
    }
  )
})

test('partToRange(john 3)', t => {
  t.deepEqual(
    partToRange('john 3'), {
      start: { book: 'john', chapter: '3', verse: '1' },
      end: { book: 'john', chapter: '3' },
      ctx:{ book: 'john', chapter: '3' },
    }
  )
})

test('partToRange(john)', t => {
  t.deepEqual(
    partToRange('john'), {
      start: { book: 'john', chapter: '1', verse: '1' },
      end: { book: 'john' },
      ctx:{ book: 'john' },
    }
  )
})

test('partToRange(john 3-4)', t => {
  t.deepEqual(
    partToRange('john 3-4'), {
      start: { book: 'john', chapter: '3', verse: '1' },
      end: { book: 'john', chapter: '4' },
      ctx:{ book: 'john', chapter: '3' },
    }
  )
})

test('partToRange(3-4) with context john', t => {
  t.deepEqual(
    partToRange('3-4', { book: 'john' } ), {
      start: { book: 'john', chapter: '3', verse: '1' },
      end: { book: 'john', chapter: '4' },
      ctx:{ book: 'john', chapter: '3' },
    }
  )
})

test('partToRange(3-4) with context john 1', t => {
  t.deepEqual(
    partToRange('3-4', { book: 'john', chapter: '1' } ), {
      start: { book: 'john', chapter: '3', verse: '1' },
      end: { book: 'john', chapter: '4' },
      ctx:{ book: 'john', chapter: '3' },
    }
  )
})

test('partToRange(3-4) with context john 1:2', t => {
  t.deepEqual(
    partToRange('3-4', {
      book: 'john',
      chapter: '1',
      verse: '2',
    } ), {
      start: { book: 'john', chapter: '1', verse: '3' },
      end: { book: 'john', chapter: '1', verse: '4' },
      ctx:{ book: 'john', chapter: '1', verse: '3' },
    }
  )
})

test('partToRange(3) with context john 1:2', t => {
  t.deepEqual(
    partToRange('3', {
      book: 'john',
      chapter: '1',
      verse: '2',
    } ), {
      start: { book: 'john', chapter: '1', verse: '3' },
      end: { book: 'john', chapter: '1', verse: '3' },
      ctx:{ book: 'john', chapter: '1', verse: '3' },
    }
  )
})

test('partToRange(3) with context john', t => {
  t.deepEqual(
    partToRange('3', {
      book: 'john',
    } ), {
      start: { book: 'john', chapter: '3', verse: '1' },
      end: { book: 'john', chapter: '3' },
      ctx:{ book: 'john', chapter: '3' },
    }
  )
})

test('partToRange(john 3-4:5)', t => {
  t.deepEqual(
    partToRange('john 3-4:5'), {
      start: { book: 'john', chapter: '3', verse: '1' },
      end: { book: 'john', chapter: '4', verse: '5' },
      ctx:{ book: 'john', chapter: '3' },
    }
  )
})

test('partToRange(john 3:2-4)', t => {
  t.deepEqual(
    partToRange('john 3:2-4'), {
      start: { book: 'john', chapter: '3', verse: '2' },
      end: { book: 'john', chapter: '3', verse: '4' },
      ctx:{ book: 'john', chapter: '3', verse: '2' },
    }
  )
})

test('partToRange(john 3:2-4:5)', t => {
  t.deepEqual(
    partToRange('john 3:2-4:5'), {
      start: { book: 'john', chapter: '3', verse: '2' },
      end: { book: 'john', chapter: '4', verse: '5' },
      ctx:{ book: 'john', chapter: '3', verse: '2' },
    }
  )
})

test('partToRange(john 3:2 - acts 4:5)', t => {
  t.deepEqual(
    partToRange('john 3:2 - acts 4:5'), {
      start: { book: 'john', chapter: '3', verse: '2' },
      end: { book: 'acts', chapter: '4', verse: '5' },
      ctx:{ book: 'john', chapter: '3', verse: '2' },
    }
  )
})

test('getVerseRanges(john, matt, rev 5)', t => {
  t.deepEqual(
    getVerseRanges('john, matt, rev 5'), [
      {
        start: { book: 'john', chapter: '1', verse: '1' },
        end: { book: 'john' },
      },
      {
        start: { book: 'matthew', chapter: '1', verse: '1' },
        end: { book: 'matthew' },
      },
      {
        start: { book: 'revelation', chapter: '5', verse: '1' },
        end: { book: 'revelation', chapter: '5' },
      },
    ]
  )
})

test('getVerseRanges(john 1:8,10,11)', t => {
  t.deepEqual(
    getVerseRanges('john 1:8,10,11'), [
      {
        start: { book: 'john', chapter: '1', verse: '8' },
        end: { book: 'john', chapter: '1', verse: '8' },
      },
      {
        start: { book: 'john', chapter: '1', verse: '10' },
        end: { book: 'john', chapter: '1', verse: '10' },
      },
      {
        start: { book: 'john', chapter: '1', verse: '11' },
        end: { book: 'john', chapter: '1', verse: '11' },
      },
    ]
  )
})

test('getVerseRanges(john 1:8,10-15,11)', t => {
  t.deepEqual(
    getVerseRanges('john 1:8,10-15,11'), [
      {
        start: { book: 'john', chapter: '1', verse: '8' },
        end: { book: 'john', chapter: '1', verse: '8' },
      },
      {
        start: { book: 'john', chapter: '1', verse: '10' },
        end: { book: 'john', chapter: '1', verse: '15' },
      },
      {
        start: { book: 'john', chapter: '1', verse: '11' },
        end: { book: 'john', chapter: '1', verse: '11' },
      },
    ]
  )
})

test('getVerseRanges(john 1 , 10 -  15,  11 :  21)', t => {
  t.deepEqual(
    getVerseRanges('john 1 , 10 -  15,  11 :  21'), [
      {
        start: { book: 'john', chapter: '1', verse: '1' },
        end: { book: 'john', chapter: '1' },
      },
      {
        start: { book: 'john', chapter: '10', verse: '1' },
        end: { book: 'john', chapter: '15' },
      },
      {
        start: { book: 'john', chapter: '11', verse: '21' },
        end: { book: 'john', chapter: '11', verse: '21' },
      },
    ]
  )
})

test('getVerseRanges(john 1,10-15,11)', t => {
  t.deepEqual(
    getVerseRanges('john 1,10-15,11'), [
      {
        start: { book: 'john', chapter: '1', verse: '1' },
        end: { book: 'john', chapter: '1' },
      },
      {
        start: { book: 'john', chapter: '10', verse: '1' },
        end: { book: 'john', chapter: '15' },
      },
      {
        start: { book: 'john', chapter: '11', verse: '1' },
        end: { book: 'john', chapter: '11' },
      },
    ]
  )
})

test('getVerseRanges(john 10-)', t => {
  t.deepEqual(
    getVerseRanges('john 10-'), [
      {
        start: { book: 'john', chapter: '10', verse: '1' },
        end: {},
      },
    ]
  )
})

test('getVerseRanges(john -)', t => {
  t.deepEqual(
    getVerseRanges('john -'), [
      {
        start: { book: 'john', chapter: '1', verse: '1' },
        end: {},
      },
    ]
  )
})

test('getVerseRanges(john 10:10-)', t => {
  t.deepEqual(
    getVerseRanges('john 10:10-'), [
      {
        start: { book: 'john', chapter: '10', verse: '10' },
        end: {},
      },
    ]
  )
})

test('getVerseRanges(john ff)', t => {
  t.deepEqual(
    getVerseRanges('john ff'), [
      {
        start: { book: 'john', chapter: '1', verse: '1' },
        end: {},
      },
    ]
  )
})

test('getVerseRanges(john 1ff)', t => {
  t.deepEqual(
    getVerseRanges('john 1ff'), [
      {
        start: { book: 'john', chapter: '1', verse: '1' },
        end: { book: 'john' },
      },
    ]
  )
})

test('getVerseRanges(john 1:9ff)', t => {
  t.deepEqual(
    getVerseRanges('john 1:9ff'), [
      {
        start: { book: 'john', chapter: '1', verse: '9' },
        end: { book: 'john', chapter: '1' },
      },
    ]
  )
})

test('should compress rangeList', t => {
  t.true(
    compressRangesText('Mark 2:11; james 1, john 3\njon') === 'mk2:11;jm1,jn3;jnh'
  )
})

test('should expand rangeList', t => {
  t.true(
    uncompressRangesText('mk2:11;jm1,jn3;jnh') === 'mark 2:11\njames 1, john 3\njonah'
  )
})
