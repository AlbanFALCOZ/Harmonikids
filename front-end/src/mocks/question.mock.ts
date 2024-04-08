import { Question, QuestionType } from '../models/question.model';

export const MULTI_CHOICE: Question = {
    id: '1',
    label: 'Quels sont les animaux domestiques?',
    typeOfQuestion: QuestionType.MultipleChoice,
    niveau: 'facile',
    isCorrectQuestion: false,
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
    image: 'assets/img/chien.jpeg',
    isCorrectQuestion: false,
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
    isCorrectQuestion: false,
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
    label: 'Comment se nomme notre planéte?',
    typeOfQuestion: QuestionType.DragAndDrop,
    niveau: 'moyen',
    image: 'assets/img/chien.jpeg',
    isCorrectQuestion: false,
    answers: [
        {
            value: 'Terre',
            isCorrect: true,
        },
        {
            value: 'Mercure',
            isCorrect: false,
        },
        {
            value: 'Venus',
            isCorrect: false,
        },
        {
            value: 'Jupiter',
            isCorrect: false,
        },
    ],
    hint: {
        imageUrl: 'assets/img/terre.jpg'
    }
};

export const DRAG_DROP2: Question = {
    id: '5',
    label: 'Une question intéréssante:La reponse est Sara ?',
    typeOfQuestion: QuestionType.DragAndDrop,
    niveau: 'difficile',
    image: 'assets/img/chien.jpeg',
    isCorrectQuestion: false,
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
    image: 'assets/img/cat.jpeg',
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
