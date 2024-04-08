import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StatistiqueService {

    constructor(private http: HttpClient) { }

    getWeeklyQuizData(): Observable<{ weeks: string[], quizFacilesCounts: number[], quizMoyensCounts: number[], quizDifficilesCounts: number[] }> {
        const weeks = ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'];
        const quizFacilesCounts = [5, 10, 2, 12];
        const quizMoyensCounts = [0, 5, 1, 10];
        const quizDifficilesCounts = [0, 2, 3, 6];
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
}
