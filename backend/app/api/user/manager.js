const { User } = require('../../models')


/**
 * Function buildUser.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param UserId
 */
const buildUser = (UserId) => {
    const user = User.getById(UserId)
 
  return { user}
}

/**
 * Function buildUsers.
 * This function aggregates the questions and answers from the database to build entire users.
 */
const buildUsers = () => {
  const users = User.get()
  return users.map((user) => buildUser(user.id))
}

module.exports = {
  buildUser,
  buildUsers,
}