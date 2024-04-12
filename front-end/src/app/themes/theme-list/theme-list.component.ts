import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from '../../../models/theme.model';
import { TitleService } from 'src/services/title.service';
import { ThemeService } from 'src/services/theme.service';
import { SonService } from 'src/services/sound.service';


@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrl: './theme-list.component.scss'
})

export class ThemeListComponent implements OnInit {

  public themeList: Theme[] = [];
  themeListDisplayed: Theme[] = [];
  themeToDelete: Theme | null = null;
  isDisabled: boolean = false;

  search: string = '';

  constructor(private router: Router, public themeService: ThemeService, public titleService: TitleService, private sonService: SonService) {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
      this.themeListDisplayed = themes;
    });
    this.titleService.title = 'Liste des themes';
    this.titleService.search = 'Rechercher dans les themes...';
  }

  ngOnInit(): void {
  }

  themeSelected(selected: boolean): void {
    console.log('event received from child:', selected);
  }

  editTheme(theme: Theme): void {
    this.router.navigate(['/edit-theme/' + theme.name]);
  }

  addThemeToDelete(theme: Theme): void {
    console.log('theme to delete:', theme);
    this.themeToDelete = theme;
  }

  deleteTheme(): void {
    if (this.themeToDelete) {
      this.themeService.deleteTheme(this.themeToDelete);
    }
  }

  playSound() {
    this.sonService.playSound('./../../../../assets/img/good.mp3');
  }

  onKey(event: any) {
    this.themeListDisplayed = this.themeList.filter(theme => theme.name.toLowerCase().includes(event.target.value.toLowerCase()));
  }

}
