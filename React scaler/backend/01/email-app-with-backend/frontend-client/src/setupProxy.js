import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );

  app.use(
    '/graphql',
    createProxyMiddleware({
      target: process.env.REACT_APP_GRAPHQL_ENDPOINT,
      changeOrigin: true,
      pathRewrite: {
        '^/graphql': '',
      },
    })
  );
};
