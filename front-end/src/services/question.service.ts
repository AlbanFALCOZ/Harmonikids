import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { Quiz } from '../models/quiz.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { QuizService } from './quiz.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
 
  private questions: Question[] = [];
 
  public questions$: BehaviorSubject<Question[]>
    = new BehaviorSubject(this.questions);

  public questionSelected$: Subject<Question[]> = new Subject();

  constructor(public quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((selectedQuiz: Quiz) => {
      this.questions = selectedQuiz.questions;
      this.questions$.next(this.questions);
    });
    this.retrieveQuestions();
  }


  updateQuestionsForQuiz(questions: Question[]): void {
    this.questions = questions;
    this.questions$.next(this.questions);
    this.saveQuestionsToLocalStorage(this.questions);
  }

  retrieveQuestions(): void {
    const storedQuestions = this.getQuestionsFromLocalStorage();
    if (storedQuestions.length > 0) {
      this.questions = storedQuestions;
      this.questions$.next(this.questions);
    }
  }

  saveQuestionsToLocalStorage(questions: Question[]): void {
    localStorage.setItem('questions', JSON.stringify(questions));
  }

  getQuestionsFromLocalStorage(): Question[] {
    const storedQuestions = localStorage.getItem('questions');
    return storedQuestions ? JSON.parse(storedQuestions) : [];
  }

}
