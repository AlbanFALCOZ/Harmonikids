// quiz.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/services/question.service';
import { MembreService } from 'src/services/membre.service';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

    @Input()
    quiz!: Quiz;

    memberId!: number | undefined;

    @Input() isDisabled: boolean = false;

    @Output()
    quizSelected: EventEmitter<Quiz> = new EventEmitter<Quiz>();

    @Output()
    editQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();

    @Output()
    quizToDelete: EventEmitter<Quiz> = new EventEmitter<Quiz>();

    constructor(private route: ActivatedRoute, private questionService: QuestionService, private membreService: MembreService, private router: Router) { 

    }

    ngOnInit(): void {
        this.memberId = this.route.snapshot.params['id'];
    }

    selectQuiz(): void {
        this.quizSelected.emit(this.quiz);
        const quizQuestions = this.quiz.questions;
        this.questionService.updateQuestionsForQuiz(quizQuestions);
        const memberId = this.membreService.getMemberId();
        this.router.navigate(['/niveau', this.quiz.id]);
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
