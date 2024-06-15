import { Answer } from "./question.model";

export interface Game {
    memberId: number;
    quizId: number;
    questionId: number;
    correctFirstAttemptCount: number;
    chosenAnswers: { [questionId: number]: Answer[] };
    isQuizCompleted: boolean;
}

