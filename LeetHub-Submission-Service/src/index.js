const app = require('./app')
const connectToDB = require('./config/dbConfig')
const serverConfig = require('./config/serverConfig')
const evaluationWorker = require('./workers/evaluationWorker')

// calling the fastify constructor
const fastify = require('fastify')({ logger: true })

// register all routes/plugins
fastify.register(app)

const start = async () => {
    try {
        // 1️⃣ Connect to MongoDB first
        await connectToDB()
        console.log('MongoDB connected ✅')
        evaluationWorker('EvaluationWorker') 
        

        // 2️⃣ Start Fastify server
        await fastify.listen({ port: serverConfig.PORT, host: '0.0.0.0' })
        console.log(`Server up at port: ${serverConfig.PORT} 🚀`)
    } catch (err) {
        fastify.log.error('Error starting server:', err)
        process.exit(1) // stop process if DB or server fails
    }
}

// start everything
start()
