import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from 'src/services/score-service-component';
import { CommonModule } from '@angular/common'; 
import { Answer } from 'src/models/question.model';


@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrl: './end-game.component.scss'
})


export class EndGameComponent implements OnInit {
  correctAnswersCount: number = 0;
  totalScore: number = 0;
  personalizedMessage: string = '';

  correctAnswers: Answer[] = [];
  allSelectedAnswers: Answer[] = [];

  constructor(private router: Router, private scoreService: ScoreService) {}

  ngOnInit(): void {
    this.correctAnswers = this.scoreService.getCorrectAnswers();
    this.allSelectedAnswers = this.scoreService.getAllSelectedAnswers();
    this.updatePersonalizedMessage();
  }
  
  restartGame() {
    this.router.navigate(['/']);
  }

  generateArray(num: number): any[] {
    return new Array(num);
  }

  updatePersonalizedMessage() {
  if(this.correctAnswers.length <= 1) {
    this.personalizedMessage = "Bien essayé, continue comme ça !";
  } else if(this.correctAnswers.length <= 2) {
    this.personalizedMessage = "Super, tu progresses bien !";
  } else {
    this.personalizedMessage = "Incroyable, t'es un champion !";
  }
}
  
}
