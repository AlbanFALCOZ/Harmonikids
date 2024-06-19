import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Question, Answer } from 'src/models/question.model';

@Component({
  selector: 'app-multi-choice',
  templateUrl: './multi-choice.component.html',
  styleUrl: './multi-choice.component.scss'
})


export class MultiChoiceComponent implements OnInit {

  @Input()
  question!: Question;

  answers: Answer[] = [];

  @Input()
  answerAlreadySeleted?: Answer[];

  showMessage: boolean = false;
  message: string = '';

  selectedAnswer: Answer[] = [];

  @Output() answerSelected = new EventEmitter<Answer[]>();

  constructor() {

  }

  ngOnInit(): void {
    this.question.answers = this.shuffle(this.question.answers);
  }


  onSelectAnswer(answer: Answer): void {
    if (this.question && this.question.answers) {
      if (answer.alreadySelected) {
        return;
      }
      const correctAnswersCount = this.question.answers.filter(ans => ans.isCorrect).length;

      if (correctAnswersCount === 1) {
        this.question.answers.forEach(ans => {
          if (ans.value !== answer.value) {
            ans.isSelected = false;
          }
        });
        answer.isSelected = true;
      } else {
        answer.isSelected = !answer.isSelected;
      }
      this.selectedAnswer = this.question.answers.filter(a => a.isSelected);
      this.answerSelected.emit(this.selectedAnswer);
    }
  }

  shuffle(array: Answer[]): Answer[] {
    console.log("Shuffle ! ");
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

}
