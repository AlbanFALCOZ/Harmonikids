// quiz-edit.component.ts
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { Theme } from 'src/models/theme.model';
import { QuizService } from 'src/services/quiz.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.scss']
})
export class QuizEditComponent implements OnInit {

  @Input()
  public quiz!: Quiz | null; // Make the quiz an input property

  themeList: Theme[] = [];

  @Output() editQuizEvent = new EventEmitter<void>();

  constructor(private route: ActivatedRoute, private quizService: QuizService, private themeService: ThemeService) {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });
  }

  ngOnInit(): void {
    // This is no longer needed as the quiz is passed via @Input
  }

  editQuizForm(form: NgForm): void {
    const quizId = form.value.quizIdEdit;
    const quizTitle = form.value.quizTitleEdit;
    const quizTheme = form.value.quizThemeEdit;
    const quizDescription = form.value.quizDescriptionEdit;
    const quizImage = form.value.quizImageEdit;

    const updatedQuiz: Quiz = {
      id: quizId,
      name: quizTitle,
      theme: quizTheme,
      description: quizDescription,
      questions: this.quiz?.questions ?? [],
      statut: 'A faire',
      image: quizImage
    };

    this.quizService.editQuiz(updatedQuiz).subscribe(() => {
      this.editQuizEvent.emit();
      this.quizService.retrieveQuizzes();
      this.closeModalUpdate();
    });
  }

  closeModalUpdate() {
    const modal = document.getElementById("myModalUpdate");
    if (modal) {
      modal.style.display = "none";
    }
  }
}
