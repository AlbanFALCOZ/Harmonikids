import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/models/game.model';
import { Membre } from 'src/models/membre.model';
import { Quiz } from 'src/models/quiz.model';
import { Theme } from 'src/models/theme.model';
import { GameService } from 'src/services/game.service';
import { MembreService } from 'src/services/membre.service';
import { NavbarService } from 'src/services/navbar.service';
import { QuizService } from 'src/services/quiz.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {

  public themeList: Theme[] = [];
  public quizList: Quiz[] = [];
  displayedThemes: Theme[] = [];
  displayedQuiz: Quiz[] = [];
  toggleButtonText: string = 'Voir plus';
  toggleButtonTextQuiz: string = 'Voir plus';
  isNavVisible = false;
  games: Game[] = [];
  gameMap: { [quizId: number]: Game | undefined } = {};
  showAllThemes: boolean = false;
  showAllQuiz: boolean = false;
  numberOfQuizzes: number = 0;
  numberOfQuizzesFinished: number = 0;
  memberId: number = 0;
  membre!: Membre;
  score: number = 0;
  game!: Game;

  constructor(
    private router: Router,
    private gameService: GameService,
    public themeService: ThemeService,
    public quizService: QuizService,
    private navbarService: NavbarService,
    private membreService: MembreService,
    private route: ActivatedRoute
  ) {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });

    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });

    this.navbarService.isNavbarVisible$.subscribe(isVisible => {
      this.isNavVisible = isVisible;
    });

    this.route.params.subscribe(params => {
      this.memberId = parseInt(params['id']);
      this.membreService.setMemberId(this.memberId);

    });


  }

  ngOnInit() {
    this.displayedThemes = this.themeList.slice(0, 4);
    this.displayedQuiz = this.quizList.slice(0, 4);

    this.memberId = this.membreService.getMemberId();
    this.gameService.getGamesByChildId(this.memberId).then(games => {

      console.log(this.games);

      const bestGameMap = new Map<number, any>();

      console.log("bestGameMap:", bestGameMap);

      games.forEach(game => {
        const key = game.quizId;
        if (!bestGameMap.has(key) || game.correctFirstAttemptCount > bestGameMap.get(key).correctFirstAttemptCount) {
          bestGameMap.set(key, game);
        }
      });

      this.games = Array.from(bestGameMap.values());

      this.games.forEach(game => {
        this.gameMap[game.quizId] = game;

      });

      this.score = Math.max(...this.games.map(game => game.score));
    });

    this.membreService.membres$.subscribe(membre => {
      this.membre = membre.find(m => m.id == this.memberId)!;
    });
  }


  ngOnChanges() {
    this.displayedThemes = this.themeList.slice(0, 4);
    this.displayedQuiz = this.quizList.slice(0, 4);

    this.memberId = this.membreService.getMemberId();
    this.gameService.getGamesByChildId(this.memberId).then(games => {

      console.log(this.games);

      const bestGameMap = new Map<number, any>();

      console.log("bestGameMap:", bestGameMap);

      games.forEach(game => {
        const key = game.quizId;
        if (!bestGameMap.has(key) || game.correctFirstAttemptCount > bestGameMap.get(key).correctFirstAttemptCount) {
          bestGameMap.set(key, game);
        }
      });

      this.games = Array.from(bestGameMap.values());

      this.games.forEach(game => {
        this.gameMap[game.quizId] = game;

      });

      this.score = Math.max(...this.games.map(game => game.score));
    });


    this.membreService.membres$.subscribe(membre => {
      this.membre = membre.find(m => m.id == this.memberId)!;
    });
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