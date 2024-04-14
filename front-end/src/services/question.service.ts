import { Injectable } from '@angular/core';
import { Question, QuestionType } from '../models/question.model';
import { Quiz } from '../models/quiz.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { QuizService } from './quiz.service';
import { QUESTION_LIST } from 'src/mocks/question.mock';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {




 
  private questions: Question[] = [];

  selectedQuestionTypes: QuestionType[] = [];
 
  public questions$: BehaviorSubject<Question[]>
    = new BehaviorSubject(this.questions);

  public questionSelected$: Subject<Question[]> = new Subject();
  selectedTypes: any;

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

  getQuestionById(id: string): Question | undefined {
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
  
  
  

}
