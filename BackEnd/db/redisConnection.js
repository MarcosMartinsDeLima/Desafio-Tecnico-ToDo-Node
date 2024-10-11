const createClient = require("redis").createClient({  url: 'redis://redis:6379',})

module.exports = createClient