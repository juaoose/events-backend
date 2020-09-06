const eventRepo = require('../persistence/eventRepository')
const ticketRepo = require('../persistence/ticketRepository')
const assetsService = require('./assetsService')

/**
 * Creates an event, this includes handling the upload process of the bytes sent by the consumer
 * @param {*} event 
 */
module.exports.createEvent = async (event) => {
  if (event.encodedImage) {
    const imageUrl = await assetsService.uploadImage(event.encodedImage)
    event.image = imageUrl
  }
  const result = await eventRepo.createEvent(event)
  return result
}

/**
 * Updates a given event, if a new image is sent, upload is handled
 * @param {*} event 
 */
module.exports.updateEvent = async (event) => {
  if (event.encodedImage) {
    const imageUrl = await assetsService.uploadImage(event.encodedImage)
    event.image = imageUrl
  }
  const result = await eventRepo.updateEvent(event)
  return result
}

/**
 * Removes an event and all the related tickets
 * @param {*} eventId 
 */
module.exports.removeEvent = async (eventId) => {
  await ticketRepo.removeTickets(eventId)
  const result = await eventRepo.removeEvent(eventId)
  return result
}

/**
 * Retrieves a specific event given its identifier
 * @param {*} eventId 
 */
module.exports.retrieveEvent = async (eventId) => {
  const result = await eventRepo.retrieveEventById(eventId)
  if (result) {
    return result
  } else {
    throw new Error('Event not found')
  }
}

/**
 * Retrieves the events coming up "after the current moment"
 */
module.exports.listEvents = async () => {
  const result = await eventRepo.retrieveEvents()
  return result
}
