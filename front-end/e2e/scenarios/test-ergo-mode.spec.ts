import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { ErgoModeFixture } from 'src/app/navbar/navbar.fixture';
import { AddMembreFixture } from 'src/app/membres/membres-liste/member-list.fixture';
import { ConfigurationFixture } from 'src/app/configuration/configuration.fixture';

test.describe('Mode Ergo Tests', () => {
  let ergoModeFixture: ErgoModeFixture;
  let addMembreFixture: AddMembreFixture;
  let configurationFixture: ConfigurationFixture;

  test.beforeEach(async ({ page }) => {
    ergoModeFixture = new ErgoModeFixture(page);
    addMembreFixture = new AddMembreFixture(page);
    configurationFixture = new ConfigurationFixture(page);
    await page.goto(testUrl);
    await page.waitForLoadState('domcontentloaded');
  });

  /*test('should activate mode Ergo with correct password', async ({ page }) => {
    await ergoModeFixture.activateErgoMode('admin');
    const isActivated = await ergoModeFixture.isErgoModeActivated();
    expect(isActivated).toBe(true);
  });*/

  test('should not activate mode Ergo with incorrect password', async ({ page }) => {
    await ergoModeFixture.activateErgoMode('wrongpassword');
    const isDeactivated = await ergoModeFixture.isErgoModeDeactivated();
    expect(isDeactivated).toBe(true);
  });

  /*test('should activate then deactivate mode Ergo', async ({ page }) => {
    await ergoModeFixture.activateErgoMode('admin');
    await ergoModeFixture.deactivateErgoMode();
    const isDeactivated = await ergoModeFixture.isErgoModeDeactivated();
    expect(isDeactivated).toBe(true);
  });*/

  test('should add a new enfant when in Ergo mode the desactivate mode Ergo', async ({ page }) => {
    await ergoModeFixture.activateErgoMode('admin');
    await expect(await ergoModeFixture.isErgoModeActivated()).toBeTruthy();

    await addMembreFixture.addEnfant('Mimi', 'Émilie', '10', 'Description de mimi');

    await ergoModeFixture.deactivateErgoMode();
    const isDeactivated = await ergoModeFixture.isErgoModeDeactivated();
    expect(isDeactivated).toBe(true);

  });

  test('should not add a new enfant', async ({ page }) => {
    await ergoModeFixture.activateErgoMode('admin');
    await expect(await ergoModeFixture.isErgoModeActivated()).toBeTruthy();

    await addMembreFixture.addEnfant('Mimi', '','','');

  });

  /*test('should toggle and detoggle sound setting', async ({ page }) => {
    await ergoModeFixture.activateErgoMode('admin');
    await expect(await ergoModeFixture.isErgoModeActivated()).toBeTruthy();

    await ergoModeFixture.goConfig();
    await ergoModeFixture.selectConfig();

    await configurationFixture.toggleSound();

  });*/

  
  test('should select themes', async ({ page }) => {
    await ergoModeFixture.activateErgoMode('admin');
    await expect(await ergoModeFixture.isErgoModeActivated()).toBeTruthy();

    await addMembreFixture.chooseAlice().click();
    //await page.goto(testUrl+'/configuration/NaN');
    await addMembreFixture.goConfAlice().click();
    await addMembreFixture.goParamAlice().click();

    await configurationFixture.selectTheme('Les animaux');
    await configurationFixture.selectTheme("L'astronomie");

    await addMembreFixture.goConfAlice().click();
    await ergoModeFixture.selectProfile();


    await page.waitForLoadState('domcontentloaded');  
  });
});