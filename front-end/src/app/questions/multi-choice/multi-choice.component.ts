import { Component, Input , Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { Question, Answer , QuestionType} from 'src/models/question.model';

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
      this.message = 'Tu es sûr? Tu peux toujours changer de avis.';
      this.multi?.answers.forEach( (item, index) => {
        if(item === selectedAnswer) {
          if (this.multi && this.multi.answers) {
            if (this.multi.answers.length > 2) {
              const answer = document.getElementById("answer" + index);
              answer?.classList.add("wrong-anwser");
            }
          }
          
        }
      });
    }

    
    setTimeout(() => {
      this.showMessage = false;
    }, 4000);
  }
}
