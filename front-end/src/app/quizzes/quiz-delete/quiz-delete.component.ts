import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quiz-delete',
  templateUrl: './quiz-delete.component.html',
  styleUrl: './quiz-delete.component.scss'
})
export class QuizDeleteComponent implements OnInit {

  @Output() deleteQuiz = new EventEmitter<void>();

  
  constructor() { }

  ngOnInit(): void {
  }

  quizDelete() {
    console.log('send delete theme');
    this.deleteQuiz.emit();
    this.closeModalDelete()
  }

  closeModalDelete() {

    var modal = document.getElementById("myModalDelete");
    if (modal) {
      modal.style.display = "none";
    }

  }
}
