import { Component } from '@angular/core';
import { SonService } from 'src/services/sound.service';
import { ColorService } from 'src/services/color-service.service';
import { Theme } from '../../models/theme.model';
import { TitleService } from 'src/services/title.service';
import { ThemeService } from 'src/services/theme.service';
import { Question, QuestionType } from 'src/models/question.model';
import { IndiceService } from 'src/services/indice.service';
import { QUESTION_LIST } from 'src/mocks/question.mock';
import {QuestionService} from 'src/services/question.service'
import { NavbarService } from 'src/services/navbar.service';
import { MembreService } from 'src/services/membre.service';
import { ActivatedRoute } from '@angular/router';



enum ThemePalette {
  BLUE = 'light',
  GREEN = 'dark',
  PINK = 'contrast'
}

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {

  

  themeList: Theme[] = [];
  showDropdown: boolean = false;
  isSoundOn: boolean ;
  isMusicOn: boolean ;
  isIndiceOn:boolean ;
  selectedOption: string = 'option1';
  selectedQuestionTypes: QuestionType[];
  questionList = this.questionService.getQuestionsFromLocalStorage();
  questionListTemp = QUESTION_LIST;
  isNavVisible = false;

  memberId: number = 0;
 


  constructor(private sonService: SonService, private colorService: ColorService, private themeService: ThemeService, private indiceService: IndiceService, private questionService: QuestionService, private navbarService: NavbarService,
    private membreService: MembreService, private route: ActivatedRoute
  ) {
    this.isSoundOn = this.sonService.estSonActif();
    this.isIndiceOn=this.indiceService.estIndiceActif();
    this.isMusicOn = this.sonService.isMusiqueActive();
    this.selectedQuestionTypes = this.questionListTemp.map(question => question.typeOfQuestion); 
    this.navbarService.isNavbarVisible$.subscribe(isVisible => {
      this.isNavVisible = isVisible;
    });
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
      
    });
  }
   


  ngOnInit() {
  
    this.isIndiceOn = this.indiceService.estIndiceActif()
    this.route.params.subscribe(params => {
      this.memberId = parseInt(params['id']);
      this.membreService.setMemberId(this.memberId);
    });
  }

  toggleSound() {
    this.sonService.toggleSon();
    this.isSoundOn = this.sonService.estSonActif();
  }

  toggleMusic() {
    this.sonService.toggleMusique();
    this.isMusicOn = this.sonService.isMusiqueActive();
    if (this.isMusicOn) {
      
      this.sonService.playMusic('/assets/img/music.mp3');
    } else {
      
      this.sonService.stopMusic();
    }
  }

  toggleIndice(){
    this.indiceService.toggleIndiceService();
    this.isIndiceOn = this.indiceService.estIndiceActif();
    if(this.isIndiceOn){
      this.indiceService.activerIndice();
    }else {
      this.indiceService.desactiverIndice();
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    
  }

  isDropdownOpen: boolean = false;


  colorOptions: { palette: ThemePalette, colors: string[] }[] = [
    { palette: ThemePalette.BLUE, colors: ['#59D5E0', '#FAA300'] },
    { palette: ThemePalette.GREEN, colors: ['#C1F2B0', '#FFB534'] },
    { palette: ThemePalette.PINK, colors: ['#F4538A', '#1E1E1E'] }
  ]; 

  

  selectColor(color: string) {
    this.colorService.selectedColor = color; 
    this.isDropdownOpen = false; 
  }

 

  isCheckedThemes(themeId: number): boolean {
    return this.themeService.selectedThemes.includes(this.themeService.getThemeById(themeId));
  }
  
  onChange(event: any, themeId: number) {
    const isChecked = event.target.checked;
  
    if (isChecked) {
      if (this.themeService.selectedThemes.length < 4 && !this.themeService.selectedThemes.includes(this.themeService.getThemeById(themeId))) {
        this.themeService.selectedThemes.push(this.themeService.getThemeById(themeId));
      } else {
        event.target.checked = false; 
      }
    } else {
      const themeIndex = this.themeService.selectedThemes.findIndex(selectedThemeId => selectedThemeId === this.themeService.getThemeById(themeId));
      if (themeIndex !== -1) {
        this.themeService.selectedThemes.splice(themeIndex, 1);
      }
    }
    localStorage.setItem('selectedThemes', JSON.stringify(this.themeService.selectedThemes));
  }


  

  isCheckedQuestions(type: QuestionType): boolean {
    return this.questionService.selectedQuestionTypes.includes(type);
}



onChangeQuestion(event: any, questionType: QuestionType): void {
  const isChecked = event.target.checked;

  if (isChecked) {
     
      this.questionService.removeQuestionFromLocalStorage(questionType);
      this.questionService.selectedQuestionTypes.push(questionType);
  } else {
    this.questionService.addToLocalStorageByType(questionType);
    this.questionService.selectedQuestionTypes = this.questionService.selectedQuestionTypes.filter(type => type !== questionType);



  }

  localStorage.setItem('selectedQuestionTypes', JSON.stringify(this.questionService.selectedQuestionTypes));

}


  
  
}
