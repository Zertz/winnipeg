const fastify = require('fastify')()
const path = require('path')
const shortid = require('shortid')
const { URL } = require('url');

const baseUrl = 'http://localhost:3000'
const shortUrls = {};

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/'
})

fastify.route({
  method: 'GET',
  url: '/',
  handler: function (request, reply) {
    reply.sendFile('html.html')
  }
})

fastify.route({
  method: 'GET',
  url: '/:short',
  schema: {
    params: {
      short: { type: 'string' }
    },
  },
  handler: function (request, reply) {
    const url = shortUrls[request.params.short]

    if (url) {
      reply.redirect(url.href)
    } else {
      reply.code(404).send(new Error(':('))
    }
  }
})

fastify.route({
  method: 'GET',
  url: '/css.css',
  handler: function (request, reply) {
    reply.sendFile('css.css')
  }
})

fastify.route({
  method: 'GET',
  url: '/js.js',
  handler: function (request, reply) {
    reply.sendFile('js.js')
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
          url: { type: 'string' },
          short: { type: 'string' }
        }
      }
    }
  },
  handler: function (request, reply) {
    try {
      const url = new URL(request.body.url)
      const shortUrl = shortid.generate()

      shortUrls[shortUrl] = url

      reply.send({
        url: url.href,
        short: `${baseUrl}/${shortUrl}`
      })
    } catch (err) {
      reply.code(400).send(err)
    }
  }
})

fastify.listen(3000, function (err) {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})