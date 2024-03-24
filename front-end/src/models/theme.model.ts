import { Quiz } from "./quiz.model"

export interface Theme {
    id: string;
    name : string;
    description: string;
    numberOfQuizzes: number;
    quizzes: Quiz[];
}