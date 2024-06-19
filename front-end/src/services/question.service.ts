import { Injectable } from '@angular/core';
import { Question, QuestionType } from '../models/question.model';
import { Quiz } from '../models/quiz.model';
import { BehaviorSubject, Observable, Subject, forkJoin } from 'rxjs';
import { QuizService } from './quiz.service';
import { QUESTION_LIST } from 'src/mocks/question.mock';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { serverUrl } from 'src/configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questions: Question[] = [];
  private apiUrl = serverUrl;
  private quizId!: number;

  selectedQuestionTypes: QuestionType[] = [];
 
  public questions$: BehaviorSubject<Question[]>
    = new BehaviorSubject(this.questions);

  public questionSelected$: Subject<Question[]> = new Subject();
  selectedTypes: any;

  constructor(private http: HttpClient, public quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((selectedQuiz: Quiz) => {
      this.questions = selectedQuiz.questions;
      this.questions$.next(this.questions);
    });
    this.retrieveQuestions();
  }

  setCurrentQuizId(quizId: number): void {
    this.quizId = quizId;
  }

  getCurrentQuizId(): number {
    return this.quizId;
  }



  fetchQuestions(quizId: number): Observable<Question[]> {

    console.log("question service " + quizId);
    return this.http.get<Question[]>(`${this.apiUrl}/quizzes/${quizId}/questions`).pipe(
      tap(questions => {
        console.log('Fetched questions:', questions);
        this.questions = questions;
        this.questions$.next(this.questions);
        return this.questions;
      }),
      catchError(error => {
        console.error('Error fetching questions:', error);
        throw error; // Assurez-vous de gérer les erreurs appropriées ici
      })
    );
  }



  getQuestion(quizId: number, questionId: number): Observable<Question> {
    console.log('test');
    return this.http.get<Question>(`${this.apiUrl}/quizzes/${quizId}/questions/${questionId}`);
  }

  createQuestion(quizId: number, question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/quizzes/${quizId}/questions`, question).pipe(
      map((newQuestion) => {
        this.questions.push(newQuestion);
        this.questions$.next(this.questions);
        return newQuestion;
      })
    );
  }

  updateQuestion(quizId: number, questionId: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/quizzes/${quizId}/questions/${questionId}`, question).pipe(
      map((updatedQuestion) => {
        const index = this.questions.findIndex(q => q.id === updatedQuestion.id);
        if (index !== -1) {
          this.questions[index] = updatedQuestion;
          this.questions$.next(this.questions);
        }
        return updatedQuestion;
      })
    );
  }

  deleteQuestion(quizId: number, questionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/quizzes/${quizId}/questions/${questionId}`).pipe(
      map(() => {
        this.questions = this.questions.filter(q => q.id !== questionId);
        this.questions$.next(this.questions);
      })
    );
  }


  updateQuestionsForQuiz(questions: Question[]): void {
    this.questions = questions;
    this.questions$.next(this.questions);
    
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
    
    if (storedQuestions) {
      const parsedQuestions: Question[] = JSON.parse(storedQuestions);
     
      parsedQuestions.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        } else {
          return 0;
        }
      });
      return parsedQuestions;
    } else {
      return [];
    }
  }
  

  removeQuestionFromLocalStorage(type: QuestionType): void {
    let storedQuestions: Question[] = this.getQuestionsFromLocalStorage();
    storedQuestions = storedQuestions.filter(question => question.typeOfQuestion !== type);
    localStorage.setItem('questions', JSON.stringify(storedQuestions));
  }
  
  addToLocalStorageByType(questionType: QuestionType): void {
    let storedQuestions: Question[] = this.getQuestionsFromLocalStorage();
  
    
    const questionsToAdd: Question[] = this.getQuestionByType(questionType);
  
   
    questionsToAdd.forEach(question => {
      if (!storedQuestions.some(q => q.id === question.id)) {
        storedQuestions.push(question);
      }
    });
  
    
    storedQuestions.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    localStorage.setItem('questions', JSON.stringify(storedQuestions));
  }
  

  

  getQuestionByType(type: QuestionType): Question[] {
    return this.questions.filter(question => question.typeOfQuestion === type);
  }

  getQuestionById(id: number): Question | undefined {
    return this.questions.find(question => question.id === id);
  }
  

  initializeQuestion(): Question[] {
 
    const storedQuestions: Question[] = this.getQuestionsFromLocalStorage();

    const storedQuestionTypes: QuestionType[] = Array.from(new Set(storedQuestions.map(question => question.typeOfQuestion)));
  
    const allQuestionTypes: QuestionType[] = Array.from(new Set(this.questions.map(question => question.typeOfQuestion)));
  
    const missingQuestionTypes: QuestionType[] = allQuestionTypes.filter(type => !storedQuestionTypes.includes(type));
  
    missingQuestionTypes.forEach(type => {
      const missingQuestions: Question[] = this.getQuestionByType(type);
      missingQuestions.forEach(question => {
        storedQuestions.push(question);
      });
    });
  
    storedQuestions.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    localStorage.setItem('questions', JSON.stringify(storedQuestions));
    return storedQuestions;
  }
  

  updateQuestionQuizId(questionId: number, newQuizId: number): Observable<Question> {
    const url = `{this.apiUrl}/quizzes/1717355613792/questions/${questionId}`; 

    const updatePayload = {
      quizId: newQuizId
    };

    return this.http.put<Question>(url, updatePayload);
  }


  
  

}
