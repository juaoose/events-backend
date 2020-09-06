const database = require('../config/database').pool
const logger = require('pino')()

/**
 * Creates a ticket associated to an event and a user
 * @param {*} ticket 
 */
module.exports.createTicket = async (ticket) => {
  logger.info('User %s is attending %s', ticket.userId, ticket.eventId)
  const result = await database.query('INSERT INTO tickets(event_id, buyer_user_id) VALUES ($1, $2) RETURNING ID',
    [ticket.eventId, ticket.buyerId])
  if (result && result.rows) {
    return { id: result.rows[0].id }
  }
}

/**
 * Retrieves tickets associated to a specific user
 * @param {*} userId 
 */
module.exports.findTickets = async (userId) => {
  logger.info('Retrieving tickets for user %s', userId)
  const result = await database.query('SELECT id, event_id, buyer_user_id FROM tickets WHERE BUYER_USER_ID = $1',
    [userId])
  if (result.rows && result.rows.length === 0) {
    return
  }
  const tickets = result.rows.map((ticket) => { return { id: ticket.id, eventId: ticket.event_id, buyerId: ticket.buyer_user_id } })
  return tickets
}

/**
 * Removes all tickets associated to a specific event
 * @param {*} eventId 
 */
module.exports.removeTickets = async (eventId) => {
  logger.info('Removing tickets related to event %s', eventId)
  const result = await database.query('DELETE FROM TICKETS WHERE EVENT_ID = $1',
    [eventId])
  if (result && result.rowCount >= 0) {
    return { message: 'Operation successful' }
  } else {
    throw new Error('Error removing tickets')
  }
}
