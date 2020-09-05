const database = require('../config/database').pool
const logger = require('pino')()

module.exports.createTicket = async (ticket) => {
  logger.info('User %s is attending %s', ticket.userId, ticket.eventId)
  const result = await database.query('INSERT INTO tickets(event_id, buyer_user_id, name, birth_date) VALUES ($1, $2, $3, $4) RETURNING ID',
    [ticket.eventId, ticket.buyerId, ticket.name, ticket.birthDate])
  if (result && result.rows) {
    return { id: result.rows[0].id }
  }
}

module.exports.findTickets = async (userId, eventId) => {
  logger.info('Retrieving tickets for user %s to event %s', userId, eventId)
  const result = await database.query('SELECT id, event_id, buyer_user_id, name, birth_date FROM tickets WHERE EVENT_ID = $1 AND BUYER_USER_ID = $2',
    [eventId, userId])
  if (result.rows && result.rows.length === 0) {
    return
  }
  const tickets = result.rows.map((ticket) => { return { id: ticket.id, eventId: ticket.event_id, buyerId: ticket.buyer_user_id, name: ticket.name, birthDate: ticket.birth_date } })
  return tickets
}
