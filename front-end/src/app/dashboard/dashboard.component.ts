import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembreService } from 'src/services/membre.service';
import { Theme } from 'src/models/theme.model';
import { Quiz } from 'src/models/quiz.model'; 
import { ThemeService } from 'src/services/theme.service';
import { QuizService } from 'src/services/quiz.service'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  memberId: string='';
  welcomeMessage: string='';
  themeList: Theme[] = [];
  quizList: Quiz[] = []; 

  constructor(private route: ActivatedRoute, private membreService: MembreService, 
              private themeService: ThemeService, private quizService: QuizService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.memberId = params['id'];
      this.welcomeMessage = this.membreService.getWelcomeMessage(this.memberId);
    });
    this.themeList = this.themeService.getThemes().slice(0, 4); 
    this.quizList = this.quizService.getQuizzes().slice(0, 4); 
  }

  themeSelected(selected: boolean): void {
    console.log('event received from child:', selected);
  }

  quizSelected(selected: boolean): void {
    console.log('event received from child:', selected);
  }

  
}
