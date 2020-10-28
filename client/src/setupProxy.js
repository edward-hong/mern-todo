const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    ['/auth', '/todo'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    }),
  )
}
