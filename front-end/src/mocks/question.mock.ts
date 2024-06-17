import { Question, QuestionType } from '../models/question.model';

export const MULTI_CHOICE: Question = {
    id: 1,
    label: 'Quels sont les animaux domestiques?',
    typeOfQuestion: QuestionType.MultipleChoice,
    niveau: 'Facile',
    image: 'assets/img/chien.jpeg',
    answers: [
        {
            id: 1,
            value: 'Le chat',
            isCorrect: true,
        },
        {
            id: 2,
            value: 'Le chien',
            isCorrect: true,
        },
        {
            id: 3,
            value: 'Le lion',
            isCorrect: false,
        },
        {
            id: 4, // id de la réponse                                                                 
            value: 'Le tigre',
            isCorrect: false,
        }
    ],
    hint: {
        text: "Pense à des animaux que les gens peuvent avoir chez eux pour les câliner et jouer avec eux."
    },
    quizId: 0
};

export const UNIQUE_CHOICE: Question = {
    id: 2,
    label: 'Parmi ces animaux, lequel miaule?',
    typeOfQuestion: QuestionType.UniqueChoice,
    niveau: 'Facile',
    image: 'assets/img/reflexion.png',
    answers: [
        {
            id: 1,
            value: 'Le chat',
            isCorrect: true,
        },
        {
            id: 2,
            value: 'Le chien',
            isCorrect: false,
        },
        {
            id: 3,
            value: 'Le lion',
            isCorrect: false,
        },
        {
            id: 4,
            value: 'Le tigre',
            isCorrect: false,
        }
    ],
    hint: {
        audioUrl: 'assets/img/miaule.mp3'
    },
    quizId: 0
};

export const TRUE_FALSE: Question = {
    id: 3,
    label: 'Le chien aboie?',
    typeOfQuestion: QuestionType.TrueOrFalse,
    niveau: 'Moyen',
    image: 'assets/img/chien.jpeg',
    answers: [
        {
            id: 1,
            value: 'Vrai',
            isCorrect: true,
        },
        {
            id: 2,
            value: 'Faux',
            isCorrect: false,
        },
    ],
    quizId: 0
};

export const DRAG_DROP1: Question = {
    id: 4,
    label: 'Quel animal a six pattes ?',
    typeOfQuestion: QuestionType.DragAndDrop,
    niveau: 'Moyen',
    image: 'assets/img/chien.jpeg',
    answers: [
        {
            id: 1,
            value: 'Fourmie',
            isCorrect: true,
        },
        {
            id: 2,
            value: 'Singe',
            isCorrect: false,
        },
        {
            id: 3,
            value: 'Giraffe',
            isCorrect: false,
        },
        {
            id: 4,
            value: 'Tigre',
            isCorrect: false,
        },
    ],
    hint: {
        imageUrl: 'assets/img/fourmis.png'
    },
    quizId: 0
};

export const DRAG_DROP2: Question = {
    id: 5,
    label: 'Une question intéréssante:La reponse est Sara ?',
    typeOfQuestion: QuestionType.DragAndDrop,
    niveau: 'Difficile',
    image: 'assets/img/chien.jpeg',
    answers: [
        {
            id: 1,
            value: 'Sara',
            isCorrect: true,
        },
        {
            id: 2,
            value: 'Stacy',
            isCorrect: false,
        },
        {
            id: 3,
            value: 'Nora',
            isCorrect: false,
        },
        {
            id: 4,
            value: 'Alban',
            isCorrect: false,
        },
    ],
    quizId: 0
};

export const SOUND: Question = {
    id: 6,
    label: 'Quel animal fait ce bruit ?',
    typeOfQuestion: QuestionType.GuessTheSound,
    niveau: 'Difficile',
    audio: 'assets/miaule.mp3',
    image: 'assets/img/chatB.png',
    answers: [
        {
            id: 1,
            value: 'Chat',
            isCorrect: true,
        },
        {
            id: 2,
            value: 'Chien',
            isCorrect: false,
        },
        {
            id: 3,
            value: 'Oiseau',
            isCorrect: false,
        },
        {
            id: 4,
            value: 'Vache',
            isCorrect: false,
        },
    ],
    quizId: 0
};

export const QUESTION_LIST: Question[] = [MULTI_CHOICE, UNIQUE_CHOICE, TRUE_FALSE, DRAG_DROP1, DRAG_DROP2, SOUND];
