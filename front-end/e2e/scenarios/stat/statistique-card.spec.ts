import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { StatThemeFixture } from 'src/app/statistiques/statistique-card/statistique-card.fixture';


test.describe('Stat Quiz', () => {
    let fixture: StatThemeFixture;

    test.beforeEach(async ({ page }) => {
        fixture = new StatThemeFixture(page);
        await page.goto(testUrl + '/statistiques');
    });

    test('should display the theme name', async () => {
        expect(await fixture.getThemeName()).not.toBeNull();
    });

    test('should display the correct first attempt count', async () => {
        expect(await fixture.getCorrectNumberOfQuiz()).not.toBeNull();
    });

    test('should display the percentage', async () => {
        expect(await fixture.getPercentage()).toBe(50);
    });
});