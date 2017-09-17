module.exports = function () {
  const map = new Map()

  return {
    get (key) {
      return map.get(key)
    },
    set (key, value) {
      return map.set(key, value)
    }
  }
}
