import { Component, OnInit, Output } from '@angular/core';
import { Question } from 'src/models/question.model';
import { FilteredQuestionService } from 'src/services/filteredQuestions.service';
import { NavbarService } from 'src/services/navbar.service';
import { QuestionService } from 'src/services/question.service';
import { TitleService } from 'src/services/title.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss'
})
export class LevelComponent implements OnInit {
  
  public questionList: Question[] = [];

  isNavVisible = false;


  constructor(private questionService: QuestionService, private filteredQuestionService: FilteredQuestionService, private navbarService: NavbarService) {
    this.questionService.questions$.subscribe((sortedQuestions: Question[]) => {
      this.questionList = sortedQuestions;
    });
    this.navbarService.isNavbarVisible$.subscribe(isVisible => {
      this.isNavVisible = isVisible;
    });

  }

  ngOnInit(): void {
    console.log(this.questionList);    
  }

  filterQuestionsByLevel(level: string): void {
    const filteredQuestions = this.questionService.getQuestionsFromLocalStorage().filter(question => question.niveau === level);
    this.filteredQuestionService.updateFilteredQuestions(filteredQuestions);

    console.log(filteredQuestions);
  }
  
}