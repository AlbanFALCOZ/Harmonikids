import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-delete',
  templateUrl: './quiz-delete.component.html',
  styleUrl: './quiz-delete.component.scss'
})
export class QuizDeleteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  closeModalDelete() {
    var modal = document.getElementById("myModalDelete");
    if (modal) {
      modal.style.display = "none";
    }
  }
}
