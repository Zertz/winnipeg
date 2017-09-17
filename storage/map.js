module.exports = function () {
  const map = new Map()

  return {
    get (key) {
      return Promise.resolve(map.get(key))
    },
    set (key, value) {
      return Promise.resolve(map.set(key, value))
    }
  }
}
