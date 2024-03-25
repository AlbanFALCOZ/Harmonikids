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
  selectedAnswer?: Answer;

  @Output() answerSelected = new EventEmitter<Answer>();

  constructor() {

  }

  ngOnInit(): void {
  }

  onSelectAnswer(answer: Answer): void {
    this.selectedAnswer = answer;
    this.answerSelected.emit(this.selectedAnswer);
  }
}
