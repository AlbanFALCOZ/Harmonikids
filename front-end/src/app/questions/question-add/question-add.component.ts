import { Component } from '@angular/core';
import { QUESTION_LIST } from 'src/mocks/question.mock';
import { Question, QuestionType } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { NavbarService } from 'src/services/navbar.service';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrl: './question-add.component.scss'
})
export class QuestionAddComponent {

  displayForm = false;

  displayFormUpdate = false;

  displayFormDelete = false;
  isNavVisible = false;
  questions = QUESTION_LIST;

  quizList: Quiz[] = [];

  constructor(private navbarService: NavbarService, private quizService: QuizService) {
    this.navbarService.isNavbarVisible$.subscribe(isVisible => {
      this.isNavVisible = isVisible;
    });
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;;
    });
  }

  toggleForm() {
    this.displayForm = !this.displayForm;
  }

  toggleFormUpdate() {
    this.displayFormUpdate = !this.displayFormUpdate;
  }

  toggleFormDelete() {
    this.displayFormDelete = !this.displayFormDelete;
  }

  question: Question = {
    id: 1,
    label: '',
    typeOfQuestion: QuestionType.MultipleChoice,
    niveau: '',
    answers: [{ id: 1, value: '', isCorrect: false }],
    hint: { text: '', imageUrl: '' },
    quizId: 0
  };

  addAnswer() {
    this.question.answers.push({ id: 1, value: '', isCorrect: false });
  }

  submitForm() {
    this.displayForm = false;
    
  }

}
