import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { MembreListeComponent } from './membres/membres-liste/membre-liste.component';
import { MembreComponent } from './membres/membre/membre.component';


const routes: Routes = [
  { path: 'quiz-list', component: QuizListComponent },
  { path: 'quiz', component: QuizComponent },
  
  { path: '', redirectTo: '/membres-liste', pathMatch: 'full' },

  {path: 'membres' , component: MembreComponent},
  {
    path: 'membres-liste',
    component: MembreListeComponent,
  },


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
