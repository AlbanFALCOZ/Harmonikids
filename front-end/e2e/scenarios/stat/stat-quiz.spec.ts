import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { StatQuizFixture } from 'src/app/statistiques/stat-quiz/stat-quiz.fixture';


test.describe('Stat Quiz', () => {
    let fixture: StatQuizFixture;

    test.beforeEach(async ({ page }) => {
        fixture = new StatQuizFixture(page);
        await page.goto(testUrl + '/statistiques');
    });

    test('should display the quiz name', async () => {
        expect(await fixture.getQuizName()).not.toBeNull();
    });

    test('should display the correct first attempt count', async () => {
        expect(await fixture.getCorrectFirstAttemptCount()).not.toBeNull();
    });

    test('should display the percentage', async () => {
        expect(await fixture.getPercentage()).toBe(50);
    });
});