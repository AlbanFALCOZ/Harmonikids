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
import { ThemeComponent} from './themes/theme/theme.component';
import { ThemeAddComponent} from './themes/theme-add/theme-add.component';
import { ThemeEditComponent} from './themes/theme-edit/theme-edit.component';
import { ThemeDeleteComponent } from './themes/theme-delete/theme-delete.component';
import { ThemeListComponent } from './themes/theme-list/theme-list.component';
import { LevelCardComponent } from './levels/level-card/level-card.component';
import { TitleComponent } from './head-title/title.component';
import { QuizAddComponent } from './quizzes/quiz-add/quiz-add.component';
import { QuizEditComponent } from './quizzes/quiz-edit/quiz-edit.component';
import { QuizDeleteComponent } from './quizzes/quiz-delete/quiz-delete.component';
import { MultiChoiceComponent } from './questions/multi-choice/multi-choice.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { DragDropComponent } from './questions/drag-drop/drag-drop.component';
import { SoundQuestionComponent } from './questions/sound-question/sound-question.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuizListComponent,
    MembreComponent,
    MembreListeComponent,
    NavbarComponent,
    ThemeComponent,
    ThemeAddComponent,
    ThemeEditComponent,
    ThemeDeleteComponent,
    ThemeListComponent,
    LevelCardComponent,
    TitleComponent,
    QuizAddComponent,
    QuizEditComponent,
    QuizDeleteComponent,
    DragDropComponent,
    MultiChoiceComponent,
    QuestionListComponent,
    SoundQuestionComponent,
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
