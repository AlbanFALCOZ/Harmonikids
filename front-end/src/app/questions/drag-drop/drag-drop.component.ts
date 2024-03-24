import {Component} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-drag-drop',
  templateUrl: 'drag-drop.component.html',
  styleUrl: 'drag-drop.component.scss',
})
export class DragDropComponent {

  items = ['Carrots', 'Tomatoes', 'Onions', 'Apples', 'Avocados'];

  basket = [''];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  
}

