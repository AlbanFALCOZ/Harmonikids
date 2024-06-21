import { test, expect } from '@playwright/test';
import { quizListUrl, testUrl } from 'e2e/e2e.config';
import { DashboardFixture } from 'src/app/dashboard/dashboard.fixture';
import { EndGameFixture } from 'src/app/end-game/end-game.fixture';
import { AddMembreFixture } from 'src/app/membres/membres-liste/member-list.fixture';
import { LevelFixture } from 'src/app/niveau/level/level.fixture';
import { MultiChoiceFixture } from 'src/app/questions/multi-choice/multi-choice.fixture';
import { QuestionListFixture } from 'src/app/questions/question-list/question-list.fixture';
import { QuizDeleteFixture } from 'src/app/quizzes/quiz-delete/quiz.fixture';
import { QuizListFixture } from 'src/app/quizzes/quiz-list/quiz-list.fixture';
import { QuizFixture } from 'src/app/quizzes/quiz/quiz.fixture';

test.describe('Initial test display', () => {
    test('Basic test', async ({ page }) => {
        await page.goto(testUrl+'/membres-liste');
        const membreListeFixture = new AddMembreFixture(page);

        const dashboardFixture = new DashboardFixture(page);

        const levelFixture = new LevelFixture(page);
        const endGameFixture = new EndGameFixture(page);


        await membreListeFixture.chooseLeo().click();

        await dashboardFixture.getThemes().click();

        await page.locator('div').filter({ hasText: 'Le sportApprends plus sur le sport' }).nth(2).click();

        await page.locator('div').filter({ hasText: 'Le sportEs-tu un vrai sportif ?' }).nth(2).click();

        await levelFixture.getLevelCard().nth(1).click();

        await page.getByRole('button', { name: 'Suivant' }).click();
        await page.getByRole('button', { name: 'Précédent' }).click();

        await page.getByRole('button', { name: 'Vrai' }).click();
        await page.getByRole('button', { name: 'Valider' }).click();
        await page.getByRole('button', { name: 'Suivant' }).click();

        await page.getByRole('button', { name: 'Wimbledon' }).click();
        await page.getByRole('button', { name: 'Valider' }).click();
        await page.getByRole('button', { name: 'Roland-garros' }).click();
        await page.getByRole('button', { name: 'Valider' }).click();
        await page.getByRole('button', { name: 'Suivant' }).click();

        await page.getByRole('button', { name: 'France' }).click();
        await page.getByRole('button', { name: 'Valider' }).click();
        await page.getByRole('button', { name: 'Suivant' }).click();

        await page.getByRole('button', { name: '3' }).click();
        await page.getByRole('button', { name: '2' }).click();
        await page.getByRole('button', { name: '3' }).click();
        await page.getByRole('button', { name: 'Valider' }).click();
        await page.getByRole('button', { name: 'Terminer' }).click();

        await endGameFixture.getButton().click();
    });

    
});