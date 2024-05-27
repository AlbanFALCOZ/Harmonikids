// quiz.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quiz } from '../../../models/quiz.model';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

    @Input()
    quiz!: Quiz;

    @Input() isDisabled: boolean = false;

    @Output()
    quizSelected: EventEmitter<Quiz> = new EventEmitter<Quiz>();

    @Output()
    editQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

    @Output()
    quizToDelete: EventEmitter<Quiz> = new EventEmitter<Quiz>();

    constructor() { }

    ngOnInit(): void {
        console.log(this.quiz);
    }

    selectQuiz(): void {
        this.quizSelected.emit(this.quiz);
    }

    displayModalUpdate() {
        this.editQuiz.emit(this.quiz); // Pass the quiz to the parent component
        const modal = document.getElementById("myModalUpdate");

        if (modal) {
            modal.style.display = "block";
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
        }
    }

    displayModalDelete() {
        this.quizToDelete.emit(this.quiz);
        const modal = document.getElementById("myModalDelete");
        if (modal) {
            modal.style.display = "block";
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
        }
    }
}
