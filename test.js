'use strict'

const test = require('japa')
const Resetable = require('./index')

test('define a resetable with original value', (assert) => {
  const resetable = new Resetable('foo')
  assert.equal(resetable._originalValue, 'foo')
})

test('update resetable original value', (assert) => {
  const resetable = new Resetable('foo')
  resetable.set('bar')
  assert.equal(resetable._originalValue, 'foo')
  assert.equal(resetable._val, 'bar')
})

test('return original value via get', (assert) => {
  const resetable = new Resetable('foo')
  assert.equal(resetable.get(), 'foo')
})

test('return value set via {set} method', (assert) => {
  const resetable = new Resetable('foo')
  resetable.set('baz')
  assert.equal(resetable.get(), 'baz')
})

test('reset to original value', (assert) => {
  const resetable = new Resetable('foo')
  resetable.set('baz')
  resetable.reset()
  assert.equal(resetable.get(), 'foo')
})

test('get and reset all in one go', (assert) => {
  const resetable = new Resetable('foo')
  resetable.set('baz')
  assert.equal(resetable.pull(), 'baz')
  assert.equal(resetable.get(), 'foo')
})

test('set original value to null when not defined', (assert) => {
  const resetable = new Resetable()
  assert.equal(resetable.get(), null)
})
