import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /*
   The list of quiz.
   The list is retrieved from the mock.
   */
  private quizzes: Quiz[] = QUIZ_LIST;

  /*
   Observable which contains the list of the quiz.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]>
    = new BehaviorSubject(this.quizzes);

  public quizSelected$: Subject<Quiz> = new Subject();

  // private quizUrl = serverUrl + '/quizzes';
  //private questionsPath = 'questions';

  // private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveQuizzes();
  }

  retrieveQuizzes(): void {
    // this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
    //   this.quizzes = quizList;
    //   this.quizzes$.next(this.quizzes);
    // });
    this.quizzes$.next(this.quizzes);
  }

  addQuiz(quiz: Quiz): void {
    this.quizzes
    this.quizzes$.next(this.quizzes);
  }
  

  setSelectedQuiz(quizId: string): void {
    const selectedQuiz = this.quizzes.find(quiz => quiz.id === quizId);
    if (selectedQuiz) {
      this.quizSelected$.next(selectedQuiz);
    }
    
  }

  deleteQuiz(quiz: Quiz): void {
    
  }

  addQuestion(quiz: Quiz, question: Question): void {
    
  }

  deleteQuestion(quiz: Quiz, question: Question): void {
    
  }

  /*
  Note: The functions below don't interact with the server. It's an example of implementation for the exercice 10.
  addQuestion(quiz: Quiz, question: Question) {
    quiz.questions.push(question);
    const index = this.quizzes.findIndex((q: Quiz) => q.id === quiz.id);
    if (index) {
      this.updateQuizzes(quiz, index);
    }
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const index = quiz.questions.findIndex((q) => q.label === question.label);
    if (index !== -1) {
      quiz.questions.splice(index, 1)
      this.updateQuizzes(quiz, index);
    }
  }

  private updateQuizzes(quiz: Quiz, index: number) {
    this.quizzes[index] = quiz;
    this.quizzes$.next(this.quizzes);
  }
  */


}
