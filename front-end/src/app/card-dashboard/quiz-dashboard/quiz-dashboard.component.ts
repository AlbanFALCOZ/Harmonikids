import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';

@Component({
  selector: 'app-quiz-dashboard',
  templateUrl: './quiz-dashboard.component.html',
  styleUrl: './quiz-dashboard.component.scss'
})
export class QuizDashboardComponent {

  @Input()
    quiz!: Quiz

    @Output()
    quizSelected: EventEmitter<Quiz> = new EventEmitter<Quiz>();

    constructor() {

    }

    ngOnInit(): void {
    }

    selectQuiz(): void {
        this.quizSelected.emit(this.quiz);
    }



}
