module.exports = function () {
  const map = new Map()

  return {
    get (short) {
      return Promise.resolve(map.get(short))
    },
    set (short, url) {
      map.set(short, url)

      return Promise.resolve()
    }
  }
}
