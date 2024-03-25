import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question } from 'src/models/question.model';
import { QUESTION_LIST } from 'src/mocks/question.mock';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  constructor() { }

  getDragDropList(): Observable<Question[]> {
    return of(QUESTION_LIST);
  }

  getDragDropById(id: string): Observable<Question | undefined> {
    const question = QUESTION_LIST.find(item => item.id === id);
    return of(question);
  }
  
  getItems(id: string): Observable<{ item1: string, item2: string, item3: string } | undefined> {
    const question = QUESTION_LIST.find(item => item.id === id);
    if (question) {
      return of({ item1: question.answers[0].value, item2: question.answers[1].value, item3: question.answers[2].value });
    } else {
      return of(undefined);
    }
  }

  getRightAnswer(id: string): Observable<string | undefined> {
    const question = QUESTION_LIST.find(item => item.id === id);
    if (question) {
      return of(question.answers.find(answer => answer.isCorrect)?.value);
    } else {
      return of(undefined);
    }
  }

  getQuestion(id: string): Observable<string | undefined> {
    const question = QUESTION_LIST.find(item => item.id === id);
    if (question) {
      return of(question.label);
    } else {
      return of(undefined);
    }
  }
}







