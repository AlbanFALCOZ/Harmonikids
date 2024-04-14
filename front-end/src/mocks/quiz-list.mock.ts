import { Quiz } from '../models/quiz.model';
import { QUESTION_LIST } from './question.mock';

export const QUIZ_LIST: Quiz[] = [
    {
        id: '1',
        name: 'Les animaux',
        description: 'Description du quiz 1',
        theme: 'Theme 1',
        questions: QUESTION_LIST,
        statut : 'A faire',
        image: 'assets/img/animal.jpg'
    },
    {
        id: '2',
        name: 'L\'addition',
        description: 'Description du quiz 2',
        theme: 'Theme 2',
        questions: QUESTION_LIST,
        statut: 'A faire',
        image: 'assets/img/addition.jpg'
    },
    {
        id: '3',
        name: 'Les étoiles',
        description: 'Description du quiz 3',
        theme: 'Theme 3',
        questions: QUESTION_LIST,
        statut: 'En cours',
        image: 'assets/img/etoile.jpg'
    },
    {
        id: '4',
        name: 'Le basket',
        description: 'Description du quiz 4',
        theme: 'Theme 4',
        questions: QUESTION_LIST,
        statut: 'Terminé',
        image: 'assets/img/basketB.jpg'
    }

];
