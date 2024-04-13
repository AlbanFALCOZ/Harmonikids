import { Component } from '@angular/core';
import { QUESTION_LIST } from 'src/mocks/question.mock';
import { Question, QuestionType } from 'src/models/question.model';
import { SonService } from 'src/services/sound.service';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrl: './question-add.component.scss'
})
export class QuestionAddComponent {

  displayForm = false;

  displayFormUpdate = false;

  displayFormDelete = false;


  questions = QUESTION_LIST;


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
    id: '',
    label: '',
    typeOfQuestion: QuestionType.MultipleChoice,
    niveau: '',
    answers: [{ value: '', isCorrect: false }],
    hint: { text: '', imageUrl: '', audioUrl: '' }
  };

  addAnswer() {
    this.question.answers.push({ value: '', isCorrect: false });
  }

  submitForm() {
    this.displayForm = false;
    console.log(this.question);
    
  }

}
