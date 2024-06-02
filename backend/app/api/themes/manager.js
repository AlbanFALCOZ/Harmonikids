const { Theme } = require('../../models')

/**
 * Function buildQuizz.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param quizId
 */
const buildTheme = (themeId) => {
    const theme = Theme.getById(themeId)
    theme.quizzes = []
    return theme

    // const quiz = Quiz.getById(quizId)
    // quiz.questions = []
    // const questions = filterQuestionsFromQuizz(quiz.id)
    // const questionWithAnswers = questions.map((question) => {
    //     const answers = filterAnswersFromQuestion(question.id)
    //     return { ...question, answers }
    // })
    // return { ...quiz, questions: questionWithAnswers }
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */
const buildThemes = () => {
    const themes = Theme.get()
    return themes.map((theme) => buildTheme(theme.id))
}

module.exports = {
    buildTheme,
    buildThemes,
}
