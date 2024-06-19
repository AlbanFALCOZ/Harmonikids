import { Answer } from "./question.model";

export interface Game {
    id: number;
    childId: number;
    quizId: number;
    correctFirstAttemptCount: number;
    chosenAnswers: { [questionId: number]: Answer[] };
    isQuizCompleted: boolean;
    score: number;
}


