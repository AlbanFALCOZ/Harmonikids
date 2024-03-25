import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { QuizComponent } from './quizzes/quiz/quiz.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { LevelComponent } from './niveau/level/level.component';
import { NiveauCardComponent } from './niveau/niveau-card/niveau-card.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuizListComponent,
    NavbarComponent,
    LevelComponent,
    NiveauCardComponent
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
