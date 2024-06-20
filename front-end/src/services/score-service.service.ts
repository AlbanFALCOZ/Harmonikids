import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private numberOfCorrectAnswersSubject = new BehaviorSubject<number>(0);
  public numberOfCorrectAnswers$ = this.numberOfCorrectAnswersSubject.asObservable();


  updateSelectedAnswersCount(count: number) {
    this.numberOfCorrectAnswersSubject.next(count);
  }

}