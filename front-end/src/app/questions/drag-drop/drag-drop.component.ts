import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropService } from 'src/services/drag-drop.service';

@Component({
  selector: 'app-drag-drop',
  templateUrl: 'drag-drop.component.html',
  styleUrls: ['drag-drop.component.scss'],
})
export class DragDropComponent implements OnInit {

  items: string[] = [];
  basket: string[] = [];
  question: string = '';
  rightAnswer: string = '';
  @Input() questionId: string = '1';

  constructor(private dragDropService: DragDropService) { }

  ngOnInit() {
    this.updateItems(this.questionId);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  updateItems(questionId: string) {
    this.dragDropService.getDragDropById(questionId).subscribe(dragDropItem => {
      if (dragDropItem) {
        this.items = [dragDropItem.reponse1, dragDropItem.reponse2, dragDropItem.reponse3 , dragDropItem.rightAnswer];
        this.question = dragDropItem.question;
        this.rightAnswer = dragDropItem.rightAnswer; 
        this.basket = [''];
      }

    
    });
  }

  changeQuestion(newQuestionId: string) {
    this.questionId = newQuestionId;
    this.updateItems(this.questionId);
  }
}
