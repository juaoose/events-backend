const database = require('../config/database').pool
const logger = require('pino')()

module.exports.createEvent = async (event) => {
  logger.info('Creating a new event %s', event.title)
  const result = await database.query('INSERT INTO events (TITLE, ORGANIZER, MAX_CAPACITY, PRICE, DATE, LOCATION) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ID',
    [event.title, event.organizer, event.max_capacity, event.price, event.date, event.location])
  if (result && result.rows) {
    return { id: result.rows[0].id }
  }
}

module.exports.updateEvent = async (event) => {
  logger.info('Updating event %s', event.id)
  const result = await database.query('UPDATE EVENTS SET title=$1, organizer=$2, max_capacity=$3, price=$4, date=$5, location=$6 WHERE id= $7',
    [event.title, event.organizer, event.max_capacity, event.price, event.date, event.location, event.id])

  if (result && result.rowCount === 1) {
    return { message: 'Event updated' }
  } else {
    throw new Error('The given event was not updated')
  }
}

module.exports.removeEvent = async (eventId) => {
  logger.info('Removing event %s', eventId)
  const result = await database.query('DELETE FROM EVENTS WHERE ID = $1', [eventId])
  if (result && result.rowCount === 1) {
    return { message: 'Event removed' }
  } else {
    throw new Error('The given event was not removed')
  }
}

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
    max_capacity: event.max_capacity,
    price: event.price,
    date: event.date,
    location: event.location
  }
}
