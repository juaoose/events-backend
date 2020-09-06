const ticketRepo = require('../persistence/ticketRepository')

module.exports.createTicket = async (subscription) => {
  const result = await ticketRepo.createTicket(subscription)
  return result
}

module.exports.findTickets = async (userId) => {
  const result = await ticketRepo.findTickets(userId)
  if (result) {
    return result
  } else {
    throw new Error('Event not found')
  }
}
