import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrl: './theme-edit.component.scss'
})
export class ThemeEditComponent {
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
