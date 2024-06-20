import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import { TitleService } from '../../../services/title.service';
import { QuestionService } from 'src/services/question.service';
import { NavbarService } from 'src/services/navbar.service';
import { ModeService } from 'src/services/mode-ergo.service';
import { Theme } from 'src/models/theme.model';
import { ThemeService } from 'src/services/theme.service';


@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  quizList: Quiz[] = [];
  quizListDisplayed: Quiz[] = [];
  quizListSortedName: Quiz[] = [];
  quizListSortedTheme: Quiz[] = [];
  quizToDelete: Quiz | null = null;
  quizToEdit: Quiz | null = null;
  isDisabled: boolean = false;

  isNavVisible = false;
  search: string = '';

  public selectedQuiz: Quiz | null = null;

  themeList: Theme[] = [];

  constructor(private router: Router, public quizService: QuizService, public titleService: TitleService, public questionService: QuestionService, private navbarService: NavbarService, private modeService: ModeService, private themeService: ThemeService, public route: ActivatedRoute) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
      this.quizListDisplayed = quizzes;
      this.quizListSortedName = quizzes;
      this.quizListSortedTheme = quizzes;
    });
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });
    this.titleService.title = 'Liste des quiz';
    this.titleService.search = 'Rechercher dans les quiz...';

    this.navbarService.isNavbarVisible$.subscribe(isVisible => {
      this.isNavVisible = isVisible;
    });

    this.modeService.isDisabled$.subscribe(isDisabled => {
      this.isDisabled = isDisabled;
    });

  }

  ngOnInit(): void {
    const themeSelect: HTMLSelectElement = document.getElementById("quizTheme") as HTMLSelectElement;
    this.route.queryParams.subscribe(params => {
      const selectedTheme = params['theme'];
      if (selectedTheme) {
        setTimeout(() => { 
          themeSelect.value = selectedTheme;
          this.quizListSortedTheme = this.quizList.filter(quiz => quiz.theme == selectedTheme);
          this.updateQuizListDisplayed();
        }, 0);
      }
    });
    themeSelect.addEventListener('change', (event) => {
      const themeSelected = (event.target as HTMLSelectElement).value;
      if (themeSelected != "none") {
        this.quizListSortedTheme = this.quizList.filter(quiz => quiz.theme == themeSelected);
      }
      else {
        this.quizListSortedTheme = this.quizList;
      }

      this.updateQuizListDisplayed();
    });
  }

  quizSelected(quiz: Quiz): void {
    const quizQuestions = quiz.questions;
    this.questionService.updateQuestionsForQuiz(quizQuestions);
  }
  
  editQuiz(quiz: Quiz): void {
    this.quizToEdit = quiz;
  }


  deleteQuiz(): void {
    if (this.quizToDelete) {
      this.quizService.deleteQuiz(this.quizToDelete);
    }

  }

  addQuizToDelete(quiz: Quiz): void {
    this.quizToDelete = quiz;
  }


  onKey(event: any) {
    this.quizListSortedName = this.quizList.filter(quiz => quiz.name.toLowerCase().includes(event.target.value.toLowerCase()));
    this.updateQuizListDisplayed();
  }

  updateQuizListDisplayed() {
    this.quizListDisplayed = this.quizList.filter(quiz => 
      this.quizListSortedName.some(sortedQuiz => sortedQuiz.id === quiz.id) &&
      this.quizListSortedTheme.some(sortedQuiz => sortedQuiz.id === quiz.id)
    );
  }

}
