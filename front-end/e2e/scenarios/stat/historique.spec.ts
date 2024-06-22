import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { HistoriqueFixture } from 'src/app/statistiques/historique/historique.fixture';
import { StatistiqueFixture } from 'src/app/statistiques/statistique/statistique.fixture';
import { DashboardFixture } from 'src/app/dashboard/dashboard.fixture';
import { EndGameFixture } from 'src/app/end-game/end-game.fixture';
import { AddMembreFixture } from 'src/app/membres/membres-liste/member-list.fixture';
import { ErgoModeFixture } from 'src/app/navbar/navbar.fixture';
import { LevelFixture } from 'src/app/niveau/level/level.fixture';
import { MultiChoiceFixture } from 'src/app/questions/multi-choice/multi-choice.fixture';
import { QuestionListFixture } from 'src/app/questions/question-list/question-list.fixture';
import { QuizFixture } from 'src/app/quizzes/quiz/quiz.fixture';

test('Historique des jeux', async ({ page }) => {
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

    const stat = new StatistiqueFixture(page);

    const buttonHistory = await stat.getHistoryButton();

    await buttonHistory.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await expect(buttonHistory).toBeEnabled();
    await buttonHistory.click({ force: true });

    await page.waitForTimeout(1000);

    const historique = new HistoriqueFixture(page);


    expect(await historique.getGames()).not.toBeNull();
});