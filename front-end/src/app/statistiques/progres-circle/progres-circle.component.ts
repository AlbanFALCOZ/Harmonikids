import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progres-circle',
  templateUrl: './progres-circle.component.html',
  styleUrl: './progres-circle.component.scss'
})
export class ProgresCircleComponent {

  @Input() percentage: number = 0;
  
  get circumference(): number {
    return 2 * Math.PI * 40;
  }

  get dashOffset(): number {
    return this.circumference - (this.percentage / 100 * this.circumference);
  }

}
