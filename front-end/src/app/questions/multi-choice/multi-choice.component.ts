import { Component, Input, OnInit,  Output, EventEmitter } from '@angular/core';
import { Question, Answer } from 'src/models/question.model';

@Component({
  selector: 'app-multi-choice',
  templateUrl: './multi-choice.component.html',
  styleUrl: './multi-choice.component.scss'
})


export class MultiChoiceComponent implements OnInit {

  @Input()
  multi?: Question;
  selectedAnswer: Answer[] = [];

  @Output() answerSelected = new EventEmitter<Answer[]>();

  constructor() {

  }

  ngOnInit(): void {
  }

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