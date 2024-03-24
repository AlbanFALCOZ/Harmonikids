import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { QUESTION_LIST } from '../mocks/question.mock';
import { Question } from '../models/question.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
 
  private questions: Question[] = QUESTION_LIST;

 
  public questions$: BehaviorSubject<Question[]>
    = new BehaviorSubject(this.questions);

  public questionSelected$: Subject<Question[]> = new Subject();

  constructor(private http: HttpClient) {
    this.retrieveQuestions();
  }

  retrieveQuestions(): void {
    this.questions$.next(this.questions);
  }

  
}
