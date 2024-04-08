import { Theme } from '../models/theme.model';
import { QUIZ_LIST } from "./quiz-list.mock";


export const THEME_LIST: Theme[] = [
    {
        id: '1',
        name: 'La nourriture',
        description: 'Description du quiz 1',
        numberOfQuizzes: 1,
        quizzes: QUIZ_LIST,
        image: 'assets/img/food.jpg',
    },
    {
        id: '2',
        name: 'Le sport',
        description: 'Description du quiz 2',
        numberOfQuizzes: 1,
        quizzes: QUIZ_LIST,
        image: 'assets/img/sports.png'
    },
    {
        id: '3',
        name: 'Les pays du monde',
        description: 'Description du quiz 3',
        numberOfQuizzes: 1,
        quizzes: QUIZ_LIST,
        image: 'assets/img/drapeaux.jpg'
    },
    {
        id: '4',
        name: 'L\'astronomie',
        description: 'Description du quiz 3',
        numberOfQuizzes: 1,
        quizzes: QUIZ_LIST,
        image: 'assets/img/etoile.jpg'
    },
    {
        id: '4',
        name: 'Les mathèmatiques',
        description: 'Description du quiz 3',
        numberOfQuizzes: 1,
        quizzes: QUIZ_LIST,
        image: 'assets/img/math.jpg'
    },
    {
        id: '5',
        name: 'Les mathèmatiques',
        description: 'Description du quiz 3',
        numberOfQuizzes: 1,
        quizzes: QUIZ_LIST,
        image: 'assets/img/math.jpg'
    }

];
