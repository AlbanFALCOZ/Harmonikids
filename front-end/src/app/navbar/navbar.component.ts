import { Component, Input, OnInit } from '@angular/core';
import { unescape } from 'querystring';
import { Membre } from 'src/models/membre.model';
import { ColorService } from 'src/services/color-service.service';
import { MembreService } from 'src/services/membre.service';
import { ModeService } from 'src/services/mode-ergo.service';
import { NavbarService } from 'src/services/navbar.service';
import { QuestionService } from 'src/services/question.service';
import { SonService } from 'src/services/sound.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent implements OnInit {



  
  memberId: number | undefined;
  isNavVisible = false;
  showPasswordPrompt = false;
  memberImage:string|undefined;
  password = '';
  membre : Membre |undefined
  isUserMenuVisible: boolean = false;
  isDisabled: boolean = false;

  constructor(
    public colorService: ColorService, 
    public membreService: MembreService, 
    private navbarService: NavbarService, 
    private modeService: ModeService, 
    private questionService: QuestionService, 
    private sonService: SonService
  ) {
    this.navbarService.isNavbarVisible$.subscribe(isVisible => {
      this.isNavVisible = isVisible;
    });

    this.modeService.isDisabled$.subscribe(isDisabled => {
      this.isDisabled = isDisabled;
    });
    console.log("isDisabled", this.isDisabled);
   
    
  }

  ngOnInit(): void {
    this.memberId = this.membreService.getMemberId();
    this.membreService.membres$.subscribe(membre => {
      this.membre = membre.find(m => m.id == this.memberId)!;
    });
  }

  resetMemberImage() {
    this.membreService.setMemberId(0);
  }


  toggleNav() {
    this.navbarService.toggleNavbarVisibility();
  }

  onNavbarClicked(): void {
    this.toggleNav();
  }

  getQuestions() {
    return this.questionService.getQuestionsFromLocalStorage();
  }

  toggleUserMenu(): void {
    this.isUserMenuVisible = !this.isUserMenuVisible;
  }

  toggleMode() {
    if (!this.isDisabled) {
      this.modeService.toggleMode();
    } else {
      this.promptPassword();
    }
  }

  promptPassword() {
    this.showPasswordPrompt = true;
  }

  submitPassword() {
    if (this.password === 'admin') {
      this.modeService.toggleMode();
      this.showPasswordPrompt = false;
      this.password = '';
    } else {
      alert('Mot de passe incorrect');
    }
  }
}
