const ticketRepo = require('../persistence/ticketRepository')

/**
 * Creates a ticket, resembling a purchase operation
 * @param {*} subscription
 */
module.exports.createTicket = async (subscription) => {
  const result = await ticketRepo.createTicket(subscription)
  return result
}

/**
 * Retrieves all the tickets that a user has
 * @param {*} userId
 */
module.exports.findTickets = async (userId) => {
  const result = await ticketRepo.findTickets(userId)
  if (result) {
    return { tickets: result }
  } else {
    return { tickets: [] }
  }
}
