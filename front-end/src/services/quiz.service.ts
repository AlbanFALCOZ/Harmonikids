import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, map, of } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import { Question } from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  
  setSelectedQuizId(quizId: number) {
    this.quizSelectedId = quizId;
  }
  quizSelectedId: any;
  
  //   this.quizzes$.next(this.quizzes);
  // });
  getQuizzes(): Quiz[] {
    return this.quizzes;
  }
  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /*
   The list of quiz.
   The list is retrieved from the mock.
   */
  private quizzes: Quiz[] = [];

  /*
   Observable which contains the list of the quiz.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]>
    = new BehaviorSubject(this.quizzes);

  public quizSelected$: Subject<Quiz> = new Subject();

  private quizUrl = serverUrl + '/quizzes';
  private questionsPath = 'questions';
  private quizSelected = 0;
  private niveau = "facile";

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.retrieveQuizzes();
  }


  getQuizById(id: number): Observable<Quiz> {
    const quiz = this.quizzes.find(q => q.id === id);
    return of(quiz!);
  }


  retrieveQuizzes(): void {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }


  addQuiz(quiz: Quiz): Observable<any> {
    return this.http.post<any>(this.quizUrl, quiz, this.httpOptions);
  }

  editQuiz(quiz: Quiz): Observable<Quiz> {
    const url = this.quizUrl + '/' + quiz.id;
    return this.http.put<Quiz>(url, quiz, this.httpOptions);
  }


  setSelectedQuiz(quizId: number): void {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
    this.quizSelected = quizId;
  }

  deleteQuiz(quiz: Quiz): void {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.retrieveQuizzes());
  }

  addQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  private filteredQuestions: Question[] = [];

  setFilteredQuestions(questions: Question[]): void {
    this.filteredQuestions = questions;
  }

  getFilteredQuestions(): Question[] {
    return this.filteredQuestions;
  }

  updateQuizStatus(quizId: number): void {
    const url = this.quizUrl + '/' + quizId + '/statut';
    this.http.put<Quiz>(url, this.httpOptions);
    console.log('Quiz status updated');
    
  }

  setLevel(niveauName: string) {
    this.niveau = niveauName;
  }
  
  getLevel() {
    return this.niveau;
  }


}
