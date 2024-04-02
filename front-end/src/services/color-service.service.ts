// color-service.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  selectedColor: string = ''; // Selected color
 

  constructor() { }
}
