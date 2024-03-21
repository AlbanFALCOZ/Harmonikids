import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { QuizComponent } from './quizzes/quiz/quiz.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { ThemeComponent} from './themes/theme/theme.component';
import { ThemeListComponent } from './themes/theme-list/theme-list.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuizListComponent,
    NavbarComponent,
    ThemeComponent,
    ThemeListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
