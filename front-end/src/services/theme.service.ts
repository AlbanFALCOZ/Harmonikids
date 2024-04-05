import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { THEME_LIST } from 'src/mocks/theme-list.mocks';
import { Theme } from 'src/models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  getAllThemes(): string[] {
    throw new Error('Method not implemented.');
  }

    private themes: Theme[] = THEME_LIST;

    public themes$: BehaviorSubject<Theme[]>
    = new BehaviorSubject(this.themes);

    public themeSelected$: Subject<Theme> = new Subject();

    constructor(private http: HttpClient) {
        this.retrieveThemes();
      }

    retrieveThemes(): void {
    this.themes$.next(this.themes);
    }

    getThemes(): Theme[] {
      return this.themes$.getValue(); 
  }

    addTheme(theme: Theme): void {
        this.themes
        this.themes$.next(this.themes);
      }
    
      setSelectedTheme(themeId: string): void {
        
      }
    
      deleteTheme(theme: Theme): void {
        
      }
}
