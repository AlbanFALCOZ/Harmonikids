import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';


const routes: Routes = [
  { path: 'quiz-list', component: QuizListComponent },
  { path: 'quiz', component: QuizComponent },  
  { path: '', redirectTo: '/quiz-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
