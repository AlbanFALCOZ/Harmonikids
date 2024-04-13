import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { THEME_LIST } from 'src/mocks/theme-list.mocks';
import { Theme } from 'src/models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
 

    private themes: Theme[] = THEME_LIST;
    public selectedThemes: Theme[] = [];
    
   

    public themes$: BehaviorSubject<Theme[]>
    = new BehaviorSubject(this.themes);

    public themeSelected$: Subject<Theme> = new Subject();

    constructor(private http: HttpClient) {
        this.retrieveThemes();
        this.initializeSelectedThemes();
      }

    retrieveThemes(): void {
    this.themes$.next(this.themes);
    }

    getThemes(): Theme[] {
      return this.themes$.getValue(); 
  }

    addTheme(theme: Theme): void {
        this.themes.push(theme);
        this.themes$.next(this.themes);
      }
    
     
    
      deleteTheme(theme: Theme): void {
        this.themes = this.themes.filter(t => t != theme);
        this.themes$.next(this.themes);
      }

      addSelectedTheme(theme: Theme) {
        this.selectedThemes.push(theme);
      }
    
      getSelectedThemes(): Theme[] {
        return this.selectedThemes;
      }


      getThemeById(id: string): Theme {
        const theme = this.themes.find(theme => theme.id === id);
        if (!theme) {
          throw new Error(`No theme found with ID: ${id}`);
        }
        return theme;
      }

      private initializeSelectedThemes() {
        this.selectedThemes = this.themes.slice(0, 4);
    }
    
      
      
      
      
}
