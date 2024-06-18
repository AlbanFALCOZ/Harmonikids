import { Component, OnInit } from '@angular/core';
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
  isDisabled = false;
  isUserMenuVisible = false;
  showPasswordPrompt = false;
  password = '';

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
