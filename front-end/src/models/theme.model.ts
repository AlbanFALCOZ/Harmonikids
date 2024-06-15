import { Quiz } from "./quiz.model"

export interface Theme {
    id: number;
    name : string;
    description: string;
    quizzes: Quiz[];
    image: String;
}