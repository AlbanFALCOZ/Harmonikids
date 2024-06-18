import { test, expect } from '@playwright/test';
import { ErgoModeFixture } from 'src/app/navbar/navbar.fixture';
import { AddMembreFixture } from 'src/app/membres/membres-liste/member-list.fixture';

test.describe('Mode Ergo Tests', () => {
  let ergoModeFixture: ErgoModeFixture;
  let addMembreFixture: AddMembreFixture;

  test.beforeEach(async ({ page }) => {
    ergoModeFixture = new ErgoModeFixture(page);
    addMembreFixture = new AddMembreFixture(page);
    await page.goto('http://localhost:4200');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should activate mode Ergo with correct password', async ({ page }) => {
    await ergoModeFixture.activateErgoMode('admin');
    const isActivated = await ergoModeFixture.isErgoModeActivated();
    expect(isActivated).toBe(true);
  });

  test('should not activate mode Ergo with incorrect password', async ({ page }) => {
    await ergoModeFixture.activateErgoMode('wrongpassword');
    const isDeactivated = await ergoModeFixture.isErgoModeDeactivated();
    expect(isDeactivated).toBe(true);
  });

  test('should deactivate mode Ergo', async ({ page }) => {
    await ergoModeFixture.activateErgoMode('admin');
    await ergoModeFixture.deactivateErgoMode();
    const isDeactivated = await ergoModeFixture.isErgoModeDeactivated();
    expect(isDeactivated).toBe(true);
  });

  test('should add a new enfant when in Ergo mode', async ({ page }) => {
    await ergoModeFixture.activateErgoMode('admin');
    await expect(await ergoModeFixture.isErgoModeActivated()).toBeTruthy();

    await addMembreFixture.addEnfant('Doe', 'John', '10', 'Description de John Doe');

    await expect(page.getByText('Doe'));
    await expect(page.getByText('John'));
    await expect(page.getByText('10 ans'));
    await expect(page.getByText('Description de John Doe')).toBeVisible();
  });
});
