import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { QuizComponent } from './quizzes/quiz/quiz.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { TitleComponent } from './head-title/title.component';
import { QuizAddComponent } from './quizzes/quiz-add/quiz-add/quiz-add.component';
import { QuizEditComponent } from './quizzes/quiz-edit/quiz-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuizListComponent,
    NavbarComponent,
    TitleComponent,
    QuizAddComponent,
    QuizEditComponent
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
