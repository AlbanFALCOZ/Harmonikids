import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Game } from 'src/models/game.model';
import { Quiz } from 'src/models/quiz.model';

@Component({
  selector: 'app-stat-quiz',
  templateUrl: './stat-quiz.component.html',
  styleUrls: ['./stat-quiz.component.scss']
})
export class StatQuizComponent implements OnInit, OnChanges {

  @Input() quiz!: Quiz;
  @Input() game?: Game | undefined;
  correctFirstAttemptCount: number = 0;

  constructor() { }

  ngOnInit(): void {
    if (this.game) {
      this.correctFirstAttemptCount = this.game.correctFirstAttemptCount;
    }
  }

  ngOnChanges(): void {
    if (this.game) {
      this.correctFirstAttemptCount = this.game.correctFirstAttemptCount;
    }
  }

  calculatePercentage(correctFirstAttemptCount: number, totalQuestions: number): number {
    if (totalQuestions === 0) {
      return 0;
    }

    const percentage = (correctFirstAttemptCount / totalQuestions) * 100;
    return Math.min(Math.round(percentage), 100);
  }
}
