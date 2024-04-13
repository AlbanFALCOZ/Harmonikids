import { Theme } from '../models/theme.model';
import { QUIZ_LIST } from "./quiz-list.mock";


export const THEME_LIST: Theme[] = [
    {
        id: '1',
        name: 'La nourriture',
        description: 'Description du theme 1',
        numberOfQuizzes: 3,
        quizzes: QUIZ_LIST,
        image: 'assets/img/food.jpg',
    },
    {
        id: '2',
        name: 'Le sport',
        description: 'Description du theme 2',
        numberOfQuizzes: 8,
        quizzes: QUIZ_LIST,
        image: 'assets/img/sports.png'
    },
    {
        id: '3',
        name: 'Les pays du monde',
        description: 'Description du theme 3',
        numberOfQuizzes: 5,
        quizzes: QUIZ_LIST,
        image: 'assets/img/drapeaux.jpg'
    },
    {
        id: '4',
        name: 'L\'astronomie',
        description: 'Description du theme 4',
        numberOfQuizzes: 2,
        quizzes: QUIZ_LIST,
        image: 'assets/img/etoile.jpg'
    },
    {
        id: '5',
        name: 'Les mathèmatiques',
        description: 'Description du theme 5',
        numberOfQuizzes: 3,
        quizzes: QUIZ_LIST,
        image: 'assets/img/maths.jpg'
    },
    {
        id: '6',
        name: 'La langue française',
        description: 'Description du theme 6',
        numberOfQuizzes: 1,
        quizzes: QUIZ_LIST,
        image: 'assets/img/maths.jpg'
    }

];
