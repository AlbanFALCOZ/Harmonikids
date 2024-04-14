import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/services/color-service.service';
import { IndiceService } from 'src/services/indice.service';
import { MembreService } from 'src/services/membre.service';
import { ModeService } from 'src/services/mode-ergo.service';
import { NavbarService } from 'src/services/navbar.service';
import { QuestionService } from 'src/services/question.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  memberId: string | undefined;
  
  isNavVisible = false;
 

  isDisabled = false;

  constructor(public colorService: ColorService, public membreService: MembreService, private navbarService: NavbarService, private modeService: ModeService, private questionService : QuestionService) { 
    this.navbarService.isNavbarVisible$.subscribe(isVisible => {
      this.isNavVisible = isVisible;
    });

    this.modeService.isDisabled$.subscribe(isDisabled => {
      this.isDisabled = isDisabled;
    });

    
  }

  ngOnInit(): void {
    this.memberId = this.membreService.getMemberId();
  }

  toggleNav() {
    this.navbarService.toggleNavbarVisibility();
  }

  onNavbarClicked(): void {
    this.toggleNav();
  }



  getQuestions(){
    return this.questionService.getQuestionsFromLocalStorage();
  }


}