import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from 'src/models/question.model';

@Injectable({
    providedIn: 'root'
})
export class FilteredQuestionService {

    private filteredQuestions: Question[] = [];

    public filteredQuestions$: BehaviorSubject<Question[]>
        = new BehaviorSubject(this.filteredQuestions);

    constructor() { }

    updateFilteredQuestions(questions: Question[]): void {
        this.filteredQuestions = questions;
        this.filteredQuestions$.next(this.filteredQuestions);
    }

    getFilteredQuestions(): Question[] {
        return this.filteredQuestions;
    }
}
