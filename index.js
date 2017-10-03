const fastify = require('fastify')()
const path = require('path')
const shortid = require('shortid')
const { URL } = require('url')

const baseUrl = process.env.WINNIPEG_BASE_URL || 'http://localhost:3000'
const storage = require('./storage/map')()
const isProduction = process.env.NODE_ENV === 'production'


fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/'
})

fastify.route({
  method: 'GET',
  url: '/',
  handler: function (request, reply) {
    reply.sendFile('index.html')
  }
})

fastify.route({
  method: 'GET',
  url: '/:short',
  schema: {
    params: {
      short: { type: 'string' }
    }
  },
  handler: async function (request, reply) {
    try {
      const url = await storage.get(request.params.short)

      if (url) {
        reply.code(302)
        reply.header('Location', url)

        return ''
      } else {
        reply.code(404)

        return new Error('Not Found')
      }
    } catch (err) {
      reply.code(400)

      return err
    }
  }
})

fastify.route({
  method: 'GET',
  url: '/icons/:icon',
  schema: {
    params: {
      icon: { type: 'string' }
    }
  },
  handler: function (request, reply) {
    reply.sendFile(`/icons/${request.params.icon}`)
  }
})

fastify.route({
  method: 'GET',
  url: '/favicon.ico',
  handler: function (request, reply) {
    reply.sendFile('favicon.ico')
  }
})

fastify.route({
  method: 'GET',
  url: '/manifest.json',
  handler: function (request, reply) {
    reply.sendFile('manifest.json')
  }
})

fastify.route({
  method: 'GET',
  url: '/offline.html',
  handler: function (request, reply) {
    reply.sendFile('offline.html')
  }
})

fastify.route({
  method: 'GET',
  url: '/sw.js',
  handler: function (request, reply) {
    reply.sendFile('sw.js')
  }
})

fastify.route({
  method: 'POST',
  url: '/',
  schema: {
    body: {
      url: { type: 'string' }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          short: { type: 'string' }
        }
      }
    }
  },
  handler: async function (request, reply) {
    try {
      const url = new URL(request.body.url)
      const shortUrl = shortid.generate()

      await storage.set(shortUrl, url.href)

      return {
        short: `${baseUrl}/${shortUrl}`
      }
    } catch (err) {
      reply.code(400)

      return err
    }
  }
})

fastify.listen(3000, function (err) {
  if (err) {
    throw err
  }

  const port = fastify.server.address().port

  if (isProduction) {
    console.log(`server listening on ${port}`)
  } else {
    require('browser-sync')({
      files: [
        'public/{index,offline}.html'
      ],
      open: false,
      port: port + 1,
      proxy: `localhost:${port}`,
      ui: false
    })
  }
})
