import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { LevelComponent } from './niveau/level/level.component';


const routes: Routes = [
  { path: 'quiz-list', component: QuizListComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '', redirectTo: '/quiz-list', pathMatch: 'full' },
  { path: 'niveau', component: LevelComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
