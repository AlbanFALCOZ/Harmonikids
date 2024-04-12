import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrl: './quiz-edit.component.scss'
})
export class QuizEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  

  closeModalUpdate() {
    var modal = document.getElementById("myModalUpdate");
    if (modal) {
      modal.style.display = "none";
    }
  }
}
