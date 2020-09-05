const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('pino')()
const usersRouter = require('./api/users')
const eventsRouter = require('./api/events')
const ticketsRouter = require('./api/tickets')

const app = express()
const port = process.env.PORT || 80

dotenv.config()
app.use(bodyParser.json())
app.use(cors())

// Add routers
app.use('/api/users', usersRouter)
app.use('/api/events', eventsRouter)
app.use('/api/tickets', ticketsRouter)

// Start listener
app.listen(port, () => {
  logger.info('Application started at port %s', port)
})
