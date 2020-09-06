const eventRepo = require('../persistence/eventRepository')
const ticketRepo = require('../persistence/ticketRepository')
const assetsService = require('./assetsService')

module.exports.createEvent = async (event) => {
  if (event.encodedImage) {
    const imageUrl = await assetsService.uploadImage(event.encodedImage)
    event.image = imageUrl
  }
  const result = await eventRepo.createEvent(event)
  return result
}

module.exports.updateEvent = async (event) => {
  if (event.encodedImage) {
    const imageUrl = await assetsService.uploadImage(event.encodedImage)
    event.image = imageUrl
  }
  const result = await eventRepo.updateEvent(event)
  return result
}

module.exports.removeEvent = async (eventId) => {
  await ticketRepo.removeTickets(eventId)
  const result = await eventRepo.removeEvent(eventId)
  return result
}

module.exports.retrieveEvent = async (eventId) => {
  const result = await eventRepo.retrieveEventById(eventId)
  if (result) {
    return result
  } else {
    throw new Error('Event not found')
  }
}

module.exports.listEvents = async () => {
  const result = await eventRepo.retrieveEvents()
  return result
}
