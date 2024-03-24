import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { ThemeListComponent } from './themes/theme-list/theme-list.component';
import { MembreListeComponent } from './membres/membres-liste/membre-liste.component';
import { MembreComponent } from './membres/membre/membre.component';
import { DragDrop } from '@angular/cdk/drag-drop';
import { DragDropComponent } from './questions/drag-drop/drag-drop.component';


const routes: Routes = [
  { path: 'quiz-list', component: QuizListComponent },

  { path: 'quiz', component: QuizComponent },
  { path: 'theme-list', component: ThemeListComponent },
  { path: '', redirectTo: '/membres-liste', pathMatch: 'full' },

  {
    path: 'membres-liste',
    component: MembreListeComponent,
  },



  {
    path: 'drag-drop',
    component: DragDropComponent,
  },


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
