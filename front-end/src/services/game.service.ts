import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Answer } from '../models/question.model';
import { Game } from '../models/game.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { httpOptionsBase, serverUrl } from 'src/configs/server.config';
import { Quiz } from 'src/models/quiz.model';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private games: Game[] = [];
    public games$: BehaviorSubject<Game[]> = new BehaviorSubject(this.games);

    gameUrl = serverUrl + '/games';
    quizUrl = serverUrl + '/quizzes';
    private httpOptions = httpOptionsBase;

    constructor(private http: HttpClient) {
        
        this.getGames();
        
    }

    startNewGame(childId: number, quizId: number): void {
        
        
        let game = this.games.find(g => g.quizId === quizId && g.childId === childId);
        
        if (!game) {
            game = {
                id: 0,
                childId: childId,
                quizId: quizId,
                correctFirstAttemptCount: 0,
                chosenAnswers: {},
                isQuizCompleted: false,
                score: 0
            };
            
            this.games.push(game);
            this.updateGamesSubject(this.games);
        }
    }

    saveChosenAnswers(childId: number, quizId: number, questionId: number, answers: Answer[], score: number): void {
        let game = this.games.find(g => g.quizId === quizId && g.childId === childId);
        
        if (game) {
            game.chosenAnswers[questionId] = answers;
            game.score += score;
            this.updateGamesSubject(this.games);
        }
    }



    incrementCorrectFirstAttemptCount(childId: number, quizId: number): void {
        const game = this.games.find(g => g.quizId === quizId && g.childId === childId);
        if (game) {
            game.correctFirstAttemptCount++;
            this.updateGamesSubject(this.games);
        }
    }

    setQuizCompleted(childId: number, quizId: number): void {
        const game = this.games.find(g => g.quizId === quizId && g.childId === childId);
        if (game) {
            game.isQuizCompleted = true;
            this.updateGamesSubject(this.games);
            this.http.put(`${this.quizUrl}/${quizId}/statut`, 'Terminé').subscribe();
        }
    }

    getGame(childId: number, quizId: number): Game | undefined {
        
        
        
        
        return this.games.find(g => g.quizId === quizId && g.childId === childId);
    }

    getGamesByChildId(childId: number): Promise<Game[]> {
        const url = `${this.gameUrl}/gamesByChild/${childId}`;
        return this.http.get<Game[]>(url).pipe(
            tap(games => {
                this.games = games || [];
                this.updateGamesSubject(this.games);
            }),
            catchError(() => {
                this.games = [];
                this.updateGamesSubject(this.games);
                return of([]);
            })
        ).toPromise() as Promise<Game[]>;
    }

    sendGameDataToBackend(game: Game): Observable<any> {
        return this.http.post(this.gameUrl, game).pipe(
            tap(response => {
                this.getGames();
            })
        );
    }

    getGames(): void {
        
        this.http.get<Game[]>(this.gameUrl).subscribe(games => {
            this.games = games;
            this.updateGamesSubject(this.games);
        });
        
    }

    private updateGamesSubject(games: Game[]): void {
        
        this.games$.next(games);
        
    }

    getGameByQuizId(quizId: number): Observable<Game | undefined> {
        return this.games$.pipe(
            map(games => games.find(game => game.quizId === quizId))
        );
    }
}
