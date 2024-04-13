import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Quiz } from 'src/models/quiz.model';
import { Theme } from 'src/models/theme.model';
import { QuizService } from 'src/services/quiz.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-theme-add',
  templateUrl: './theme-add.component.html',
  styleUrl: './theme-add.component.scss'
})
export class ThemeAddComponent implements OnInit {

  quizList: Quiz[] = [];

  constructor(private themeService: ThemeService, private quizService: QuizService) { 
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit(): void {
  }

  displayModal() {
    var modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = "block";

      window.onclick = function (event) {
        if (event.target == modal && (modal)) {
          modal.style.display = "none";
        }
      }
    }
  }

  closeModal() {
    var modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = "none";
    }
  }

  submitForm(form: NgForm): void {

    const themeName = form.value.themeTitle;
    const themeDescription = form.value.themeDescription;
    const themeNumberOfQuizzes = form.value.themeNumberOfQuizzes;
    const themeQuizzes = form.value.themeQuizzes;
    const themeImage = form.value.themeImage;

    const newTheme: Theme = {
      id: '1',
      name: themeName,
      description: themeDescription,
      numberOfQuizzes: 0,
      quizzes: themeQuizzes,
      image: themeImage,
    };

    this.themeService.addTheme(newTheme);

    form.resetForm();
  }
}
