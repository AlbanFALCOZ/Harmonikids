import { Question, QuestionType } from '../models/question.model';

export const MULTI_CHOICE: Question = {
    id: '1',
    label: 'Quels sont les animaux domestiques?',
    typeOfQuestion: QuestionType.MultipleChoice,
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
    ],
    hint: {
        text: "Pense à des animaux que les gens peuvent avoir chez eux pour les câliner et jouer avec eux."
      }
};

export const UNIQUE_CHOICE: Question = {
    id: '2',
    label: 'Parmi ces animaux, lequel miaule?',
    typeOfQuestion: QuestionType.UniqueChoice,
    niveau: 'facile',
    image: 'assets/img/reflexion.png',
    answers: [
        {
            value: 'Le chat',
            isCorrect: true,
        },
        {
            value: 'Le chien',
            isCorrect: false,
        },
        {
            value: 'Le lion',
            isCorrect: false,
        },
        {
            value: 'Le tigre',
            isCorrect: false,
        }
    ],
    hint: {
        audioUrl: 'assets/img/miaule.mp3'
    }
};

export const TRUE_FALSE: Question = {
    id: '3',
    label: 'Le chien aboie?',
    typeOfQuestion: QuestionType.TrueOrFalse,
    niveau: 'moyen',
    image: 'assets/img/chien.jpeg',
    answers: [
        {
            value: 'Vrai',
            isCorrect: true,
        },
        {
            value: 'Faux',
            isCorrect: false,
        },
    ]
};

export const DRAG_DROP1: Question = {
    id: '4',
    label: 'Quel animal a six pattes',
    typeOfQuestion: QuestionType.DragAndDrop,
    niveau: 'moyen',
    image: 'assets/img/chien.jpeg',
    answers: [
        {
            value: 'Fourmie',
            isCorrect: true,
        },
        {
            value: 'Singe',
            isCorrect: false,
        },
        {
            value: 'Giraffe',
            isCorrect: false,
        },
        {
            value: 'Tigre',
            isCorrect: false,
        },
    ],
    hint: {
        imageUrl: 'assets/img/fourmis.png'
    }
};

export const DRAG_DROP2: Question = {
    id: '5',
    label: 'Une question intéréssante:La reponse est Sara ?',
    typeOfQuestion: QuestionType.DragAndDrop,
    niveau: 'difficile',
    image: 'assets/img/chien.jpeg',
    answers: [
        {
            value: 'Sara',
            isCorrect: true,
        },
        {
            value: 'Stacy',
            isCorrect: false,
        },
        {
            value: 'Nora',
            isCorrect: false,
        },
        {
            value: 'Alban',
            isCorrect: false,
        },
    ]
};

export const SOUND: Question = {
    id: '6',
    label: 'Quel animal fait ce bruit ?',
    typeOfQuestion: QuestionType.GuessTheSound,
    niveau: 'facile',
    audio: 'assets/miaule.mp3',
    image: 'assets/img/chatB.png',
    answers: [
        {
            value: 'Chat',
            isCorrect: true,
        },
        {
            value: 'Chien',
            isCorrect: false,
        },
        {
            value: 'Oiseau',
            isCorrect: false,
        },
        {
            value: 'Vache',
            isCorrect: false,
        },
    ]
};

export const QUESTION_LIST: Question[] = [MULTI_CHOICE, UNIQUE_CHOICE, TRUE_FALSE, DRAG_DROP1, SOUND];
