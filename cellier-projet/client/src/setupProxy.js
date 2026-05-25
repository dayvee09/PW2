const { createProxyMiddleware } = require("http-proxy-middleware");

/**
 * Proxies API calls from the React dev server (port 3000) to Apache,
 * so fetch("/PW2/cellier-projet/api-php/...") works without cross-origin issues.
 */
module.exports = function (app) {
  app.use(
    "/PW2/cellier-projet/api-php",
    createProxyMiddleware({
      target: "http://localhost",
      changeOrigin: true,
    })
  );
};
