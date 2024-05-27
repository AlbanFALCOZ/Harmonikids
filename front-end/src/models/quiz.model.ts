import { Question } from './question.model';

export interface Quiz {
    id: number;
    name: string;
    description : string;
    theme: string;
    questions: Question[];
    statut: string;
    image: string;
}
