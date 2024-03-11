import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];

  constructor(private router: Router) {
    this.quizList = [
        {
          id: '1',
          name: 'Quiz 1',
          description: 'Description du quiz 1',
          theme: 'Theme 1',
          questions: []
        },
        {
          id: '2',
          name: 'Quiz 2',
          description: 'Description du quiz 2',
          theme: 'Theme 2',
          questions: []
        },
        {
          id: '3',
          name: 'Quiz 3',
          description: 'Description du quiz 3',
          theme: 'Theme 3',
          questions: []
        },
        {
            id: '4',
            name: 'Quiz 4',
            description: 'Description du quiz 4',
            theme: 'Theme 4',
            questions: []
          }
      ];
  }

  ngOnInit(): void {
  }

  quizSelected(selected: boolean): void {
    console.log('event received from child:', selected);
  }

  editQuiz(quiz: Quiz): void {
    this.router.navigate(['/edit-quiz/' + quiz.name]);
  }

  deleteQuiz(quiz : Quiz): void{

  }
}
