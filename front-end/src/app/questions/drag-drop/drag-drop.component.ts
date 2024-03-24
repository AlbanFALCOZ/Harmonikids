import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropService } from 'src/services/drag-drop.service';
import { Question } from 'src/models/question.model';

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
  questionId: string = '';

  @Input() drag!: Question;

  constructor(private dragDropService: DragDropService) { }

  ngOnInit() {
    if (this.drag) {
      this.questionId = this.drag.id;
      this.updateItems(this.questionId);
      console.log(this.drag);
    }
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
        this.items = dragDropItem.answers.map(answer => answer.value);
        this.question = dragDropItem.label;
        this.rightAnswer = dragDropItem.answers.find(answer => answer.isCorrect)?.value || '';
        this.basket = [''];
      }
    });
  }

  changeQuestion(newQuestionId: string) {
    this.questionId = newQuestionId;
    this.updateItems(this.questionId);
  }
}