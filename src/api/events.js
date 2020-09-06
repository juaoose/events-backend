const express = require('express')
const eventService = require('../services/eventService')
const authService = require('../services/authorizationService')
const router = express.Router()
const logger = require('pino')()

router.get('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({ message: 'Event id is required' })
  }
  try {
    var event = await eventService.retrieveEvent(req.params.id)
    res.status(200).json(event)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    var event = await eventService.listEvents(req.params.id)
    res.status(200).json(event)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: error.message })
  }
})

router.post('/', authService.authorize, async (req, res) => {
  // TODO Missing validations, might want to use Joi or similar tools
  if (!req.body || !req.body.title) {
    res.status(400).send({ message: 'All event information is required' })
  }
  const newEvent = {
    title: req.body.title,
    organizer: req.body.organizer,
    max_capacity: req.body.maxCapacity,
    price: req.body.price,
    date: req.body.date,
    location: req.body.location
  }
  try {
    const event = await eventService.createEvent(newEvent)
    res.status(200).json(event)
  } catch (error) {
    logger.error(error)
    res.status(409).json({ message: error.message })
  }
})

router.put('/:id', authService.authorize, async (req, res) => {
  // TODO Missing validations, might want to use Joi or similar tools
  if (!req.params.id || !req.body || !req.body.title) {
    res.status(400).send({ message: 'All event information is required' })
  }
  const newEvent = {
    id: req.params.id,
    title: req.body.title,
    organizer: req.body.organizer,
    max_capacity: req.body.maxCapacity,
    price: req.body.price,
    date: req.body.date,
    location: req.body.location
  }
  try {
    const result = await eventService.updateEvent(newEvent)
    res.status(200).json(result)
  } catch (error) {
    logger.error(error)
    res.status(409).json({ message: error.message })
  }
})

router.delete('/:id', authService.authorize, async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({ message: 'Event id is required' })
  }

  try {
    const result = await eventService.removeEvent(req.params.id)
    res.status(200).json(result)
  } catch (error) {
    logger.error(error)
    res.status(409).json({ message: error.message })
  }
})

module.exports = router
