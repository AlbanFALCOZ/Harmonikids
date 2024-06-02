import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { THEME_LIST } from 'src/mocks/theme-list.mocks';
import { Theme } from 'src/models/theme.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  getThemes(): Theme[] {
    return this.themes;
  }


  private themes: Theme[] = [];
  public themes$: BehaviorSubject<Theme[]>
    = new BehaviorSubject(this.themes);

  public themeSelected$: Subject<Theme> = new Subject();

  private themeUrl = serverUrl + '/themes';

  private httpOptions = httpOptionsBase;


  public selectedThemes: Theme[] = [];




  constructor(private http: HttpClient) {
    this.retrieveThemes();
    // this.initializeSelectedThemes();
  }

  retrieveThemes(): void {
    this.http.get<Theme[]>(this.themeUrl).subscribe((themeList) => {
      this.themes = themeList;
      this.themes$.next(this.themes);
    });
    // this.themes$.next(this.themes);
  }



  addTheme(theme: Theme): void {
    this.http.post<Theme>(this.themeUrl, theme, this.httpOptions).subscribe(() => this.retrieveThemes());

    // this.themes.push(theme);
    // this.themes$.next(this.themes);
  }

  editTheme(theme: Theme): Observable<Theme> {
    const url = this.themeUrl + '/' + theme.id;
    return this.http.put<Theme>(url, theme, this.httpOptions);
  }

  deleteTheme(theme: Theme): void {
    const urlWithId = this.themeUrl + '/' + theme.id;
    this.http.delete<Theme>(urlWithId, this.httpOptions).subscribe(() => this.retrieveThemes());

    // this.themes = this.themes.filter(t => t != theme);
    // this.themes$.next(this.themes);
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
