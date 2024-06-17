import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/services/color-service.service';
import { IndiceService } from 'src/services/indice.service';
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
 

  isDisabled = false;

  isUserMenuVisible = false;
  showPasswordPrompt = false;
  password = '';

  constructor(public colorService: ColorService, public membreService: MembreService, private navbarService: NavbarService, private modeService: ModeService, private questionService : QuestionService , private sonService : SonService) { 
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


  toggleUserMenu(): void {
    this.isUserMenuVisible = !this.isUserMenuVisible;
  }

  toggleMode() {
    this.modeService.toggleMode();
  }

  
  promptPassword() {
    console.log('Prompting password');  // Ajoutez cette ligne pour vérifier si la méthode est appelée
    this.showPasswordPrompt = true;
    console.log(this.showPasswordPrompt);  // Ajoutez cette ligne pour vérifier la mise à jour de la variable
  }

  submitPassword() {
    if (this.password === 'votreMotDePasseErgo') {
      this.modeService.toggleMode();
      this.showPasswordPrompt = false;
      this.password = '';
    } else {
      alert('Mot de passe incorrect');
    }
  }
}