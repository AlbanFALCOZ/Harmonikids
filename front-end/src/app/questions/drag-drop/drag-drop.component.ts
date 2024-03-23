import { Component, Input } from '@angular/core';
import { DragDrop } from 'src/models/drag-drop.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.scss'
})
export class DragDropComponent {

  hasItemDropped: boolean = false;
  droppedItem: any; // Track the dropped item data
  correctAnswer: string = 'Réponse 3';
  isItemInContainer: boolean = false;

  drop(event: CdkDragDrop<string[]>) {
    this.hasItemDropped = true;
    const textContent = event.item.element.nativeElement.textContent;
    this.droppedItem = textContent ? textContent.trim() : ''; // Check if textContent is null before accessing it
    console.log('Dropped item:', event.item.data);

    // Check if the dropped item is the correct answer
    if (this.droppedItem === this.correctAnswer) {
      console.log('Correct Answer!'); // Log a message for correct answer
      // Add your specific actions for correct answer here
    } else {
      console.log('Incorrect Answer!');
      // Handle incorrect answer action
    }
  }
  onItemEntered() {
    this.isItemInContainer = true;
  }

  // Method to handle when an item exits the container
  onItemExited() {
    // Check if any draggable item is still in the container
    const draggableItems = document.querySelectorAll('.draggable-item');
    if (draggableItems.length === 0) {
      this.isItemInContainer = false;
    }
  }

}
  


  
 

