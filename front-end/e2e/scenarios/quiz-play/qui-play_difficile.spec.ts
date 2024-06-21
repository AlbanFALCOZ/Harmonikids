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
        const profil = membreListeFixture.chooseAlice();
        await profil.click();

        const dashboardFixture = new DashboardFixture(page);
        await dashboardFixture.getList().click();

        const levelFixture = new LevelFixture(page);
        const endGameFixture = new EndGameFixture(page);

        await page.locator('div').filter({ hasText: 'MarioUn test sur Mario et son univers !' }).nth(2).click();

        await levelFixture.getLevelCard().nth(2).click();

        await page.getByRole('button', { name: 'Plombier' });
        await page.getByRole('button', { name: 'Valider' }).click();
        await page.getByRole('button', { name: 'Plombier' })
        await page.getByRole('button', { name: 'Valider' }).click();
        await page.getByRole('button', { name: 'Suivant' }).click();

        await page.getByRole('button', { name: 'Goomba' }).click();
        await page.getByRole('button', { name: 'Valider' }).click();
        await page.getByRole('button', { name: 'Suivant' }).click();

        await page.getByRole('button', { name: 'Pauline' }).click();
        await page.getByRole('button', { name: 'Valider' }).click();
        await page.getByRole('button', { name: 'Peach' }).click();
        await page.getByRole('button', { name: 'Valider' }).click();
        await page.getByRole('button', { name: 'Suivant' }).click();

        await page.getByRole('button', { name: 'Luigi' }).click();
        await page.getByRole('button', { name: 'Valider' }).click();
        await page.getByRole('button', { name: 'Suivant' }).click();

        await page.getByRole('button', { name: 'Une carapace' }).click();
        await page.getByRole('button', { name: 'Valider' }).click();
        await page.getByRole('button', { name: 'Un champignon' }).click();
        await page.getByRole('button', { name: 'Valider' }).click();
        await page.getByRole('button', { name: 'Suivant' }).click();

        await page.getByRole('button', { name: 'Du karting' }).click();
        await page.getByRole('button', { name: 'Du ski' }).click();
        await page.getByRole('button', { name: 'Du tennis' }).click();
        await page.getByRole('button', { name: 'Valider' }).click();
        await page.getByRole('button', { name: 'Terminer' }).click();

        await endGameFixture.getButton().click();
    });

    
});