import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-theme-add',
  templateUrl: './theme-add.component.html',
  styleUrl: './theme-add.component.scss'
})
export class ThemeAddComponent implements OnInit {

  constructor() { }

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
}
