import { TypeQuestion } from "./typeQuestion.model";

export interface Answer {
    type?: string;
    value: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    label: string;
    typeOfQuestion: TypeQuestion;
    niveau: string;
    image?: string;
    answers: Answer[];
}
