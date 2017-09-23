module.exports = function () {
  const map = new Map()

  return {
    get (short) {
      const item = map.get(short)

      if (item) {
        map.set(short, {
          ...item,
          hits: item.hits + 1
        })
      }

      return item.url
    },
    set (short, url) {
      map.set(short, {
        url,
        hits: 0
      })

      return Promise.resolve()
    }
  }
}
