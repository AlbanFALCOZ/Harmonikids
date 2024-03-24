// drag-drop.service.ts
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

  getDragDropItem(id: string): Observable<DragDrop | undefined> {
    const item = DragDrop_LIST.find(item => item.id === id);
    return of(item);
  }

  


}

