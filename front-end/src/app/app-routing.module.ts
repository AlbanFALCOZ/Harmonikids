import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { LevelComponent } from './niveau/level/level.component';
import { ThemeListComponent } from './themes/theme-list/theme-list.component';
import { MembreListeComponent } from './membres/membres-liste/membre-liste.component';
import { MembreComponent } from './membres/membre/membre.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { DragDropComponent } from './questions/drag-drop/drag-drop.component';
import { StatistiqueComponent } from './statistiques/statistique/statistique.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionAddComponent } from './questions/question-add/question-add.component';

import { EndGameComponent } from './end-game/end-game.component';


const routes: Routes = [
  { path: 'quiz-list', component: QuizListComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'questions', component: QuestionAddComponent },
  { path: 'niveau/:id', component: LevelComponent },
  { path: 'theme-list', component: ThemeListComponent },
  { path: 'statistiques', component: StatistiqueComponent },
  { path: 'question-list', component: QuestionListComponent },
  { path: '', redirectTo: '/membres-liste', pathMatch: 'full' },
  { path: 'membres' , component: MembreComponent},
  {
    path: 'membres-liste',
    component: MembreListeComponent,
  },



  {
    path: 'drag-drop',
    component: DragDropComponent,
  },
  {
    path:'configuration',component:ConfigurationComponent,
  },
  {
    path: 'dashboard/:id',
    component: DashboardComponent
  },

  { path: 'end-game', component: EndGameComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
