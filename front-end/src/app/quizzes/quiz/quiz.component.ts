import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quiz } from '../../../models/quiz.model';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

    @Input()
    quiz!: Quiz

    @Input() isDisabled: boolean = false;

    @Output()
    quizSelected: EventEmitter<Quiz> = new EventEmitter<Quiz>();

    @Output()
    editQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

    @Output()
    quizToDelete: EventEmitter<Quiz> = new EventEmitter<Quiz>();

    constructor() {

    }

    ngOnInit(): void {
        console.log(this.quiz)
    }

    selectQuiz(): void {
        this.quizSelected.emit(this.quiz);
    }

    edit(): void {
        this.editQuiz.emit(this.quiz);
    }

    delete(): void {
        this.quizToDelete.emit(this.quiz);
    }

    displayModalUpdate() {
        this.editQuiz.emit(this.quiz);
        var modal = document.getElementById("myModalUpdate");

        const quizTitleInput = document.getElementById("quizTitle") as HTMLInputElement;
        const quizDescriptionInput = document.getElementById("quizDescription") as HTMLInputElement;
        const quizImageInput = document.getElementById("quizImage") as HTMLInputElement;
        const quizThemeInput = document.getElementById("quizTheme") as HTMLSelectElement;

        if (quizTitleInput && quizDescriptionInput && quizImageInput && quizThemeInput) {
            quizTitleInput.value = this.quiz.name;
            quizDescriptionInput.value = this.quiz.description;
            quizImageInput.value = this.quiz.image;
            quizThemeInput.value = this.quiz.theme;
        }

        if (modal) {
            modal.style.display = "block";
              
            window.onclick = function (event) {
                if (event.target == modal && (modal)) {
                    modal.style.display = "none";
                }
            }
        }
    }

    displayModalDelete() {
        this.quizToDelete.emit(this.quiz);
        var modal = document.getElementById("myModalDelete");
        if (modal) {
            modal.style.display = "block";

            window.onclick = function (event) {
                if (event.target == modal && (modal)) {
                    modal.style.display = "none";
                }
            }
        }
    }
}
