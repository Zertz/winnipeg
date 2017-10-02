/* globals caches fetch self */

const preLoad = function () {
  return caches.open('winnipeg-offline').then(function (cache) {
    return cache.addAll([
      '/offline.html',
      '/css.css'
    ])
  })
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    preLoad()
  )
})

const checkResponse = function (request) {
  return new Promise(function (resolve, reject) {
    fetch(request).then(function (response) {
      if (response.status === 404) {
        reject(new Error('Not Found'))
      } else {
        resolve(response)
      }
    }, reject)
  })
}

const returnFromCache = function (request) {
  return caches.open('winnipeg-offline').then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        return cache.match('offline.html')
      } else {
        return matching
      }
    })
  })
}

self.addEventListener('fetch', function (event) {
  event.respondWith(
    checkResponse(event.request).catch(function () {
      return returnFromCache(event.request)
    })
  )
})
