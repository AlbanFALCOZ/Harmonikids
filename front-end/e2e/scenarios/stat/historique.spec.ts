import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { HistoriqueFixture } from 'src/app/statistiques/historique/historique.fixture';


test.describe('Stat Quiz', () => {
    let fixture: HistoriqueFixture;

    test.beforeEach(async ({ page }) => {
        fixture = new HistoriqueFixture(page);
        await page.goto(testUrl + '/history');
    });

    test('should display the quiz name', async () => {
        expect(await fixture.getGames()).not.toBeNull();
    });
});