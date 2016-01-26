/**
 * Modules
 */

var isObject = require('@f/is-object')
var isArray = require('@f/is-array')

/**
 * Expose changedKeys
 */

module.exports = changedKeys

/**
 * changedKeys
 */

function changedKeys (next, prev) {
  var ntype = type(next)
  var ptype = type(prev)
  var res = []

  if (ntype !== ptype) {
    // Different types, everything changed
    if (ntype !== 'value') res.push.apply(res, Object.keys(next))
    if (ptype !== 'value') res.push.apply(res, Object.keys(prev))
  } else if (ntype === 'array') {
    var minLen = Math.min(next.length, prev.length)
    var maxLen = Math.max(next.length, prev.length)

    for (var i = 0; i < minLen; ++i) {
      if (next[i] !== prev[i]) {
        res.push(i)
      }
    }


    if (maxLen !== minLen) {
      for (var i = minLen; i < maxLen; ++i) {
        res.push(i)
      }
    }
  } else if (ntype === 'object') {
    var seen = {}
    var nkeys = Object.keys(next)
    var pkeys = Object.keys(prev)

    for (var i = 0, len = nkeys.length; i < len; ++i) {
      var key = nkeys[i]
      if (prev[key] !== next[key]) res.push(key)
      seen[key] = true
    }

    // Optimize for the case where nothing has changed
    if (!(nkeys.length === pkeys.length && res.length === 0)) {
      for (var i = 0, len = pkeys.length; i < len; ++i) {
        var key = pkeys[i]
        if (!seen[key] && prev[key] !== next[key]) res.push(key)
      }
    }
  }

  return res
}

function type (a) {
  if (isObject(a)) return 'object'
  if (isArray(a)) return 'array'
  return 'value'
}
