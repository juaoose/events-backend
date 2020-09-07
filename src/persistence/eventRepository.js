const database = require('../config/database').pool
const logger = require('pino')()

/**
 * Creates an event
 * @param {*} event
 */
module.exports.createEvent = async (event) => {
  logger.info('Creating a new event %s', event.title)
  const result = await database.query('INSERT INTO events (TITLE, ORGANIZER, MAX_CAPACITY, PRICE, DATE, LOCATION, DESCRIPTION, IMAGE) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING ID',
    [event.title, event.organizer, event.max_capacity, event.price, event.date, event.location, event.description, event.image])
  if (result && result.rows) {
    return { id: result.rows[0].id, image: event.image }
  }
}

/**
 * Updates and existing event
 * @param {*} event
 */
module.exports.updateEvent = async (event) => {
  logger.info('Updating event %s', event.id)
  const result = await database.query('UPDATE EVENTS SET title=$1, organizer=$2, max_capacity=$3, price=$4, date=$5, location=$6, description=$7, image=$8 WHERE id= $9',
    [event.title, event.organizer, event.max_capacity, event.price, event.date, event.location, event.description, event.image, event.id])

  if (result && result.rowCount === 1) {
    return { message: 'Event updated', image: event.image }
  } else {
    throw new Error('The given event was not updated')
  }
}

/**
 * Removes an event given its identifier
 * @param {*} eventId
 */
module.exports.removeEvent = async (eventId) => {
  logger.info('Removing event %s', eventId)
  const result = await database.query('DELETE FROM EVENTS WHERE ID = $1', [eventId])
  if (result && result.rowCount === 1) {
    return { message: 'Event removed' }
  } else {
    throw new Error('The given event was not removed')
  }
}

/**
 * Retrieves an event by a specific identifier
 * @param {*} eventId
 */
module.exports.retrieveEventById = async (eventId) => {
  logger.info('Looking for event with id %s', eventId)

  const result = await database.query('SELECT * FROM EVENTS WHERE ID = $1', [eventId])
  if (result.rows && result.rows.length === 0) {
    return
  }
  const event = result.rows.shift()
  return {
    id: event.id,
    title: event.title,
    organizer: event.organizer,
    maxCapacity: event.max_capacity,
    price: event.price,
    date: event.date,
    location: event.location,
    image: event.image,
    description: event.description
  }
}

/**
 * Retrieves all the events after the current moment
 */
module.exports.retrieveEvents = async () => {
  logger.info('Looking for events')

  const result = await database.query('SELECT * FROM EVENTS WHERE DATE > CURRENT_TIMESTAMP ORDER BY DATE ASC')
  if (result.rows && result.rows.length === 0) {
    return
  }
  const events = result.rows.map((event) => {
    return {
      id: event.id,
      title: event.title,
      organizer: event.organizer,
      maxCapacity: event.max_capacity,
      price: event.price,
      date: event.date,
      location: event.location,
      image: event.image,
      description: event.description
    }
  })
  return events
}
