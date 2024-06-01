import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
