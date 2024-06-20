import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { QuizService } from './quiz.service';
import { GameService } from './game.service';
import { Quiz } from 'src/models/quiz.model';
import { Game } from 'src/models/game.model';
import { ActivatedRoute } from '@angular/router';
import { MembreService } from './membre.service';

@Injectable({
    providedIn: 'root'
})
export class StatistiqueService {

    quizList: Quiz[] = [];
    games: Game[] = [];
    memberId: number = 0;


    constructor(private http: HttpClient, private quizService: QuizService, private gameService: GameService, private route: ActivatedRoute,
        private membreService: MembreService
     ) {
        this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
            this.quizList = quizzes;
        });

        this.gameService.games$.subscribe((games: Game[]) => {
            this.games = games;
        });
        this.memberId = this.membreService.getMemberId();

     }

    getWeeklyQuizData(): Observable<{ weeks: string[], quizFacilesCounts: number[], quizMoyensCounts: number[], quizDifficilesCounts: number[] }> {
        const weeks = ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'];
        const quizFacilesCounts = this.quizList.map(quiz => quiz.questions.filter(question => question.niveau === 'Facile').length);
        const quizMoyensCounts = this.quizList.map(quiz => quiz.questions.filter(question => question.niveau === 'Moyen').length);
        const quizDifficilesCounts = this.quizList.map(quiz => quiz.questions.filter(question => question.niveau === 'Difficile').length);
        return of({ weeks, quizFacilesCounts, quizMoyensCounts, quizDifficilesCounts });
    }

    getProgressData(): Observable<{ categories: string[], childProgress: number[], averageProgress: number[] }> {
        const categories: string[] = ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'];

        const childGames = this.games.filter(game => game.childId === this.memberId);
        const childProgress: number[] = childGames.map(game => game.correctFirstAttemptCount);

        const otherGames = this.games.filter(game => game.childId !== this.memberId);
        const totalCorrectFirstAttempts = otherGames.reduce((total, game) => total + game.correctFirstAttemptCount, 0);
        const averageProgress: number[] = Array(categories.length).fill(totalCorrectFirstAttempts / categories.length);
        return new Observable(observer => {
            observer.next({ categories, childProgress, averageProgress });
            observer.complete();
        });
    }


 
}
