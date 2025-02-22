import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from '../../../models/theme.model';
import { TitleService } from 'src/services/title.service';
import { ThemeService } from 'src/services/theme.service';
import { SonService } from 'src/services/sound.service';
import { NavbarService } from 'src/services/navbar.service';
import { ModeService } from 'src/services/mode-ergo.service';


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

  isNavVisible = false;
  search: string = '';



  constructor(private router: Router, public themeService: ThemeService, public titleService: TitleService, private sonService: SonService, private navbarService: NavbarService, private modeService: ModeService) {
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
      this.themeListDisplayed = themes;
    });
    this.titleService.title = 'Liste des thèmes';
    this.titleService.search = 'Rechercher dans les themes...';

    this.navbarService.isNavbarVisible$.subscribe(isVisible => {
      this.isNavVisible = isVisible;
    });

    this.modeService.isDisabled$.subscribe(isDisabled => {
      this.isDisabled = isDisabled;
    });
  }

  ngOnInit(): void {
  }

  themeSelected(theme: Theme): void {
    this.router.navigate(['/quiz-list'], { queryParams: { theme: theme.name } });
  }

  editTheme(theme: Theme): void {
    this.router.navigate(['/edit-theme/' + theme.name]);
  }

  addThemeToDelete(theme: Theme): void {
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
