import { Question } from './question.model';

export interface Quiz {
    id: string;
    name: string;
    description : string;
    theme: string;
    questions: Question[];
    statut: string;
    image: string;
}
