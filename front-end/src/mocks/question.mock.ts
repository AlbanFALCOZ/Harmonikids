import { Question } from '../models/question.model';
import { TypeQuestion } from '../models/typeQuestion.model';

export const type: TypeQuestion = {
    id: '1',
    name: 'Multiple choice'
}

export const QUESTION_CHOICE: Question = {
    id: '1',
    label: 'Quels sont les animaux domestiques?',
    typeOfQuestion: type,
    niveau: 'facile',
    image: 'assets/img/chien.jpeg',
    answers: [
        {
            value: 'Le chat',
            isCorrect: true,
        },
        {
            value: 'Le chien',
            isCorrect: true,
        },
        {
            value: 'Le lion',
            isCorrect: false,
        },
        {
            value: 'Le tigre',
            isCorrect: false,
        }
    ]
};

export const QUESTION_LIST: Question[] = [QUESTION_CHOICE];
