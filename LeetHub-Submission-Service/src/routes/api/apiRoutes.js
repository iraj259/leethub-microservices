// src/routes/api/apiRoutes.js
async function apiPlugin(fastify, options){
    // Update the path to include the 'test' folder
    fastify.register(require('./v1/v1Routes'), {prefix:'/v1'})
}
module.exports = apiPlugin