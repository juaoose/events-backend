const eventRepo = require('../persistence/eventRepository')

module.exports.createEvent = async (event) => {
  const result = await eventRepo.createEvent(event)
  return result
}

module.exports.updateEvent = async (event) => {
  const result = await eventRepo.updateEvent(event)
  return result
}

module.exports.removeEvent = async (eventId) => {
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
