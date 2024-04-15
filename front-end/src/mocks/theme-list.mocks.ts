import { Theme } from '../models/theme.model';
import { QUIZ_LIST } from "./quiz-list.mock";


export const THEME_LIST: Theme[] = [
    {
        id: '1',
        name: 'La nourriture',
        description: 'Description du theme 1',
        quizzes: QUIZ_LIST,
        image: 'assets/img/food.jpg',
    },
    {
        id: '2',
        name: 'Le sport',
        description: 'Description du theme 2',
        quizzes: QUIZ_LIST,
        image: 'assets/img/sport.jpg'
    },
    {
        id: '3',
        name: 'Les pays du monde',
        description: 'Description du theme 3',
        quizzes: QUIZ_LIST,
        image: 'assets/img/drapeaux.jpg'
    },
    {
        id: '4',
        name: 'L\'astronomie',
        description: 'Description du theme 4',
        quizzes: QUIZ_LIST,
        image: 'assets/img/etoileB.jpg'
    },
    {
        id: '6',

        name: 'Les animaux',
        description: 'Description du theme 5',
        quizzes: QUIZ_LIST,
        image: 'assets/img/animal.jpg'


    },
    {
        id: '5',
        name: 'Les mathèmatiques',

        description: 'Description du theme 6',
        
        quizzes: QUIZ_LIST,
        image: 'assets/img/mathsB.jpg'
    },
    {
        id: '7',
        name: 'La langue française',
        description: 'Description du theme 7',
       
        quizzes: QUIZ_LIST,
        image: 'assets/img/francais.jpg'


    }

];
