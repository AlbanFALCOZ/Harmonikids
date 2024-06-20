import { Component } from '@angular/core';
import { QUESTION_LIST } from 'src/mocks/question.mock';
import { Question, QuestionType } from 'src/models/question.model';
import { Quiz } from 'src/models/quiz.model';
import { NavbarService } from 'src/services/navbar.service';
import { QuizService } from 'src/services/quiz.service';
import { HttpClient } from '@angular/common/http';

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
  selectedFiles: { [key: string]: File } = {};

  constructor(private navbarService: NavbarService, private quizService: QuizService,  private http: HttpClient) {
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

  onFileSelected(event: any, fieldName: string) {
    this.selectedFiles[fieldName] = event.target.files[0];
  }

  submitForm() {
    const formData = new FormData();
    formData.append('label', this.question.label);
    formData.append('typeOfQuestion', this.question.typeOfQuestion);
    formData.append('niveau', this.question.niveau);
    formData.append('quizId', this.question.quizId.toString());

    this.question.answers.forEach((answer, index) => {
      formData.append(`answers[${index}][value]`, answer.value);
      formData.append(`answers[${index}][isCorrect]`, answer.isCorrect.toString());
    });

    if (this.selectedFiles['hintImageUrl']) {
      formData.append('hintImageUrl', this.selectedFiles['hintImageUrl']);
    }

    this.http.post('/api/quizzes/' + this.question.quizId + '/questions', formData).subscribe(response => {
      console.log(response);
      this.displayForm = false;
    });
  }
}