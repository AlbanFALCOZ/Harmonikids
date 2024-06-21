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
        const profil = membreListeFixture.chooseMember();
        await profil.click();

        const dashboardFixture = new DashboardFixture(page);
        await dashboardFixture.getList().click();

        // const quizFixture = new QuizFixture(page);
        // const button = quizFixture.getChooseButton().nth(6);
        // await button.click();

        // const levelFixture = new LevelFixture(page);
        // await levelFixture.getLevelCard().nth(0).click();

        // const multiChoiceFixture = new MultiChoiceFixture(page);
        // const questionListFixture = new QuestionListFixture(page);
        // await multiChoiceFixture.getWrongAnswer().click();
        // await questionListFixture.getValidateButton().click();
        // await multiChoiceFixture.getRightAnswer().click();
        // await questionListFixture.getValidateButton().click();
        // await questionListFixture.getTerminerButton().click();

        // const endGameFixture = new EndGameFixture(page);
        // await endGameFixture.getButton().click();
    });
});