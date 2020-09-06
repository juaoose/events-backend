const jwt = require('jsonwebtoken')
const userRepo = require('../persistence/userRepository')
const bcrypt = require('bcrypt')

const saltRounds = 10

/**
 * Authenticates an user if the given username and password are valid, returning a JWT
 * @param {} authInformation
 */
module.exports.authenticateUser = async (authInformation) => {
  var user = await userRepo.retrieveUserByUsername(authInformation.username)
  const secretsMatch = await bcrypt.compare(authInformation.password, user.password)
  if (secretsMatch) {
    const token = generateJwt(user)
    return { id: user.id, username: user.username, token: token }
  } else {
    throw new Error('Incorrect login information')
  }
}

/**
 * Creates a new user using its provided information
 * @param {*} user
 */
module.exports.createUser = async (user) => {
  const secret = await bcrypt.hash(user.password, saltRounds)
  const newUser = {
    username: user.username,
    email: user.email,
    secret: secret
  }

  const result = await userRepo.createUser(newUser)
  return result
}

/**
 * Retrieves a username given its unique username
 * @param {*} username
 */
module.exports.retrieveUser = async (username) => {
  const result = await userRepo.retrieveUserByUsername(username)
  return result
}

const generateJwt = (user) => {
  return jwt.sign({ userId: user.userId, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '4h' })
}
