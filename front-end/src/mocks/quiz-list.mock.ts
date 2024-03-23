import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';
import { TypeQuestion } from 'src/models/typeQuestion';

export const type: TypeQuestion = {
    id: '1',
    name: 'Multiple choice'
}

export const QUESTION_ACTOR: Question = {
    id: '1',
    label: 'Jean Gabin a joué dans...',
    typeOfQuestion: type,
    answers: [
        {
            value: 'Les tuches II',
            isCorrect: false,
        },
        {
            value: 'La grande illusion',
            isCorrect: true,
        }
    ]
};

export const QUIZ_LIST: Quiz[] = [
    {
        id: '1',
        name: 'Les animaux',
        description: 'Description du quiz 1',
        theme: 'Theme 1',
        questions: [QUESTION_ACTOR],
        image: 'assets/img/animal.jpg'
    },
    {
        id: '2',
        name: 'L\'addition',
        description: 'Description du quiz 2',
        theme: 'Theme 2',
        questions: [QUESTION_ACTOR],
        image: 'assets/img/addition.jpg'
    },
    {
        id: '3',
        name: 'Les étoiles',
        description: 'Description du quiz 3',
        theme: 'Theme 3',
        questions: [QUESTION_ACTOR],
        image: 'assets/img/etoile.jpg'
    },
    {
        id: '4',
        name: 'Le basket',
        description: 'Description du quiz 4',
        theme: 'Theme 4',
        questions: [QUESTION_ACTOR],
        image: 'assets/img/basket.jpg'
    }

];
