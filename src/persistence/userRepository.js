const database = require('../config/database').pool
const logger = require('pino')()

/**
 * Creates an user given its detail information, an unique userId will be asigned using an uuid
 * @param {*} user
 */
module.exports.createUser = async (user) => {
  logger.info('Creating a new user %s, %s', user.username, user.email)
  const defaultRole = 'user'
  try {
    const result = await database.query('INSERT INTO USERS (USERNAME, EMAIL, SECRET, ROLE) VALUES ($1, $2, $3, $4) RETURNING ID', [user.username, user.email, user.secret, defaultRole])
    logger.info(result)
    if (result && result.rows) {
      return { userId: result.rows[0].id }
    }
  } catch (error) {
    if (error.code === '23505') {
      throw new Error('An user with the provided information already exists')
    } else {
      throw new Error(error.message)
    }
  }
}

/**
 * Retrieves a user given its unique identifier
 * @param {string} userId
 */
module.exports.retrieveUserByUsername = async (username) => {
  logger.info('Looking for user %s', username)

  const result = await database.query('SELECT ID, USERNAME, SECRET, EMAIL, ROLE FROM USERS WHERE USERNAME = $1', [username])
  if (result.rows && result.rows.length === 0) {
    return
  }
  const user = result.rows.shift()
  return { id: user.id, username: user.username, password: user.secret, email: user.email, role: user.role }
}
