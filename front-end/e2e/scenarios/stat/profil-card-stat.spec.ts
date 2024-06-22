import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AddMembreFixture } from 'src/app/membres/membres-liste/member-list.fixture';
import { ErgoModeFixture } from 'src/app/navbar/navbar.fixture';
import { ProfilCardFixture } from 'src/app/statistiques/profil-card-stat/profil-card-stat.fixture';

test('Profil statistiques', async ({ page }) => {
  await page.goto(testUrl + '/membres-liste');
  const membreListeFixture = new AddMembreFixture(page);
  const profil = membreListeFixture.chooseAlice();

  const ergoModeFixture = new ErgoModeFixture(page);
  await ergoModeFixture.activateErgoMode('admin');

  await profil.click();

  const statProfil = new ProfilCardFixture(page);

  const memberName = await statProfil.getMemberName();
  expect(memberName).not.toBeNull();

  const memberAge = await statProfil.getMemberAge();
  expect(memberAge).not.toBeNull();
  
});

