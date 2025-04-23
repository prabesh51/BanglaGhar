// server/netlify/functions/api.js
const serverless = require("serverless-http");
// Adjust the path './../../server' to correctly point to your main server.js file
// relative to server/netlify/functions/api.js
const { app } = require("./../../server"); // Assuming server.js exports 'app'

// Wrap the app with serverless-http
module.exports.handler = serverless(app);
