import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Answer } from 'src/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private score = 0;

  private numberOfQuestionsAnsweredSubject = new BehaviorSubject<number>(0);
  public numberOfQuestionsAnswered$ = this.numberOfQuestionsAnsweredSubject.asObservable();

  private numberOfCorrectAnswersSubject  = new BehaviorSubject<number>(0);
  public numberOfCorrectAnswers$ = this.numberOfCorrectAnswersSubject.asObservable();

  private allSelectedAnswers: Answer[] = [];
  private correctAnswers: Answer[] = [];

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

  setScore(score: number) {
    this.score = score;
  }
  getScore() {
    return this.numberOfCorrectAnswersSubject.getValue();
  }

  setAllSelectedAnswers(answers: Answer[]) {
    this.allSelectedAnswers = answers;
  }

  setCorrectAnswers(answers: Answer[]) {
    this.correctAnswers = answers;
  }

  getAllSelectedAnswers(): Answer[] {
    return this.allSelectedAnswers;
  }

  getCorrectAnswers(): Answer[] {
    return this.correctAnswers;
  }

}