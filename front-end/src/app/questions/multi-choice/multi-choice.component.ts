import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/models/question.model';

@Component({
  selector: 'app-multi-choice',
  templateUrl: './multi-choice.component.html',
  styleUrl: './multi-choice.component.scss'
})


export class MultiChoiceComponent implements OnInit {

  @Input() question!: Question;

  ngOnInit(): void {
    console.log(this.question);
  }

}
