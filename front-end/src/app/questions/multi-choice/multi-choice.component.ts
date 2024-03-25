import { Component, Input } from '@angular/core';
import { Question, Answer } from 'src/models/question.model';

@Component({
  selector: 'app-multi-choice',
  templateUrl: './multi-choice.component.html',
  styleUrls: ['./multi-choice.component.scss']
})
export class MultiChoiceComponent {

  @Input() multi?: Question;

  showMessage: boolean = false;
  message: string = '';

  checkAnswer(selectedAnswer: Answer) {
    const correctAnswer = this.multi?.answers.find((answer: { isCorrect: any; }) => answer.isCorrect);

    if (selectedAnswer.isCorrect) {
      this.showMessage = true;
      this.message = 'Bravo, mais tu es super fort et tu viens de gagner 15 étoiles!!!';
    } else {
      this.showMessage = true;
      this.message = 'Tu es sûr? Tu peux toujours changer de avis.';
    }

    
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }
}
