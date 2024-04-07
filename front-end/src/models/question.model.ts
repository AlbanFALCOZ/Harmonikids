export enum QuestionType {
    MultipleChoice = 'multiple-choice',
    DragAndDrop = 'drag-and-drop',
    UniqueChoice = 'unique-choice',
    TrueOrFalse = 'true-or-false',
    GuessTheSound = "guess-the-sound",
}


export interface Answer {
    type?: string;
    value: string;
    isCorrect: boolean;
}

export interface Question {
    id: string;
    label: string;
    typeOfQuestion: QuestionType;
    niveau: string;
    image?: string;
    audio?:string;
    answers: Answer[];
}
