import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembreService } from 'src/services/membre.service';
import { Theme } from 'src/models/theme.model';
import { Quiz } from 'src/models/quiz.model'; 
import { ThemeService } from 'src/services/theme.service';
import { QuizService } from 'src/services/quiz.service'; 
import { NavbarService } from 'src/services/navbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  memberId: string | undefined;
  welcomeMessage: string='';
  themeList: Theme[] = [];
  quizList: Quiz[] = []; 

  isNavVisible = false;


  constructor(private route: ActivatedRoute, private membreService: MembreService, 
    private themeService: ThemeService, private quizService: QuizService, private navbarService: NavbarService) {
    this.navbarService.isNavbarVisible$.subscribe(isVisible => {
      this.isNavVisible = isVisible;
    });
              }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.memberId = params['id'];
      this.membreService.setMemberId(this.memberId);
     
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

  themeSelected(selected: boolean): void {
    console.log('event received from child:', selected);
  }

  quizSelected(selected: Quiz): void {
    console.log('event received from child:', selected);
  }

  
 

  
}
