const { Quiz } = require('../../models')
const { filterQuestionsFromQuizz } = require('./questions/manager')
const { filterAnswersFromQuestion } = require('./questions/answers/manager')
const quizModel = require('../../models/quiz.model')

/**
 * Function buildQuizz.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param quizId
 */
const buildQuizz = (quizId) => {
  const quiz = Quiz.getById(quizId)
  quiz.questions = []
  const questions = filterQuestionsFromQuizz(quiz.id)
  const questionWithAnswers = questions.map((question) => {
    const answers = filterAnswersFromQuestion(question.id)
    return { ...question, answers }
  })
  return { ...quiz, questions: questionWithAnswers }
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */
const buildQuizzes = () => {
  const quizzes = Quiz.get()
  return quizzes.map((quiz) => buildQuizz(quiz.id))
}

const updateQuizStatus = async (quizId, isCompleted) => {
  return await quizModel.update(quizId, { isQuizCompleted: isCompleted });
};

module.exports = {
  buildQuizz,
  buildQuizzes,
  updateQuizStatus,
}
