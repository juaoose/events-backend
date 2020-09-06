const express = require('express')
const ticketService = require('../services/ticketService')
const authService = require('../services/authorizationService')
const router = express.Router()
const logger = require('pino')()

router.get('/', authService.authorize, async (req, res) => {
  if (!req.query.userId) {
    res.status(400).send({ message: 'Event id is required' })
  }
  try {
    var ticket = await ticketService.findTickets(req.query.userId)
    res.status(200).json(ticket)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: error.message })
  }
})

router.post('/', authService.authorize, async (req, res) => {
  // TODO missing validations
  if (!req.body || !req.body.eventId || !req.body.buyerId) {
    res.status(400).send({ message: 'All event information is required' })
  }

  try {
    const response = await ticketService.createTicket(req.body)
    res.status(200).json(response)
  } catch (error) {
    logger.error(error)
    res.status(409).json({ message: error.message })
  }
})

module.exports = router
