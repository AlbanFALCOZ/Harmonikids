import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game.model';
import { Quiz } from 'src/models/quiz.model';
import { StatistiqueService } from 'src/services/statistique.service';

@Component({
  selector: 'app-stat-quiz',
  templateUrl: './stat-quiz.component.html',
  styleUrls: ['./stat-quiz.component.scss']
})
export class StatQuizComponent implements OnInit {

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
    if (correctFirstAttemptCount === 0) {
      return 0;
    }

    const percentage = (correctFirstAttemptCount / totalQuestions) * 100;
    return Math.round(percentage);
  }


}
