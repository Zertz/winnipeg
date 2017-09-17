const map = new Map()

module.exports = {
  get (key) {
    return map.get(key)
  },
  set (key, value) {
    return map.set(key, value)
  }
}
