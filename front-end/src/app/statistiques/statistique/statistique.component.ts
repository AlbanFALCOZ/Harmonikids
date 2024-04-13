import { Component } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { Theme } from 'src/models/theme.model';
import { QuizService } from 'src/services/quiz.service';
import { ThemeService } from 'src/services/theme.service';
import { TitleService } from 'src/services/title.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrl: './statistique.component.scss'
})
export class StatistiqueComponent {

  public themeList: Theme[] = [];
  public quizList: Quiz[] = [];
  displayedThemes: Theme[] = [];
  displayedQuiz: Quiz[] = [];
  toggleButtonText: string = 'Voir plus';
  toggleButtonTextQuiz: string = 'Voir plus';

  constructor(public themeService: ThemeService, public quizService: QuizService,) {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });

    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }


  showAllThemes: boolean = false;
  showAllQuiz: boolean = false;

  ngOnInit() {
    this.displayedThemes = this.themeList.slice(0, 4);
    this.displayedQuiz = this.quizList.slice(0, 4);
  }

  toggleDisplayTheme() {
    this.showAllThemes = !this.showAllThemes;
    if (this.showAllThemes) {
      this.displayedThemes = this.themeList;
      this.toggleButtonText = 'Voir moins';
    } else {
      this.displayedThemes = this.themeList.slice(0, 4);
      this.toggleButtonText = 'Voir plus';
    }
  }

  toggleDisplayQuiz() {
    this.showAllQuiz = !this.showAllQuiz;
    if (this.showAllQuiz) {
      this.displayedQuiz = this.quizList;
      this.toggleButtonTextQuiz = 'Voir moins';
    } else {
      this.displayedQuiz = this.quizList.slice(0, 4);
      this.toggleButtonTextQuiz = 'Voir plus';
    }
  }

  isEditingDescription: boolean = false;
  isDescriptionExpanded: boolean = false;
  description: string = "Alice tire parti de l'application de quiz pour élargir ses connaissances. Les quiz sur mesure adaptés à son haut QI lui permettent d'approfondir ses compétences en mathématiques et en logique. Avec une accessibilité adaptée à son daltonisme, Alice s'immerge pleinement dans son apprentissage tout en recevant des encouragements et des outils pour développer ses compétences sociales et émotionnelles";
  editedDescription: string = "";

  toggleEditModeDescription() {
    this.isEditingDescription = !this.isEditingDescription;
    if (this.isEditingDescription) {
      this.editedDescription = this.description;
    }
  }

  saveChangesDescription() {
    this.description = this.editedDescription;
    this.isEditingDescription = false;
  }

  cancelEditDescription() {
    this.isEditingDescription = false;
  }

  toggleShowMore() {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }

  isEditing: boolean = false;
  isInterestExpanded: boolean = false;
  interests: string = "Musique, Astronomie, Animaux, Lecture";
  editedInterest: string = "";

  toggleEditMode() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.editedInterest = this.interests;
    }
  }

  saveChanges() {
    this.interests = this.editedInterest;
    this.isEditing = false;
  }


  cancelEdit() {
    this.isEditing = false;
  }

  toggleShowMoreInterests() {
    this.isInterestExpanded = !this.isInterestExpanded;
  }


}
