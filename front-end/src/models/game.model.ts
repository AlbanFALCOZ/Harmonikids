import { Answer } from "./question.model";

export class GameProgress {
    quizId: number;
    currentQuestionIndex: number;
    correctFirstAttemptCount: number;
    chosenAnswers: { [questionIndex: number]: Answer[] };
    isQuizCompleted: boolean;

    constructor(quizId: number) {
        this.quizId = quizId;
        this.currentQuestionIndex = 0;
        this.correctFirstAttemptCount = 0;
        this.chosenAnswers = {};
        this.isQuizCompleted = false;
    }
}
