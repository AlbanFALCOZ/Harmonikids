import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QUESTION_LIST } from 'src/mocks/question.mock';
import { Quiz } from 'src/models/quiz.model';
import { Theme } from 'src/models/theme.model';
import { QuizService } from 'src/services/quiz.service';
import { ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-quiz-add',
  templateUrl: './quiz-add.component.html',
  styleUrl: './quiz-add.component.scss'
})
export class QuizAddComponent implements OnInit {

  src: string | undefined;

  themeList: Theme[] = [];

  constructor(public quizService: QuizService, private themeService: ThemeService) {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });
    this.quizService = quizService;
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
    const quizTitle = form.value.quizTitle;
    const quizTheme = form.value.quizTheme;
    const quizDescription = form.value.quizDescription;
    //const quizQuestions = [QUESTION_LIST[0]];
    const quizImage = form.value.quizImage;
    console.log(quizTitle, quizTheme, quizDescription, quizImage);

    const newQuiz: Quiz = {
      id: 0,
      name: quizTitle,
      theme: quizTheme,
      description: quizDescription,
      questions: [QUESTION_LIST[0]],
      statut: 'A faire',
      image: quizImage
 };

    this.quizService.addQuiz(newQuiz);
    form.resetForm();
    this.closeModal();
  }

  valueChanged(files: FileList) {
    if (files.length !== 1) return;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => (this.src = reader.result as string);
  }

}

