'use strict'

const test = require('japa')
const Resetable = require('../src/index')

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

test('reset default value when original value is an object', (assert) => {
  const resetable = new Resetable({
    scope: 'me'
  })
  const val = resetable.get()
  val.scope = 'you'
  resetable.set(val)
  resetable.pull()
  assert.deepEqual(resetable.get(), { scope: 'me' })
})

test('reset default value when original value is a nested object', (assert) => {
  const resetable = new Resetable({
    scopes: {
      user1: 'me'
    }
  })
  const val = resetable.get()
  val.scopes = {
    user1: 'me',
    user2: 'all'
  }
  resetable.set(val)
  resetable.pull()
  assert.deepEqual(resetable.get(), { scopes: { user1: 'me' } })
})

test('work fine with booleans', (assert) => {
  const resetable = new Resetable(true)
  resetable.set(false)
  assert.equal(resetable.get(), false)
  assert.equal(resetable.pull(), false)
  assert.equal(resetable.get(), true)
})

test('work fine with numbers', (assert) => {
  const resetable = new Resetable(10)
  resetable.set(20)
  assert.equal(resetable.get(), 20)
  assert.equal(resetable.pull(), 20)
  assert.equal(resetable.get(), 10)
})

test('work fine with arrays', (assert) => {
  const resetable = new Resetable([1, 2])
  resetable.set([2, 3])
  assert.deepEqual(resetable.get(), [2, 3])
  assert.deepEqual(resetable.pull(), [2, 3])
  assert.deepEqual(resetable.get(), [1, 2])
})

test('set value after reset', (assert) => {
  const resetable = new Resetable({
    scope: 'me'
  })
  const val = resetable.get()
  val.scope = 'you'
  resetable.set(val)
  resetable.pull()
  const val1 = resetable.get()
  val1.scope = 'foo'
  resetable.set(val1)
  assert.deepEqual(resetable.get(), { scope: 'foo' })
})
