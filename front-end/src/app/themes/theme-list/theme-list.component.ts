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
          name: 'Thème 1',
          description: 'Description du thème 1',
          numberOfQuizzes: 5,
          quizzes: []
        },
        {
          id: '2',
          name: 'Thème 2',
          description: 'Description du thème 2',
          numberOfQuizzes: 5,
          quizzes: []
        },
        {
          id: '3',
          name: 'Thème 3',
          description: 'Description du thème 3',
          numberOfQuizzes: 15,
          quizzes: []
        },
        {
          id: '4',
          name: 'Thème 4',
          description: 'Description du thème 4',
          numberOfQuizzes: 5,
          quizzes: []
        }
      ];
  }

  ngOnInit(): void {
  }
}
