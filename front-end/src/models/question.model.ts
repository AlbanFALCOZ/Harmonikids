import { TypeQuestion } from "./typeQuestion";

export interface Answer {
    type?: string;
    value: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    label: string;
    typeOfQuestion: TypeQuestion;
    answers: Answer[];
}
