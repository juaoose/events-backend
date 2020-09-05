const express = require('express')
const userService = require('../services/userService')
const authService = require('../services/authorizationService')
const router = express.Router()
const logger = require('pino')()

// TODO should not show secret and should be for admins only
router.get('/:username', authService.authorize, async (req, res) => {
  if (!req.params.username) {
    res.status(400).send({ message: 'Username is required' })
  }
  try {
    var user = await userService.retrieveUser(req.params.username)
    res.status(200).json(user)
  } catch (error) {
    logger.error('Error retrieving user %o', error)
    res.status(500).json(error)
  }
})

router.post('/', async (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) {
    res.status(400).send({ message: 'All user information is required' })
  }

  try {
    const user = await userService.createUser(req.body)
    res.status(200).json(user)
  } catch (error) {
    logger.error(error)
    res.status(409).json({ message: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    var token = await userService.authenticateUser(req.body)
    res.status(200).json(token)
  } catch (error) {
    logger.error(error)
    res.status(401).json({ message: error.message })
  }
})

module.exports = router
