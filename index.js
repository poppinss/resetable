'use strict'

/*
 * resetable
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

class Resetable {
  constructor (originalValue) {
    this._originalValue = originalValue || null
    this.set(originalValue)
  }

  /**
   * Set the value to whatever
   *
   * @method set
   *
   * @param  {Mixed} val
   * @chainable
   */
  set (val) {
    this._val = val
    return this
  }

  /**
   * Set the value back
   *
   * @method get
   *
   * @return {Mixed}
   */
  get () {
    return this._val
  }

  /**
   * Reset the value back to whatever was the
   * original value
   *
   * @method reset
   */
  reset () {
    this.set(this._originalValue)
  }

  /**
   * Get the value and reset all in
   * one go
   *
   * @method pull
   *
   * @return {Mixed}
   */
  pull () {
    return ((val) => {
      this.reset()
      return val
    })(this.get())
  }
}

module.exports = Resetable
