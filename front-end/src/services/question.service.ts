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
    return storedQuestions ? JSON.parse(storedQuestions) : [];
  }

  removeQuestionFromLocalStorage(type : QuestionType): void {
    let storedQuestions: Question[] = this.getQuestionsFromLocalStorage();
    storedQuestions = storedQuestions.filter(question => question.typeOfQuestion !== type);
    localStorage.setItem('questions', JSON.stringify(storedQuestions));
}

addToLocalStorageByType(questionType: QuestionType): void {
  
  let storedQuestions: Question[] = this.getQuestionsFromLocalStorage();
  
  
  let questionsToAdd: Question[] = this.getQuestionByType(questionType);


  questionsToAdd.forEach(question => {
      if (!storedQuestions.some(q => q.typeOfQuestion === question.typeOfQuestion)) {
          storedQuestions.push(question);
      }
  });

  
  localStorage.setItem('questions', JSON.stringify(storedQuestions));
}


  

  getQuestionByType(type: QuestionType): Question[] {
    return this.questions.filter(question => question.typeOfQuestion === type);
  }


  

}
