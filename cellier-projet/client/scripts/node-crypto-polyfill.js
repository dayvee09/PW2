// serialize-javascript@7 requires global Web Crypto (Node 19+). Polyfill for Node 18.
const { webcrypto } = require("node:crypto");

if (typeof globalThis.crypto === "undefined") {
  globalThis.crypto = webcrypto;
}
