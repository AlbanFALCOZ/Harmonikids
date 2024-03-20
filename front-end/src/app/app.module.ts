import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { QuizComponent } from './quizzes/quiz/quiz.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { MembreComponent } from './membres/membre/membre/membre.component';
import { MembreListeComponent } from './membres/membres-liste/membre-liste/membre-liste.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuizListComponent,
    MembreComponent,
    MembreListeComponent,
    NavbarComponent
    
    
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
