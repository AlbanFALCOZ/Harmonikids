
import { Component, Input, OnInit,  Output, EventEmitter } from '@angular/core';
import { Question, Answer } from 'src/models/question.model';
import { ScoreService } from '../question-list/score-service-component';

@Component({
  selector: 'app-multi-choice',
  templateUrl: './multi-choice.component.html',
  styleUrls: ['./multi-choice.component.scss']
})
export class MultiChoiceComponent {

  constructor(private scoreService: ScoreService) {}

  showMessage: boolean = false;
  message: string = '';
  anwsersChosen: Answer[] = new Array();
  @Input()
  multi?: Question;
  selectedAnswer: Answer[] = [];

  @Output() answerSelected = new EventEmitter<Answer[]>();


  checkAnswer(selectedAnswer: Answer) {
    if (selectedAnswer.isCorrect) {
      if (!this.anwsersChosen.includes(selectedAnswer)) {
        this.showMessage = true;
        this.message = 'Bravo, mais tu es super fort et tu viens de gagner 15 étoiles!!!';
        this.anwsersChosen.push(selectedAnswer);
        this.scoreService.answerCorrect();
        this.multi?.answers.forEach((item, index) => {
          if (item === selectedAnswer) {
            if (this.multi && this.multi.answers) {
              const answer = document.getElementById("answer" + index);
              answer?.classList.add("right-answer");
            }
          }
        });
      }
    } else {
      if (!this.anwsersChosen.includes(selectedAnswer))
        {
          this.anwsersChosen.push(selectedAnswer);
          this.scoreService.answerWrong();
        }
      
      this.multi?.answers.forEach((item, index) => {
        if (item === selectedAnswer) {
          if (this.multi && this.multi.answers) {
            if (this.multi.answers.length > 2) {
              const answer = document.getElementById("answer" + index);
              answer?.classList.add("wrong-anwser");
            }
            else if (this.multi.answers.length == 2) {
              this.message = 'Tu es sûr? Tu peux toujours changer de avis.';
              this.showMessage = true;
            }
          }

        }
      });
    }


    setTimeout(() => {
      this.showMessage = false;
    }, 4000);
    
    
  onSelectAnswer(answer: Answer): void {
   if (this.multi && this.multi.answers) {
    const correctAnswersCount = this.multi.answers.filter(ans => ans.isCorrect).length;

    if (correctAnswersCount === 1) {
      this.multi.answers.forEach(ans => {
        if (ans.value !== answer.value) {
          ans.isSelected = false; 
        }
      });
      answer.isSelected = true;
    } else {
      answer.isSelected = !answer.isSelected;
    }
    this.answerSelected.emit(this.multi.answers.filter(a => a.isSelected));
    }
  }
}
