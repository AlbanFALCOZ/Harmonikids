import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { MembreComponent } from './membres/membre/membre.component';
import { MembreListeComponent } from './membres/membres-liste/membre-liste.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { TitleComponent } from './head-title/title.component';
import { QuizAddComponent } from './quizzes/quiz-add/quiz-add.component';
import { QuizEditComponent } from './quizzes/quiz-edit/quiz-edit.component';
import { QuizDeleteComponent } from './quizzes/quiz-delete/quiz-delete.component';
import { TypeQuestionComponent } from './questions/type-question/type-question.component';
import { DragDropComponent } from './questions/drag-drop/drag-drop.component';
import { ThemeComponent} from './themes/theme/theme.component';
import { ThemeListComponent } from './themes/theme-list/theme-list.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuizListComponent,
    MembreComponent,
    MembreListeComponent,
    NavbarComponent,
    ThemeComponent,
    ThemeListComponent,
    NavbarComponent,

    TitleComponent,
    QuizAddComponent,
    QuizEditComponent,
    QuizDeleteComponent,
    TypeQuestionComponent,
    DragDropComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
