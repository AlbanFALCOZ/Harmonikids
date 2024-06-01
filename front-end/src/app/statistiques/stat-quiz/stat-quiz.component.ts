import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { StatistiqueService } from 'src/services/statistique.service';

@Component({
  selector: 'app-stat-quiz',
  templateUrl: './stat-quiz.component.html',
  styleUrls: ['./stat-quiz.component.scss']
})
export class StatQuizComponent implements OnInit {

  @Input() quiz!: Quiz;
  correctFirstAttemptCount: number = 0;

  constructor(private statistiqueService: StatistiqueService) { }

  ngOnInit(): void {
    const quizId = this.quiz.id;

    this.statistiqueService.getCorrectFirstAttemptCount(quizId).subscribe(count => {
      this.correctFirstAttemptCount = count;
    });
  }

  calculatePercentage(correctFirstAttemptCount: number, totalQuestions: number): number {
    if (correctFirstAttemptCount === 0) {
      return 0;
    }

    const percentage = (correctFirstAttemptCount / totalQuestions) * 100;
    return Math.round(percentage);
  }


}
