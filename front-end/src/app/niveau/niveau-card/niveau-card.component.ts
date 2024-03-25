import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-niveau-card',
  templateUrl: './niveau-card.component.html',
  styleUrl: './niveau-card.component.scss'
})
export class NiveauCardComponent {
  @Input() niveauName: string = '';
}
