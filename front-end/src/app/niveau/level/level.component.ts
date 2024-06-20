import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/models/question.model';
import { FilteredQuestionService } from 'src/services/filteredQuestions.service';
import { NavbarService } from 'src/services/navbar.service';
import { QuestionService } from 'src/services/question.service';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss'
})
export class LevelComponent implements OnInit {
  
  public questionList: Question[] = [];
  quizId!: number;
  quizQuestions: Question[] = [];
  filteredQuestions: Question[] = [];

  isNavVisible = false;


  constructor(private route: ActivatedRoute, public questionService: QuestionService, private navbarService: NavbarService, private quizService: QuizService) {
    this.navbarService.isNavbarVisible$.subscribe(isVisible => {
      this.isNavVisible = isVisible;
    });

  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizId = +params['id'];
      this.getQuestions();
      this.questionService.setCurrentQuizId(this.quizId);
    });
    this.quizService.setSelectedQuizId(this.quizId);

  }

  getQuestions(): void {
    if (this.quizId !== undefined) {
      this.questionService.fetchQuestions(this.quizId).subscribe((questions) => {
        this.questionList = questions; 
      });
    }
  }


}
