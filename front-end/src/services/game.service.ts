import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { Answer } from 'src/models/question.model';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    game: Game | undefined;

    constructor() { }

    initGame(quizId: number, memberId: number): void {
        this.game = {
            memberId: memberId,
            quizId: quizId,
            questionId: 0,
            correctFirstAttemptCount: 0,
            chosenAnswers: {},
            isQuizCompleted: false
        };
    }

    saveChosenAnswers(questionId: number, answers: Answer[]): void {
        if (this.game) {
            this.game.chosenAnswers[questionId] = answers;
        }
    }

    private previousGames: Game[] = [];


    getPreviousGames(): Game[] {
        return this.previousGames;
    }

    addPreviousGame(game: Game): void {
        this.previousGames.push(game);
    }

}
