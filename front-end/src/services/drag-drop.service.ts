import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DragDrop } from 'src/models/drag-drop.model';
import { DragDrop_LIST } from 'src/mocks/drag-drop.mock';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  constructor() { }

  getDragDropList(): Observable<DragDrop[]> {
    return of(DragDrop_LIST);
  }

  getDragDropById(id: string): Observable<DragDrop | undefined> {
    const dragDropItem = DragDrop_LIST.find(item => item.id === id);
    return of(dragDropItem);
  }
  
  getItems(id: string): Observable<{ item1: string, item2: string, item3: string } | undefined> {
    const item = DragDrop_LIST.find(item => item.id === id);
    if (item) {
      return of({ item1: item.reponse1, item2: item.reponse2, item3: item.reponse3 });
    } else {
      return of(undefined);
    }
  }

  getRightAnswer(id: string): Observable<string | undefined> {
    const item = DragDrop_LIST.find(item => item.id === id);
    if (item) {
      return of(item.rightAnswer);
    } else {
      return of(undefined);
    }
  }

  getQuestion(id: string): Observable<string | undefined> {
    const item = DragDrop_LIST.find(item => item.id === id);
    if (item) {
      return of(item.question);
    } else {
      return of(undefined);
    }
  }
}






