import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrl: './quiz-edit.component.scss'
})
export class QuizEditComponent implements OnInit {

  public quiz!: Quiz;

  @Output() editQuizEvent = new EventEmitter<void>();

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.quizService.setSelectedQuiz(id);
    }
  }

  editQuiz(quiz: Quiz): void {
    this.editQuizEvent.emit();

    this.closeModalUpdate();
  }

  

  closeModalUpdate() {
    var modal = document.getElementById("myModalUpdate");
    if (modal) {
      modal.style.display = "none";
    }
  }
}
