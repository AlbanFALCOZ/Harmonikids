import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { StatQuizFixture } from 'src/app/statistiques/stat-quiz/stat-quiz.fixture';
import { StatistiqueFixture } from 'src/app/statistiques/statistique/statistique.fixture';
import { DashboardFixture } from 'src/app/dashboard/dashboard.fixture';
import { EndGameFixture } from 'src/app/end-game/end-game.fixture';
import { AddMembreFixture } from 'src/app/membres/membres-liste/member-list.fixture';
import { ErgoModeFixture } from 'src/app/navbar/navbar.fixture';
import { LevelFixture } from 'src/app/niveau/level/level.fixture';
import { MultiChoiceFixture } from 'src/app/questions/multi-choice/multi-choice.fixture';
import { QuestionListFixture } from 'src/app/questions/question-list/question-list.fixture';
import { QuizFixture } from 'src/app/quizzes/quiz/quiz.fixture';
import { StatThemeFixture } from 'src/app/statistiques/statistique-card/statistique-card.fixture';
import { ProgresFixture } from 'src/app/statistiques/progres-circle/progres-circle.fixture';

test.describe('Statistiques quiz', () => {
    test('Verifie les statistiques des cartes de quiz', async ({ page }) => {
        await page.goto(testUrl + '/membres-liste');
        const membreListeFixture = new AddMembreFixture(page);
        const profil = membreListeFixture.chooseAlice();
        await profil.click();

        const dashboardFixture = new DashboardFixture(page);
        await dashboardFixture.getList().click();

        const quizFixture = new QuizFixture(page);
        const quizMath = page.locator('div').filter({ hasText: 'Les mathématiquesEs-tu fort en mathématiques ?' }).nth(2)
        await quizMath.click();

        const levelFixture = new LevelFixture(page);
        await levelFixture.getLevelCard().nth(0).click();

        const multiChoiceFixture = new MultiChoiceFixture(page);
        const questionListFixture = new QuestionListFixture(page);
        await page.getByRole('button', { name: '39' }).click();
        await page.getByRole('button', { name: 'Valider' }).click();
        await page.getByRole('button', { name: 'Terminer' }).click();
        const endGameFixture = new EndGameFixture(page);
        await endGameFixture.getButton().click();

        await page.goto(testUrl + '/membres-liste');

        const ergoModeFixture = new ErgoModeFixture(page);
        await ergoModeFixture.activateErgoMode('admin');

        await profil.click();

        const statQuizFixture = new StatQuizFixture(page);
        expect(await statQuizFixture.getQuizName()).not.toBeNull();

        expect(await statQuizFixture.getCorrectFirstAttemptCount()).toContain('Bonnes réponses du premier coup : 1');

        const progresFixture = new ProgresFixture(page);

        expect(await progresFixture.getPercentage()).toContain('20');



    });


});