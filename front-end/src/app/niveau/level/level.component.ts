import { Component, OnInit, Output } from '@angular/core';
import { Question } from 'src/models/question.model';
import { FilteredQuestionService } from 'src/services/filteredQuestions.service';
import { QuestionService } from 'src/services/question.service';
import { TitleService } from 'src/services/title.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss'
})
export class LevelComponent implements OnInit {
  
  public questionList: Question[] = [];

  constructor(private questionService: QuestionService, private filteredQuestionService: FilteredQuestionService) {
    this.questionService.questions$.subscribe((sortedQuestions: Question[]) => {
      this.questionList = sortedQuestions;
    });
  }

  ngOnInit(): void {
    console.log(this.questionList);    
  }

  filterQuestionsByLevel(level: string): void {
    const filteredQuestions = this.questionList.filter(question => question.niveau === level);
    this.filteredQuestionService.updateFilteredQuestions(filteredQuestions);
    console.log(filteredQuestions);
  }
  
}