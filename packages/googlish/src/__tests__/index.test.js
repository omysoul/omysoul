import test from 'ava'
import googlish from '../index'

const haystack = 'The quick brown fox, jumps Over the lazy dog'

test('should be true if all words are present', t => {
  t.true(googlish('the quick fox')(haystack))
})

test('should be false if one word is missing', t => {
  t.false(googlish('the quick rabbit')(haystack))
})

test('should ignore case by default', t => {
  t.true(googlish('thE quIck Dog')(haystack))
})

test('should match substrings by default', t => {
  t.true(googlish('the quic ox')(haystack))
})

test('should match quoted single strings', t => {
  t.true(googlish('the \'quick brown\'')(haystack))
})

test('should fail if quoted single strings not together', t => {
  t.false(googlish('the \'quick fox\'')(haystack))
})

test('should match double quoted strings', t => {
  t.true(googlish('the "quick brown\"')(haystack))
})

test('should fail if double quoted strings not together', t => {
  t.false(googlish('the "quick fox"')(haystack))
})

test('should be able to match whole words only', t => {
  t.false(googlish('th quic fo', true)(haystack))
  t.true(googlish('th quic fo', false)(haystack))
})

test('should be able to be case sensitive', t => {
  t.true(googlish('Over jumps quick fox', false, true)(haystack))
  t.false(googlish('over jumps quick fox', false, true)(haystack))
})

test('should match chinese words', t => {
  const chinese = '地是空虛混沌．淵面黑暗．神的靈運行在水面上。'
  t.true(googlish('虛混 黑暗')(chinese))
})

test('should no match chinese words', t => {
  const chinese = '地是空虛混沌．淵面黑暗．神的靈運行在水面上。'
  t.false(googlish('虛混空 黑暗')(chinese))
})
