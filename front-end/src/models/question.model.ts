export enum QuestionType {
    MultipleChoice = 'multiple-choice',
    DragAndDrop = 'drag-and-drop',
    UniqueChoice = 'unique-choice',
    TrueOrFalse = 'true-or-false',
    GuessTheSound = "guess-the-sound",
}


export interface Answer {
    id?: number;
    value: string;
    isCorrect: boolean;
    isSelected?: boolean;
    alreadySelected?: boolean;
}

export interface Question {
    id: number;
    label: string;
    typeOfQuestion: QuestionType;
    niveau: string;
    image?: string;
    audio?:string;
    answers: Answer[];
    hint?: {
        text?: string;
        imageUrl?: string;
        audioUrl?: string;
      };
    quizId:number
    
}
