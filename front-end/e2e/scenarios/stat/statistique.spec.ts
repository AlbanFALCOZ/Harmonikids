import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AddMembreFixture } from 'src/app/membres/membres-liste/member-list.fixture';
import { ErgoModeFixture } from 'src/app/navbar/navbar.fixture';
import { HistoriqueFixture } from 'src/app/statistiques/historique/historique.fixture';
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