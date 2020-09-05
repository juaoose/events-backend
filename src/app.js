const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('pino')()
const usersRouter = require('./api/users')

const app = express()
const port = process.env.APP_PORT

dotenv.config()
app.use(bodyParser.json())
app.use(cors())

// Add routers
app.use('/api/users', usersRouter)

// Start listener
app.listen(port, () => {
  logger.info('Application started at port %s', port)
})
