import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MembreService } from 'src/services/membre.service';
import { Theme } from 'src/models/theme.model';
import { Quiz } from 'src/models/quiz.model'; 
import { ThemeService } from 'src/services/theme.service';
import { QuizService } from 'src/services/quiz.service'; 
import { NavbarService } from 'src/services/navbar.service';
import { QuestionService } from 'src/services/question.service';
import { Observable } from 'rxjs';
import { Membre } from 'src/models/membre.model';
import { Route } from '@playwright/test';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  memberId: number;
  welcomeMessage: string | undefined;
  themeList: Theme[] = [];
  quizList: Quiz[] = []; 
  membre!: Membre | null;

  isNavVisible = false;


  constructor(private route: ActivatedRoute, private membreService: MembreService, 
    private themeService: ThemeService, private quizService: QuizService, private navbarService: NavbarService,private questionService:QuestionService, private router: Router) {
   
      this.route.params.subscribe(params => {
        this.memberId = params['id'];
    
        this.membre = this.membreService.getMemberByIdSync(this.memberId)
        
       
      });
      this.themeList = this.themeService.getSelectedThemes()
      this.quizList = this.quizService.getQuizzes().slice(0, 4); 
      this.memberId=this.membreService.getMemberId();
      console.log("Membre ID" + this.memberId)
     
      this.membreService.membres$.subscribe(members => {
        if(members.length > 0){
          this.welcomeMessage = this.membreService.getWelcomeMessage(this.memberId)
        }
      })
              }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.memberId = parseInt(params['id']);
      this.membreService.membres$.subscribe(members => {
        if(members.length > 0){
          this.welcomeMessage = this.membreService.getWelcomeMessage(this.memberId)
        }
        
      })

      this.membreService.setMemberId(this.memberId);
      
     
    });
    this.themeList = this.themeService.getSelectedThemes()
    this.quizList = this.quizService.getQuizzes().slice(0, 4); 
    this.membre = this.membreService.getMemberByIdSync(this.memberId)
    
    this.memberId=this.membreService.getMemberId();
    console.log("Membre ID" + this.memberId)
   
   
   
    
  }


  themeSelected(selected: boolean): void {
    console.log('event received from child:', selected);
  }

  quizSelected(selected: Quiz): void {
    const quizQuestions = selected.questions;
    this.questionService.updateQuestionsForQuiz(quizQuestions);
  }
 

  
}
