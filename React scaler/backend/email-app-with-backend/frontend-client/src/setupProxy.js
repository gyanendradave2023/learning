// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove the /api prefix when making requests to the backend
      },
    })
  );

  app.use(
    '/graphql',
    createProxyMiddleware({
      target: process.env.REACT_APP_GRAPHQL_ENDPOINT,
      changeOrigin: true,
      pathRewrite: {
        '^/graphql': '', // Remove the /graphql prefix when making requests to the backend
      },
    })
  );
};
