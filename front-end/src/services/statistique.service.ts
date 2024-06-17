import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { QuizService } from './quiz.service';
import { GameService } from './game.service';
import { Quiz } from 'src/models/quiz.model';
import { Game } from 'src/models/game.model';

@Injectable({
    providedIn: 'root'
})
export class StatistiqueService {

    quizList: Quiz[] = [];
    games: Game[] = [];


    constructor(private http: HttpClient, private quizService: QuizService, private gameService: GameService) {
        this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
            this.quizList = quizzes;
        });

        this.gameService.games$.subscribe((games: Game[]) => {
            this.games = games;
        });

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
        const childProgress: number[] = [10, 15, 12, 18];
        const averageProgress: number[] = [8, 12, 10, 16];

        return new Observable(observer => {
            observer.next({ categories, childProgress, averageProgress });
            observer.complete();
        });
    }

    private quizCorrectFirstAttemptCount = new BehaviorSubject<Map<number, number>>(this.loadCorrectFirstAttemptCountFromLocalStorage());


    private loadCorrectFirstAttemptCountFromLocalStorage(): Map<number, number> {
        const storedData = localStorage.getItem('correctFirstAttemptCount');
        if (storedData) {
            return new Map(JSON.parse(storedData));
        }
        return new Map<number, number>();
    }

    private saveCorrectFirstAttemptCountToLocalStorage(data: Map<number, number>): void {
        localStorage.setItem('correctFirstAttemptCount', JSON.stringify(Array.from(data.entries())));
    }

    setCorrectFirstAttemptCount(quizId: number, count: number): void {
        const currentData = this.quizCorrectFirstAttemptCount.value;
        currentData.set(quizId, count);
        this.quizCorrectFirstAttemptCount.next(currentData);
        this.saveCorrectFirstAttemptCountToLocalStorage(currentData);
    }

    getCorrectFirstAttemptCount(quizId: number): Observable<number> {
        return new Observable<number>(observer => {
            this.quizCorrectFirstAttemptCount.subscribe(map => {
                observer.next(map.get(quizId) || 0);
            });
        });
    }
}
