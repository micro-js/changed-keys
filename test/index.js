/**
 * Imports
 */

var changedKeys = require('..')
var test = require('tape')

/**
 * Tests
 */

test('should work', function (t) {
  t.deepEqual(changedKeys({a: 1}, {b: 1}), ['a', 'b'])
  t.deepEqual(changedKeys({a: 1}, {a: 1}), [])
  t.deepEqual(changedKeys([0, 1, 2], [0, 2, 4]), [1, 2])
  t.deepEqual(changedKeys({a: 1}, {a: 1, b: 2}), ['b'])
  t.deepEqual(changedKeys({a: 1}, 'test'), ['a'])
  t.deepEqual(changedKeys({a: 1}, null), ['a'])
  t.end()
})
