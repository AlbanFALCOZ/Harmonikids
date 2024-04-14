import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from 'src/services/score-service.service';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-end-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './end-game.component.html',
  styleUrl: './end-game.component.scss'
})


export class EndGameComponent implements OnInit {
  correctAnswersCount: number = 0;
  totalScore: number = 0;
  personalizedMessage: string = '';
  selectedAnswerCount: number = 0;

  constructor(private router: Router, private scoreService: ScoreService) {}

  ngOnInit(): void {
    this.scoreService.numberOfCorrectAnswers$.subscribe((count: number) => {
        this.correctAnswersCount = count;
        this.updatePersonalizedMessage();

      }
    );
    this.scoreService.numberOfSelectedAnswers$.subscribe((count: number) => {
      this.selectedAnswerCount = count;
    });
    console.log(this.correctAnswersCount);
  }

  restartGame() {
    this.router.navigate(['/']);
  }

  generateArray(num: number): any[] {
    return new Array(num);
  }

  updatePersonalizedMessage() {
    if(this.selectedAnswerCount <= 1) {
      this.personalizedMessage = "Bien essayé, continue comme ça !";
    } else if(this.selectedAnswerCount <= 2) {
      this.personalizedMessage = "Super, tu progresses bien !";
    } else {
      this.personalizedMessage = "Incroyable, t'es un champion !";
    }
  }

}