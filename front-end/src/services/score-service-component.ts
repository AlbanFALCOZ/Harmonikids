import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private numberOfQuestionsAnsweredSubject = new BehaviorSubject<number>(0);
  public numberOfQuestionsAnswered$ = this.numberOfQuestionsAnsweredSubject.asObservable();

  private numberOfCorrectAnswersSubject  = new BehaviorSubject<number>(0);
  public numberOfCorrectAnswers$ = this.numberOfCorrectAnswersSubject.asObservable();

  answerCorrect() {
    const currentNumberOfQuestionsAnswered = this.numberOfQuestionsAnsweredSubject.getValue();
    const currentNumberOfCorrectAnswers = this.numberOfCorrectAnswersSubject.getValue();
    this.numberOfQuestionsAnsweredSubject.next(currentNumberOfQuestionsAnswered + 1);
    this.numberOfCorrectAnswersSubject.next(currentNumberOfCorrectAnswers + 1);
  }

  answerWrong() {
    const currentNumberOfQuestionsAnswered = this.numberOfQuestionsAnsweredSubject.getValue();
    this.numberOfQuestionsAnsweredSubject.next(currentNumberOfQuestionsAnswered + 1);
  }


}