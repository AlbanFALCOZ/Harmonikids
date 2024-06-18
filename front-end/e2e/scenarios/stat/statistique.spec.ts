import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { StatistiqueFixture } from 'src/app/statistiques/statistique/statistique.fixture';


test.describe('Stat Quiz', () => {
    let fixture: StatistiqueFixture;

    test.beforeEach(async ({ page }) => {
        fixture = new StatistiqueFixture(page);
        await page.goto(testUrl + '/statistiques');
    });

    test('Button', async () => {
        expect(await fixture.getHistoryButton()).not.toBeNull();
    });
});