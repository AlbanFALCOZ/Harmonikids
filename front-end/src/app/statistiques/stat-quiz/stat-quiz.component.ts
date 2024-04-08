import { Component, Input } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';

@Component({
  selector: 'app-stat-quiz',
  templateUrl: './stat-quiz.component.html',
  styleUrl: './stat-quiz.component.scss'
})
export class StatQuizComponent {
  
  @Input()
  quiz!: Quiz;
}
