import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { ProfilCardFixture } from 'src/app/statistiques/profil-card-stat/profil-card-stat.fixture';


test.describe('Profil card stat', () => {
  let fixture: ProfilCardFixture;

  test.beforeEach(async ({ page }) => {
    fixture = new ProfilCardFixture(page);
    await page.goto(testUrl + '/statistiques');
  });

  test('should display the member name', async () => {
    const memberName = await fixture.getMemberName();
    expect(memberName).not.toBeNull();
  });

  test('should display the member age', async () => {
    const memberAge = await fixture.getMemberAge();
    expect(memberAge).not.toBeNull();
  });

  test('should display the number of stars', async () => {
    const numberOfStars = await fixture.getNumberOfStars();
    expect(numberOfStars).not.toBeNull();
  });

});

