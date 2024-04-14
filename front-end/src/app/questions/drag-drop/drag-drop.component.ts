import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from  '@angular/cdk/drag-drop';
import { DragDropService } from 'src/services/drag-drop.service';
import { Question } from 'src/models/question.model';
import { IndiceService } from 'src/services/indice.service';

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
  showSuccessMessage: boolean = false;
  showFailureMessage: boolean = false;


  questionId: string = '';

  @Input() drag!: Question;
  hintImageUrl: any;

  constructor(private dragDropService: DragDropService , private indiceService : IndiceService) { }

  ngOnInit() {
    this.addClickOutsideListener();
    if (this.drag) {
      this.updateItems(this.drag.id);
    }
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.clickOutsideHandler);
  }

  addClickOutsideListener() {
    document.addEventListener('click', this.clickOutsideHandler.bind(this));
  }

  clickOutsideHandler(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const messageElement = document.querySelector('.messageSuccess, .messageFailure');

    if (messageElement && !messageElement.contains(target)) {
      this.hideMessages();
    }
  }

  hideMessages() {
    this.showSuccessMessage = false;
    this.showFailureMessage = false;
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
    this.hideMessages();

    if (this.basket.includes(this.rightAnswer)) {
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 8000);
    }
    else {
      this.showFailureMessage = true;
      if (this.indiceService.estIndiceActif()) {
        this.hintImageUrl = '/assets/img/fourmis.png';
        setTimeout(() => this.hintImageUrl = undefined, 5000); 
      }
     

      setTimeout(() => this.showFailureMessage = false, 5000);
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