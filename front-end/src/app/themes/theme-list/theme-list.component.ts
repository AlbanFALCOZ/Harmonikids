import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from '../../../models/theme.model';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrl: './theme-list.component.scss'
})
export class ThemeListComponent implements OnInit{

  public themeList: Theme[] = [];

  constructor(private router: Router) {
    this.themeList = [
        {
          id: '1',
          name: 'Quiz 1',
          description: 'Description du quiz 1',
          numberOfQuizzes: 5,
          quizzes: []
        },
        {
          id: '2',
          name: 'Quiz 2',
          description: 'Description du quiz 2',
          numberOfQuizzes: 5,
          quizzes: []
        },
        {
          id: '3',
          name: 'Quiz 3',
          description: 'Description du quiz 3',
          numberOfQuizzes: 15,
          quizzes: []
        },
        {
          id: '4',
          name: 'Quiz 4',
          description: 'Description du quiz 4',
          numberOfQuizzes: 5,
          quizzes: []
        }
      ];
  }

  ngOnInit(): void {
  }
}
