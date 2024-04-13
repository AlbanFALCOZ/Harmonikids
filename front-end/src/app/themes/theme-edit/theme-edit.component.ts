import { Component } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrl: './theme-edit.component.scss'
})
export class ThemeEditComponent {
  
  quizList: Quiz[] = [];

  constructor(private quizService: QuizService) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit(): void {
  }

  closeModalUpdate() {
    var modal = document.getElementById("myModalUpdate");
    if (modal) {
      modal.style.display = "none";
    }
  }
}
